-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('artist', 'label_admin', 'fan', 'collaborator');
CREATE TYPE subscription_plan AS ENUM ('free', 'pro', 'label_tier1');
CREATE TYPE distribution_status AS ENUM ('pending', 'processing', 'live', 'error');
CREATE TYPE tokenization_status AS ENUM ('none', 'ready_to_mint', 'minting_songnft', 'songnft_minted', 'royaltycoins_defined', 'live_on_marketplace');
CREATE TYPE release_type AS ENUM ('album', 'ep', 'single');
CREATE TYPE signature_status AS ENUM ('pending_artist', 'pending_collaborator', 'signed_by_all', 'rejected');

-- PROFILES table (extends Supabase Auth users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  username TEXT UNIQUE,
  artist_name TEXT,
  is_artist_verified BOOLEAN DEFAULT FALSE,
  polkadot_address TEXT UNIQUE,
  user_role user_role DEFAULT 'fan',
  subscription_plan subscription_plan DEFAULT 'free',
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  social_links JSONB
);

-- SONGS table (core music data)
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  album_title TEXT,
  genre TEXT,
  release_date DATE,
  isrc_code TEXT UNIQUE,
  composer_names TEXT[],
  producer_names TEXT[],
  lyrics TEXT,
  explicit_content BOOLEAN DEFAULT FALSE,
  audio_file_path TEXT NOT NULL,
  artwork_file_path TEXT,
  duration_seconds INTEGER,
  plays INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  merlin_distribution_status distribution_status DEFAULT 'pending',
  web3_tokenization_status tokenization_status DEFAULT 'none',
  songnft_id_polkadot TEXT UNIQUE,
  royaltycoin_address_polkadot TEXT UNIQUE,
  songvault_address_polkadot TEXT UNIQUE,
  percent_royalties_tokenized NUMERIC CHECK (percent_royalties_tokenized >= 0 AND percent_royalties_tokenized <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RELEASES table (albums, EPs, singles)
CREATE TABLE releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  release_type release_type NOT NULL,
  artwork_file_path TEXT,
  release_date DATE,
  upc_code TEXT UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RELEASE_SONGS junction table
CREATE TABLE release_songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  release_id UUID REFERENCES releases(id) NOT NULL,
  song_id UUID REFERENCES songs(id) NOT NULL,
  track_number INTEGER NOT NULL,
  UNIQUE(release_id, song_id),
  UNIQUE(release_id, track_number)
);

-- ROYALTY_SPLITS table
CREATE TABLE royalty_splits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  song_id UUID REFERENCES songs(id) NOT NULL,
  collaborator_profile_id UUID REFERENCES profiles(id) NOT NULL,
  collaborator_wallet_address_polkadot TEXT NOT NULL,
  split_percentage NUMERIC NOT NULL CHECK (split_percentage > 0 AND split_percentage <= 100),
  agreement_document_hash TEXT,
  signature_status signature_status DEFAULT 'pending_artist',
  signed_on_chain_tx_hash_polkadot TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(song_id, collaborator_profile_id)
);

-- USER_LIKES table
CREATE TABLE user_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  song_id UUID REFERENCES songs(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

-- PLAYLISTS table
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  cover_image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PLAYLIST_SONGS junction table
CREATE TABLE playlist_songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID REFERENCES playlists(id) NOT NULL,
  song_id UUID REFERENCES songs(id) NOT NULL,
  position INTEGER NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(playlist_id, song_id),
  UNIQUE(playlist_id, position)
);

-- FOLLOWERS table
CREATE TABLE followers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES profiles(id) NOT NULL,
  followed_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, followed_id),
  CHECK(follower_id != followed_id)
);

-- Row Level Security (RLS) Policies

-- Profiles RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any profile"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Songs RLS
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any song"
  ON songs FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own songs"
  ON songs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own songs"
  ON songs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own songs"
  ON songs FOR DELETE
  USING (auth.uid() = user_id);

-- Releases RLS
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any release"
  ON releases FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own releases"
  ON releases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own releases"
  ON releases FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own releases"
  ON releases FOR DELETE
  USING (auth.uid() = user_id);

-- Release_Songs RLS
ALTER TABLE release_songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any release_songs"
  ON release_songs FOR SELECT
  USING (true);

CREATE POLICY "Users can manage release_songs for their releases"
  ON release_songs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM releases
      WHERE releases.id = release_songs.release_id
      AND releases.user_id = auth.uid()
    )
  );

-- Royalty_Splits RLS
ALTER TABLE royalty_splits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view royalty_splits for their songs or if they are collaborators"
  ON royalty_splits FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM songs
      WHERE songs.id = royalty_splits.song_id
      AND songs.user_id = auth.uid()
    )
    OR
    collaborator_profile_id = auth.uid()
  );

CREATE POLICY "Users can manage royalty_splits for their songs"
  ON royalty_splits FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM songs
      WHERE songs.id = royalty_splits.song_id
      AND songs.user_id = auth.uid()
    )
  );

-- User_Likes RLS
ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any likes"
  ON user_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own likes"
  ON user_likes FOR ALL
  USING (auth.uid() = user_id);

-- Playlists RLS
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public playlists"
  ON playlists FOR SELECT
  USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own playlists"
  ON playlists FOR ALL
  USING (auth.uid() = user_id);

-- Playlist_Songs RLS
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view playlist_songs for public playlists"
  ON playlist_songs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_songs.playlist_id
      AND (playlists.is_public OR playlists.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage playlist_songs for their playlists"
  ON playlist_songs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_songs.playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

-- Followers RLS
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any follower relationship"
  ON followers FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own follow relationships"
  ON followers FOR ALL
  USING (auth.uid() = follower_id);

-- Create functions for common operations

-- Function to increment song plays
CREATE OR REPLACE FUNCTION increment_song_plays(song_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE songs
  SET plays = plays + 1
  WHERE id = song_id;
END;
$$ LANGUAGE plpgsql;

-- Function to toggle a song like
CREATE OR REPLACE FUNCTION toggle_song_like(p_user_id UUID, p_song_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  like_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM user_likes
    WHERE user_id = p_user_id AND song_id = p_song_id
  ) INTO like_exists;
  
  IF like_exists THEN
    -- Unlike
    DELETE FROM user_likes
    WHERE user_id = p_user_id AND song_id = p_song_id;
    
    UPDATE songs
    SET likes = likes - 1
    WHERE id = p_song_id;
    
    RETURN FALSE;
  ELSE
    -- Like
    INSERT INTO user_likes (user_id, song_id)
    VALUES (p_user_id, p_song_id);
    
    UPDATE songs
    SET likes = likes + 1
    WHERE id = p_song_id;
    
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a view for trending songs
CREATE VIEW trending_songs AS
SELECT s.*,
       p.username,
       p.artist_name
FROM songs s
JOIN profiles p ON s.user_id = p.id
ORDER BY s.plays DESC, s.likes DESC, s.created_at DESC
LIMIT 100;

-- Create a view for recent songs
CREATE VIEW recent_songs AS
SELECT s.*,
       p.username,
       p.artist_name
FROM songs s
JOIN profiles p ON s.user_id = p.id
ORDER BY s.created_at DESC
LIMIT 100;

-- Create triggers for updated_at maintenance
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_songs_modtime
BEFORE UPDATE ON songs
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_releases_modtime
BEFORE UPDATE ON releases
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_royalty_splits_modtime
BEFORE UPDATE ON royalty_splits
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_playlists_modtime
BEFORE UPDATE ON playlists
FOR EACH ROW EXECUTE FUNCTION update_modified_column(); 