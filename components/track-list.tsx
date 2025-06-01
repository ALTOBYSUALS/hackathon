"use client"

import React from 'react'
import { AudioTrack } from './audio-player'
import { TrackCard } from './track-card'
import { cn } from '@/lib/utils'

interface TrackListProps {
  tracks: AudioTrack[]
  currentTrack: AudioTrack | null
  isPlaying: boolean
  onPlayTrack: (track: AudioTrack) => void
  onPauseTrack: () => void
  className?: string
  variant?: 'grid' | 'list' | 'featured'
  title?: string
  description?: string
}

export function TrackList({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onPauseTrack,
  className,
  variant = 'grid',
  title,
  description
}: TrackListProps) {
  if (!tracks.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No tracks found
      </div>
    )
  }

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      )}

      {variant === 'list' && (
        <div className="space-y-2">
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={isPlaying && currentTrack?.id === track.id}
              isCurrentTrack={currentTrack?.id === track.id}
              onPlay={onPlayTrack}
              onPause={onPauseTrack}
              variant="compact"
            />
          ))}
        </div>
      )}

      {variant === 'featured' && (
        <div className="space-y-6">
          <div className="aspect-[21/9] relative w-full rounded-lg overflow-hidden">
            <TrackCard
              track={tracks[0]}
              isPlaying={isPlaying && currentTrack?.id === tracks[0].id}
              isCurrentTrack={currentTrack?.id === tracks[0].id}
              onPlay={onPlayTrack}
              onPause={onPauseTrack}
              variant="featured"
              className="h-full"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tracks.slice(1, 5).map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isPlaying={isPlaying && currentTrack?.id === track.id}
                isCurrentTrack={currentTrack?.id === track.id}
                onPlay={onPlayTrack}
                onPause={onPauseTrack}
              />
            ))}
          </div>
          
          {tracks.length > 5 && (
            <div className="space-y-2 mt-6">
              <h3 className="text-lg font-semibold">More Tracks</h3>
              {tracks.slice(5).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isPlaying={isPlaying && currentTrack?.id === track.id}
                  isCurrentTrack={currentTrack?.id === track.id}
                  onPlay={onPlayTrack}
                  onPause={onPauseTrack}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {variant === 'grid' && (
        <div className={cn(
          "grid gap-4",
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        )}>
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={isPlaying && currentTrack?.id === track.id}
              isCurrentTrack={currentTrack?.id === track.id}
              onPlay={onPlayTrack}
              onPause={onPauseTrack}
            />
          ))}
        </div>
      )}
    </div>
  )
} 