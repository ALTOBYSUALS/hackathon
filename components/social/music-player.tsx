"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Maximize2 } from "lucide-react"
import Image from "next/image"

interface MusicPlayerProps {
  track: any
  compact?: boolean
}

export function MusicPlayer({ track, compact = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Reset player state when track changes
    setCurrentTime(0)
    setIsPlaying(false)

    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.volume = volume / 100
    }
  }, [track])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0]
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat)
  }

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={track.coverArt || "/placeholder.svg"}
              alt={track.title}
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate text-sm">{track.title}</p>
            <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>

        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          loop={isRepeat}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image src={track.coverArt || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
      </div>

      <div>
        <h4 className="font-medium">{track.title}</h4>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className={isShuffle ? "text-primary" : ""} onClick={toggleShuffle}>
            <Shuffle className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button variant="default" size="icon" className="h-10 w-10 rounded-full bg-primary" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>

          <Button variant="ghost" size="icon">
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className={isRepeat ? "text-primary" : ""} onClick={toggleRepeat}>
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        loop={isRepeat}
      />
    </div>
  )
}
