# SONAR - Supabase Setup Guide

This guide will walk you through setting up Supabase for the SONAR music platform, including configuring environment variables and implementing the database schema.

## Setting Up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't already have one.

2. Create a new project in the Supabase dashboard.

3. Note your project's URL and anon/public API key from the API settings in the Supabase dashboard.

## Environment Variables

Create a `.env.local` file in your project root directory with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace the placeholders with your actual Supabase project URL and anon key.

## Implementing the Database Schema

1. Go to the SQL Editor in your Supabase dashboard.

2. Create a new query and paste the contents of the `lib/supabase-schema.sql` file.

3. Run the query to create all tables, relationships, RLS policies, functions, and triggers.

## Storage Setup

You'll need to create storage buckets for audio files and artwork:

1. Go to the Storage section in your Supabase dashboard.

2. Create the following buckets:
   - `audio-tracks`: For storing music files
   - `artwork`: For storing album/track artwork

3. Configure public access or RLS policies for these buckets as needed:

```sql
-- Example RLS policy for artwork bucket allowing public read access
CREATE POLICY "Public Access for Artwork" 
ON storage.objects
FOR SELECT
USING (bucket_id = 'artwork');

-- Example RLS policy for audio tracks allowing authenticated uploads
CREATE POLICY "Auth users can upload tracks"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'audio-tracks' AND auth.role() = 'authenticated');
```

## API Functions

The database includes several PostgreSQL functions for common operations:

1. `increment_song_plays(song_id)`: Increments the play count for a song
2. `toggle_song_like(user_id, song_id)`: Toggles a user's like status for a song

Example usage:

```typescript
// Increment plays
const { data, error } = await supabase.rpc('increment_song_plays', {
  song_id: '123e4567-e89b-12d3-a456-426614174000'
})

// Toggle like
const { data, error } = await supabase.rpc('toggle_song_like', {
  p_user_id: '123e4567-e89b-12d3-a456-426614174000',
  p_song_id: '123e4567-e89b-12d3-a456-426614174000'
})
```

## Connecting in Code

The existing `lib/supabase.ts` file already includes the basic setup for connecting to Supabase using environment variables:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## Web3 Integration Fields

The database schema includes fields for Web3 integration with Polkadot:

- `polkadot_address` in the profiles table
- `web3_tokenization_status`, `songnft_id_polkadot`, `royaltycoin_address_polkadot`, and `songvault_address_polkadot` in the songs table
- `collaborator_wallet_address_polkadot` and `signed_on_chain_tx_hash_polkadot` in the royalty_splits table

These fields provide the bridge between traditional Web2 music data and the Polkadot blockchain tokenization process.

## Testing Your Setup

Once you've set up Supabase and created the database schema, you can test your connection:

```typescript
import { supabase } from '@/lib/supabase'

// Test query
const { data, error } = await supabase.from('songs').select('*').limit(5)

if (error) {
  console.error('Error fetching songs:', error)
} else {
  console.log('Songs retrieved successfully:', data)
}
```

## Troubleshooting

- If you encounter errors with RLS policies, make sure you're properly handling authentication.
- For storage issues, check bucket permissions and file size limits.
- Check for typos in table/column names when querying the database.
- Ensure your environment variables are correctly set and accessible to the application.

For more advanced Supabase usage, refer to the [official Supabase documentation](https://supabase.io/docs).
