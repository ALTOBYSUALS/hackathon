"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Play, Pause, Heart, MoreHorizontal, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AudioTrack } from './audio-player'
import { cn } from '@/lib/utils'

interface TrackCardProps {
  track: AudioTrack
  isPlaying?: boolean
  isCurrentTrack?: boolean
  onPlay?: (track: AudioTrack) => void
  onPause?: () => void
  className?: string
  variant?: 'default' | 'compact' | 'featured'
}

export function TrackCard({
  track,
  isPlaying = false,
  isCurrentTrack = false,
  onPlay,
  onPause,
  className,
  variant = 'default'
}: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      onPause?.()
    } else {
      onPlay?.(track)
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          "flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors",
          isCurrentTrack && "bg-accent/50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={track.coverUrl}
            alt={track.title}
            fill
            className="object-cover"
          />
          {(isHovered || isCurrentTrack) && (
            <Button
              variant="default"
              size="icon"
              className="absolute inset-0 w-full h-full bg-black/40 rounded-none"
              onClick={handlePlayPause}
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white ml-0.5" />
              )}
            </Button>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{track.title}</div>
          <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8", 
            isLiked ? "text-sonar-coral-500" : "text-muted-foreground"
          )}
          onClick={toggleLike}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
        </Button>
      </div>
    )
  }
  
  if (variant === 'featured') {
    return (
      <div
        className={cn("group relative rounded-md overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/9] w-full bg-muted">
          <Image
            src={track.coverUrl}
            alt={track.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-lg font-bold text-white mb-1">{track.title}</div>
            <div className="text-sm text-white/80">{track.artist}</div>
          </div>
          
          <Button
            variant="default"
            size="icon"
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-sonar-coral-500 hover:bg-sonar-coral-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handlePlayPause}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-card">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8", 
                isLiked ? "text-sonar-coral-500" : "text-muted-foreground"
              )}
              onClick={toggleLike}
            >
              <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }
  
  // Default variant
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden border border-border bg-card group transition-all hover:shadow-md",
        isCurrentTrack && "ring-1 ring-sonar-coral-500",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={track.coverUrl}
          alt={track.title}
          fill
          className="object-cover"
        />
        
        <Button
          variant="default"
          size="icon"
          className="absolute inset-0 w-full h-full bg-black/40 rounded-none opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handlePlayPause}
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-10 w-10 text-white" />
          ) : (
            <Play className="h-10 w-10 text-white ml-1" />
          )}
        </Button>
      </div>
      
      <div className="p-3">
        <div className="text-sm font-medium truncate mb-1">{track.title}</div>
        <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
      </div>
      
      <div className="flex justify-between items-center px-3 py-2 border-t border-border">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8", 
            isLiked ? "text-sonar-coral-500" : "text-muted-foreground"
          )}
          onClick={toggleLike}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 