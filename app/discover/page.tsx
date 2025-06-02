"use client"

import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, Music, Users, Clock, PlayCircle, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrackList } from '@/components/track-list'
import { AudioPlayer, AudioTrack } from '@/components/audio-player'
import { getRecentTracks } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function DiscoverPage() {
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  
  // Fetch tracks from Supabase
  useEffect(() => {
    async function loadTracks() {
      try {
        const data = await getRecentTracks(20)
        
        if (data && data.length > 0) {
          const formattedTracks = data.map(track => ({
            id: track.id,
            title: track.title,
            artist: track.artist || 'Unknown Artist',
            coverUrl: track.cover_url || '/default-cover.png',
            audioUrl: track.audio_url,
          }))
          setTracks(formattedTracks)
        }
      } catch (error) {
        console.error('Error loading tracks:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadTracks()
    
    // Refresh tracks every 10 seconds to see new uploads
    const interval = setInterval(loadTracks, 10000)
    return () => clearInterval(interval)
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
  
  const handleUploadClick = () => {
    if (isAuthenticated) {
      router.push('/music/upload')
    } else {
      router.push('/?action=auth')
    }
  }
  
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-sonar-coral-600/90 to-sonar-coral-500/90 text-white">
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
                onClick={handleUploadClick}
                className="bg-white text-sonar-coral-600 hover:bg-white/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Track
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="recent">
              <Clock className="h-4 w-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
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
          
          <TabsContent value="recent">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-sonar-coral-500 border-t-transparent"></div>
                  Loading tracks...
                </div>
              </div>
            ) : tracks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No tracks uploaded yet</p>
                {isAuthenticated && (
                  <Button 
                    onClick={handleUploadClick}
                    className="bg-sonar-coral-500 hover:bg-sonar-coral-600"
                  >
                    Be the first to upload a track!
                  </Button>
                )}
              </div>
            ) : (
              <TrackList
                tracks={tracks}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayTrack={handlePlayTrack}
                onPauseTrack={handlePauseTrack}
                variant="grid"
                title="Recent Uploads"
                description="Fresh tracks from the community"
              />
            )}
          </TabsContent>
          
          <TabsContent value="trending">
            {tracks.length > 0 ? (
              <TrackList
                tracks={[...tracks].sort((a, b) => Math.random() - 0.5)}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayTrack={handlePlayTrack}
                onPauseTrack={handlePauseTrack}
                variant="featured"
                title="Trending Tracks"
                description="Popular music from the community"
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No trending tracks yet
              </div>
            )}
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