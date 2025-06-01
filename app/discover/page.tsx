"use client"

import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, Music, Users, Clock, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrackList } from '@/components/track-list'
import { AudioPlayer, AudioTrack } from '@/components/audio-player'
import { TrackUpload } from '@/components/track-upload'
import { getTracks } from '@/lib/supabase'

// Mock data for now
const mockTracks: AudioTrack[] = [
  {
    id: '1',
    title: 'Summer Nights',
    artist: 'Chillwave',
    coverUrl: '/abstract-soundscape.png',
    audioUrl: 'https://sample-music.com/song1.mp3',
  },
  {
    id: '2',
    title: 'Urban Echoes',
    artist: 'Beat Collective',
    coverUrl: '/hip-hop-album-cover.png',
    audioUrl: 'https://sample-music.com/song2.mp3',
  },
  {
    id: '3',
    title: 'Midnight Dreams',
    artist: 'Ambient Echoes',
    coverUrl: '/electronic-album-cover.png',
    audioUrl: 'https://sample-music.com/song3.mp3',
  },
  {
    id: '4',
    title: 'Neon Lights',
    artist: 'Synthwave',
    coverUrl: '/abstract-geometric-shapes.png',
    audioUrl: 'https://sample-music.com/song4.mp3',
  },
  {
    id: '5',
    title: 'Digital Dawn',
    artist: 'Electronic Masters',
    coverUrl: '/abstract-soundscape.png',
    audioUrl: 'https://sample-music.com/song5.mp3',
  },
  {
    id: '6',
    title: 'Cosmic Journey',
    artist: 'Space Travelers',
    coverUrl: '/hip-hop-album-cover.png',
    audioUrl: 'https://sample-music.com/song6.mp3',
  },
  {
    id: '7',
    title: 'Urban Pulse',
    artist: 'City Beats',
    coverUrl: '/electronic-album-cover.png',
    audioUrl: 'https://sample-music.com/song7.mp3',
  },
  {
    id: '8',
    title: 'Sunset Vibes',
    artist: 'Lofi Collective',
    coverUrl: '/abstract-geometric-shapes.png',
    audioUrl: 'https://sample-music.com/song8.mp3',
  },
];

export default function DiscoverPage() {
  const [tracks, setTracks] = useState<AudioTrack[]>(mockTracks)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  
  // Fetch tracks from Supabase
  useEffect(() => {
    async function loadTracks() {
      try {
        // This would be replaced with real data from Supabase
        // const data = await getTracks()
        // if (data.length) {
        //   setTracks(data.map(track => ({
        //     id: track.id,
        //     title: track.title,
        //     artist: track.artist,
        //     coverUrl: track.cover_url,
        //     audioUrl: track.audio_url,
        //   })))
        // }
        
        // Using mock data for now
        setTracks(mockTracks)
      } catch (error) {
        console.error('Error loading tracks:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadTracks()
  }, [])
  
  const handlePlayTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }
  
  const handlePauseTrack = () => {
    setIsPlaying(false)
  }
  
  const handleTrackChange = (track: AudioTrack) => {
    setCurrentTrack(track)
  }
  
  const handleUploadSuccess = () => {
    setShowUpload(false)
    // Refresh tracks
    // You would call getTracks() here again
  }
  
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-coral-600/90 to-coral-500/90 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Discover Music</h1>
              <p className="text-white/80 mt-1">Find new tracks and artists</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input 
                  placeholder="Search tracks, artists..."
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                />
              </div>
              
              <Button 
                variant="secondary" 
                size="icon"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => setShowUpload(!showUpload)}
                className="bg-white text-coral-600 hover:bg-white/90"
              >
                {showUpload ? 'Cancel' : 'Upload Track'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {showUpload ? (
          <TrackUpload 
            userId="user123" // This would be the actual user ID
            onSuccess={handleUploadSuccess}
            className="mt-4"
          />
        ) : (
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="artists">
                <Users className="h-4 w-4 mr-2" />
                Artists
              </TabsTrigger>
              <TabsTrigger value="genres">
                <Music className="h-4 w-4 mr-2" />
                Genres
              </TabsTrigger>
              <TabsTrigger value="playlist">
                <PlayCircle className="h-4 w-4 mr-2" />
                Playlists
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending">
              <TrackList
                tracks={tracks}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayTrack={handlePlayTrack}
                onPauseTrack={handlePauseTrack}
                variant="featured"
                title="Trending Tracks"
                description="Popular music from the community"
              />
            </TabsContent>
            
            <TabsContent value="recent">
              <TrackList
                tracks={tracks.slice().sort(() => Math.random() - 0.5)}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayTrack={handlePlayTrack}
                onPauseTrack={handlePauseTrack}
                variant="grid"
                title="Recent Uploads"
                description="Fresh tracks from the community"
              />
            </TabsContent>
            
            <TabsContent value="artists">
              <div className="text-center py-12 text-muted-foreground">
                Artist discovery coming soon
              </div>
            </TabsContent>
            
            <TabsContent value="genres">
              <div className="text-center py-12 text-muted-foreground">
                Genre exploration coming soon
              </div>
            </TabsContent>
            
            <TabsContent value="playlist">
              <div className="text-center py-12 text-muted-foreground">
                Playlist creation coming soon
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
      
      {/* Audio Player */}
      <AudioPlayer 
        track={currentTrack}
        tracks={tracks}
        onTrackChange={handleTrackChange}
        expanded
      />
    </div>
  )
} 