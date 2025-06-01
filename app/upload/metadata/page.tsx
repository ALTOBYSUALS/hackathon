"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TrackMetadata() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Track 1",
      featuring: "",
      isrc: "",
      songwriters: "",
      explicit: false,
      expanded: true,
    },
    {
      id: 2,
      title: "Track 2",
      featuring: "",
      isrc: "",
      songwriters: "",
      explicit: false,
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
        featuring: "",
        isrc: "",
        songwriters: "",
        explicit: false,
        expanded: true,
      },
    ])
  }

  const removeTrack = (id: number) => {
    setTracks(tracks.filter((track) => track.id !== id))
  }

  const updateTrack = (id: number, field: string, value: string | boolean) => {
    setTracks(tracks.map((track) => (track.id === id ? { ...track, [field]: value } : track)))
  }

  const generateISRC = (id: number) => {
    // In a real app, this would call an API to generate a real ISRC
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase()
    updateTrack(id, "isrc", `US-S1Z-23-${randomCode}`)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/upload">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Track Metadata</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Step 2 of 3</div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Album: Midnight Dreams</h2>
            <p className="text-sm text-muted-foreground">Enter metadata for each track</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/electronic-album-cover.png"
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
                      <span className="font-medium">{track.title || `Track ${track.id}`}</span>
                      {track.featuring && (
                        <span className="text-sm text-muted-foreground ml-2">feat. {track.featuring}</span>
                      )}
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

                    <div className="space-y-2">
                      <Label htmlFor={`featuring-${track.id}`}>Featuring Artist(s)</Label>
                      <Input
                        id={`featuring-${track.id}`}
                        value={track.featuring}
                        onChange={(e) => updateTrack(track.id, "featuring", e.target.value)}
                        placeholder="Enter featuring artists (comma separated)"
                      />
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
                        <Button variant="outline" onClick={() => generateISRC(track.id)} className="whitespace-nowrap">
                          Auto-Generate
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        International Standard Recording Code uniquely identifies your recording
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`songwriters-${track.id}`}>Songwriters</Label>
                      <Input
                        id={`songwriters-${track.id}`}
                        value={track.songwriters}
                        onChange={(e) => updateTrack(track.id, "songwriters", e.target.value)}
                        placeholder="Enter songwriter names (comma separated)"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`explicit-${track.id}`}
                        checked={track.explicit}
                        onCheckedChange={(checked) => updateTrack(track.id, "explicit", checked)}
                      />
                      <Label htmlFor={`explicit-${track.id}`}>Explicit Content</Label>
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
            <Link href="/upload">Back</Link>
          </Button>
          <Button asChild>
            <Link href="/upload/review">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
