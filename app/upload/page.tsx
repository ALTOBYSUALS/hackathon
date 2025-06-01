"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Music, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function UploadForm() {
  const [releaseType, setReleaseType] = useState("single")
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [audioFiles, setAudioFiles] = useState<File[]>([])

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setAudioFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeAudioFile = (index: number) => {
    setAudioFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const removeCoverPreview = () => {
    setCoverPreview(null)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Upload New Music</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Step 1 of 3</div>
        </div>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Release Information</CardTitle>
          <CardDescription>
            Enter the basic information about your release. You can edit this information later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="release-type">Release Type</Label>
            <RadioGroup
              id="release-type"
              defaultValue="single"
              className="flex flex-col space-y-1"
              onValueChange={setReleaseType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single" className="font-normal">
                  Single
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ep" id="ep" />
                <Label htmlFor="ep" className="font-normal">
                  EP (2-6 tracks)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="album" id="album" />
                <Label htmlFor="album" className="font-normal">
                  Album (7+ tracks)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="cover-art">Cover Art</Label>
            <div className="text-sm text-muted-foreground mb-2">
              Upload a square image, minimum 3000x3000 pixels (JPG or PNG)
            </div>
            {coverPreview ? (
              <div className="relative w-48 h-48">
                <Image
                  src={coverPreview || "/placeholder.svg"}
                  alt="Cover preview"
                  fill
                  className="object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={removeCoverPreview}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-48 h-48 border-2 border-dashed rounded-md border-muted-foreground/25">
                <label htmlFor="cover-upload" className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload Cover Art</span>
                  <Input
                    id="cover-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                </label>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Release Title</Label>
                <Input id="title" placeholder="Enter the title of your release" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Main Artist</Label>
                <Input id="artist" placeholder="Enter the main artist name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Primary Genre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="hiphop">Hip Hop</SelectItem>
                    <SelectItem value="rnb">R&B</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="folk">Folk</SelectItem>
                    <SelectItem value="reggae">Reggae</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="blues">Blues</SelectItem>
                    <SelectItem value="latin">Latin</SelectItem>
                    <SelectItem value="world">World</SelectItem>
                    <SelectItem value="alternative">Alternative</SelectItem>
                    <SelectItem value="indie">Indie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Audio Files</Label>
            <div className="text-sm text-muted-foreground mb-2">
              {releaseType === "single"
                ? "Upload your single track (WAV or FLAC, 16-bit or higher)"
                : "Upload your tracks (WAV or FLAC, 16-bit or higher)"}
            </div>

            <div className="space-y-2">
              {audioFiles.length > 0 && (
                <div className="space-y-2 mb-4">
                  {audioFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <Music className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeAudioFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md border-muted-foreground/25">
                <label
                  htmlFor="audio-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {releaseType === "single" ? "Upload Track" : "Upload Tracks"}
                  </span>
                  <Input
                    id="audio-upload"
                    type="file"
                    accept="audio/wav,audio/flac"
                    className="hidden"
                    multiple={releaseType !== "single"}
                    onChange={handleAudioUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button asChild>
            <Link href="/upload/metadata">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
