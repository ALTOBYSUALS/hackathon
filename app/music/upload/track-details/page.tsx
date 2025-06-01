"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Plus, X, Upload, Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function TrackDetails() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Track 1",
      artists: "",
      version: "",
      isrc: "",
      songwriters: [{ name: "", role: "Composer" }],
      publishers: [{ name: "", share: 100 }],
      lyrics: "",
      explicit: false,
      previewStart: 30,
      expanded: true,
    },
    {
      id: 2,
      title: "Track 2",
      artists: "",
      version: "",
      isrc: "",
      songwriters: [{ name: "", role: "Composer" }],
      publishers: [],
      lyrics: "",
      explicit: false,
      previewStart: 30,
      expanded: false,
    },
  ])

  const addTrack = () => {
    const newId = tracks.length > 0 ? Math.max(...tracks.map((track) => track.id)) + 1 : 1
    setTracks([
      ...tracks,
      {
        id: newId,
        title: `Track ${newId}`,
        artists: "",
        version: "",
        isrc: "",
        songwriters: [{ name: "", role: "Composer" }],
        publishers: [],
        lyrics: "",
        explicit: false,
        previewStart: 30,
        expanded: true,
      },
    ])
  }

  const removeTrack = (id: number) => {
    setTracks(tracks.filter((track) => track.id !== id))
  }

  const updateTrack = (id: number, field: string, value: any) => {
    setTracks(tracks.map((track) => (track.id === id ? { ...track, [field]: value } : track)))
  }

  const addSongwriter = (trackId: number) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            songwriters: [...track.songwriters, { name: "", role: "Composer" }],
          }
        }
        return track
      }),
    )
  }

  const removeSongwriter = (trackId: number, index: number) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          const newSongwriters = [...track.songwriters]
          newSongwriters.splice(index, 1)
          return {
            ...track,
            songwriters: newSongwriters,
          }
        }
        return track
      }),
    )
  }

  const updateSongwriter = (trackId: number, index: number, field: string, value: string) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          const newSongwriters = [...track.songwriters]
          newSongwriters[index] = { ...newSongwriters[index], [field]: value }
          return {
            ...track,
            songwriters: newSongwriters,
          }
        }
        return track
      }),
    )
  }

  const generateISRC = (id: number) => {
    // In a real app, this would call an API to generate a real ISRC
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase()
    updateTrack(id, "isrc", `US-S1Z-23-${randomCode}`)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/music/upload">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Track Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Step 2 of 3</div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Progress value={66} className="h-2 bg-gray-100" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Release Information</span>
              <span className="font-medium text-brand">Track Details</span>
              <span>Distribution & Extras</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Album: Midnight Dreams</h2>
              <p className="text-sm text-muted-foreground">Enter metadata for each track</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/pop-album-cover.png"
                width={60}
                height={60}
                alt="Album cover"
                className="rounded-md object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={["track-1"]} className="w-full">
              {tracks.map((track) => (
                <AccordionItem key={track.id} value={`track-${track.id}`} className="border rounded-lg mb-4">
                  <div className="flex items-center justify-between px-4">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <div className="flex items-center">
                        <Music className="h-4 w-4 mr-2 text-brand" />
                        <span className="font-medium">{track.title || `Track ${track.id}`}</span>
                        {track.version && <span className="text-sm text-muted-foreground ml-2">({track.version})</span>}
                      </div>
                    </AccordionTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeTrack(track.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${track.id}`}>Track Title</Label>
                        <Input
                          id={`title-${track.id}`}
                          value={track.title}
                          onChange={(e) => updateTrack(track.id, "title", e.target.value)}
                          placeholder="Enter track title"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`artists-${track.id}`}>Track Artist(s)</Label>
                          <Input
                            id={`artists-${track.id}`}
                            value={track.artists}
                            onChange={(e) => updateTrack(track.id, "artists", e.target.value)}
                            placeholder="Leave blank if same as release"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`version-${track.id}`}>Version</Label>
                          <Input
                            id={`version-${track.id}`}
                            value={track.version}
                            onChange={(e) => updateTrack(track.id, "version", e.target.value)}
                            placeholder="e.g. Remix, Instrumental, Live"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`isrc-${track.id}`}>ISRC Code</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`isrc-${track.id}`}
                            value={track.isrc}
                            onChange={(e) => updateTrack(track.id, "isrc", e.target.value)}
                            placeholder="Enter ISRC code"
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            onClick={() => generateISRC(track.id)}
                            className="whitespace-nowrap"
                          >
                            Auto-Generate
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          International Standard Recording Code uniquely identifies your recording
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Songwriters</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => addSongwriter(track.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {track.songwriters.map((songwriter, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <Input
                                value={songwriter.name}
                                onChange={(e) => updateSongwriter(track.id, index, "name", e.target.value)}
                                placeholder="Songwriter name"
                                className="flex-1"
                              />
                              <Select
                                value={songwriter.role}
                                onValueChange={(value) => updateSongwriter(track.id, index, "role", value)}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Composer">Composer</SelectItem>
                                  <SelectItem value="Lyricist">Lyricist</SelectItem>
                                  <SelectItem value="Producer">Producer</SelectItem>
                                  <SelectItem value="Arranger">Arranger</SelectItem>
                                </SelectContent>
                              </Select>
                              {track.songwriters.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeSongwriter(track.id, index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`lyrics-${track.id}`}>Lyrics</Label>
                        <div className="flex gap-2 items-center mb-2">
                          <Textarea
                            id={`lyrics-${track.id}`}
                            value={track.lyrics}
                            onChange={(e) => updateTrack(track.id, "lyrics", e.target.value)}
                            placeholder="Enter lyrics or upload a text file"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex items-center justify-center h-10 border border-dashed rounded-md border-muted-foreground/25">
                          <label
                            htmlFor={`lyrics-upload-${track.id}`}
                            className="flex items-center justify-center w-full h-full cursor-pointer"
                          >
                            <Upload className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-xs text-muted-foreground">Upload .txt file</span>
                            <Input
                              id={`lyrics-upload-${track.id}`}
                              type="file"
                              accept=".txt"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (e) => {
                                    updateTrack(track.id, "lyrics", e.target?.result as string)
                                  }
                                  reader.readAsText(file)
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`explicit-${track.id}`}
                            checked={track.explicit}
                            onCheckedChange={(checked) => updateTrack(track.id, "explicit", checked)}
                          />
                          <Label htmlFor={`explicit-${track.id}`}>Explicit Content</Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`preview-${track.id}`}>30s Preview Start Time (seconds)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`preview-${track.id}`}
                              type="number"
                              min="0"
                              value={track.previewStart}
                              onChange={(e) => updateTrack(track.id, "previewStart", Number.parseInt(e.target.value))}
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">
                              or{" "}
                              <Button variant="link" className="h-auto p-0">
                                auto-generate
                              </Button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button variant="outline" className="w-full" onClick={addTrack}>
              <Plus className="mr-2 h-4 w-4" />
              Add Track
            </Button>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/music/upload">Previous Step</Link>
            </Button>
            <Button className="bg-brand hover:bg-brand-dark text-white" asChild>
              <Link href="/music/upload/distribution">
                Next: Distribution
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
