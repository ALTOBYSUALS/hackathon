"use client"

import { useState, useRef } from 'react'
import { Upload, X, Music, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { uploadTrack } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface TrackUploadProps {
  userId: string
  onSuccess?: () => void
  className?: string
}

export function TrackUpload({ userId, onSuccess, className }: TrackUploadProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  
  const audioInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an audio file (MP3, WAV, etc.)",
        variant: "destructive",
      })
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!audioFile) {
      toast({
        title: "Audio file required",
        description: "Please select an audio file to upload",
        variant: "destructive",
      })
      return
    }
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your track",
        variant: "destructive",
      })
      return
    }
    
    try {
      setIsUploading(true)
      
      // Upload cover image first if selected
      let coverUrl = '/abstract-soundscape.png' // Default cover
      if (coverFile) {
        // Here you would upload the cover image to storage and get its URL
        // For simplicity we'll use a placeholder for now
        coverUrl = coverPreview || coverUrl
      }
      
      // Upload track with metadata
      const result = await uploadTrack(audioFile, {
        title,
        artist: artist || 'Unknown Artist',
        cover_url: coverUrl,
        plays: 0,
        likes: 0,
        user_id: userId,
      })
      
      if (result) {
        toast({
          title: "Track uploaded",
          description: "Your track has been successfully uploaded",
        })
        
        // Reset form
        setAudioFile(null)
        setCoverFile(null)
        setCoverPreview(null)
        setTitle('')
        setArtist('')
        setDescription('')
        
        // Notify parent component
        onSuccess?.()
      } else {
        throw new Error("Failed to upload track")
      }
    } catch (error) {
      console.error("Error uploading track:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your track. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle>Upload Your Track</CardTitle>
        <CardDescription>Share your music with the world</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Audio file upload */}
          <div className="space-y-2">
            <Label htmlFor="audio-file">Audio File</Label>
            <div 
              className={cn(
                "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
                audioFile ? "border-coral-500 bg-coral-50/50" : "border-border hover:border-muted-foreground/50"
              )}
              onClick={() => audioInputRef.current?.click()}
            >
              <input 
                ref={audioInputRef}
                id="audio-file"
                type="file" 
                accept="audio/*" 
                className="hidden" 
                onChange={handleAudioChange}
              />
              
              {audioFile ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <Music className="h-8 w-8 text-coral-500" />
                  <div className="font-medium">{audioFile.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      setAudioFile(null)
                    }}
                  >
                    <X className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="font-medium">Drag & drop or click to upload</div>
                  <div className="text-sm text-muted-foreground">
                    Support for MP3, WAV, FLAC (max 50MB)
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Cover image upload */}
          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image (Optional)</Label>
            <div 
              className={cn(
                "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
                coverFile ? "border-coral-500 bg-coral-50/50" : "border-border hover:border-muted-foreground/50",
                "h-48"
              )}
              onClick={() => coverInputRef.current?.click()}
            >
              <input 
                ref={coverInputRef}
                id="cover-image"
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleCoverChange}
              />
              
              {coverPreview ? (
                <div className="relative h-full w-full">
                  <Image 
                    src={coverPreview} 
                    alt="Cover preview" 
                    fill
                    className="object-contain"
                  />
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/80"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCoverFile(null)
                      setCoverPreview(null)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="font-medium">Add cover image</div>
                  <div className="text-sm text-muted-foreground">
                    JPG, PNG, GIF (Recommended: 1400x1400px)
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Track details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter track title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="artist">Artist</Label>
              <Input 
                id="artist" 
                value={artist} 
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell listeners about your track..."
                rows={4}
              />
            </div>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isUploading || !audioFile}
          className="bg-coral-500 hover:bg-coral-600"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Track
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 