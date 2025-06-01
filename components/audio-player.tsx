"use client"

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { incrementPlays } from '@/lib/supabase'
import { cn } from '@/lib/utils'

export type AudioTrack = {
  id: string
  title: string
  artist: string
  coverUrl: string
  audioUrl: string
}

interface AudioPlayerProps {
  track: AudioTrack | null
  tracks: AudioTrack[]
  onTrackChange?: (track: AudioTrack) => void
  className?: string
  expanded?: boolean
}

export function AudioPlayer({ track, tracks, onTrackChange, className, expanded = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  // Cargar el audio cuando cambie la pista
  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.audioUrl
      audioRef.current.load()
      setCurrentTime(0)
      
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [track, isPlaying])

  // Actualizar la duración cuando los metadatos estén cargados
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Actualizar el tiempo actual durante la reproducción
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Cambiar el estado de reproducción
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
        // Incrementar el contador de reproducciones
        if (track) {
          incrementPlays(track.id)
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Cambiar a la pista anterior
  const playPrevious = () => {
    if (!track || !tracks.length) return
    
    const currentIndex = tracks.findIndex(t => t.id === track.id)
    if (currentIndex > 0) {
      const prevTrack = tracks[currentIndex - 1]
      onTrackChange?.(prevTrack)
    } else {
      // Volver a la última pista si estamos en la primera
      const lastTrack = tracks[tracks.length - 1]
      onTrackChange?.(lastTrack)
    }
  }

  // Cambiar a la siguiente pista
  const playNext = () => {
    if (!track || !tracks.length) return
    
    const currentIndex = tracks.findIndex(t => t.id === track.id)
    if (currentIndex < tracks.length - 1) {
      const nextTrack = tracks[currentIndex + 1]
      onTrackChange?.(nextTrack)
    } else {
      // Volver a la primera pista si estamos en la última
      const firstTrack = tracks[0]
      onTrackChange?.(firstTrack)
    }
  }

  // Cambiar la posición de reproducción
  const changePosition = (newPosition: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newPosition[0]
      setCurrentTime(newPosition[0])
    }
  }

  // Cambiar el volumen
  const changeVolume = (newVolume: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0]
      setVolume(newVolume[0])
    }
  }

  // Formatear tiempo en MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Si no hay pista, mostrar un mensaje
  if (!track) {
    return (
      <div className={cn("h-16 bg-background border-t border-border flex items-center justify-center", className)}>
        <p className="text-muted-foreground">No track selected</p>
      </div>
    )
  }

  return (
    <div className={cn("bg-background border-t border-border", 
      expanded ? "fixed bottom-0 left-0 right-0 h-24 z-50" : "h-16", 
      className
    )}>
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
      />
      
      <div className="container mx-auto flex items-center h-full gap-4">
        {/* Controles de reproducción */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={playPrevious}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="default" 
            size="icon" 
            onClick={togglePlayPause}
            className="bg-coral-500 hover:bg-coral-600 text-white rounded-full h-10 w-10"
          >
            {isPlaying ? 
              <Pause className="h-5 w-5" /> : 
              <Play className="h-5 w-5 ml-0.5" />
            }
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={playNext}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Información de la pista */}
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="h-10 w-10 relative rounded overflow-hidden bg-muted">
            <Image 
              src={track.coverUrl} 
              alt={track.title} 
              fill 
              className="object-cover"
              loading="eager"
            />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-medium line-clamp-1">{track.title}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">{track.artist}</span>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          
          <Slider 
            className="flex-1" 
            value={[currentTime]} 
            max={duration || 1} 
            step={0.1} 
            onValueChange={changePosition}
          />
          
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
        
        {/* Volumen y otros controles */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Shuffle className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Repeat className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider 
              value={[volume]} 
              max={1} 
              step={0.01} 
              onValueChange={changeVolume}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 