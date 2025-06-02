"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Check, Upload, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useForm, FormProvider } from "react-hook-form"
import { PageContainer, PageHeader, PageContent } from "@/components/page-container"
import { useAuth } from "@/contexts/auth-context"
import { uploadSong } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export default function UploadMusic() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm({
    defaultValues: {
      releaseType: "single",
      title: "",
      artists: "",
      label: "",
      primaryGenre: "electronic",
      secondaryGenre: "",
      language: "english",
      coverArt: null,
      audioFile: null,
    },
  })

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverArtPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const onSubmit = async (data: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload music",
        variant: "destructive",
      })
      return
    }

    if (!audioFile) {
      toast({
        title: "Audio file required",
        description: "Please select an audio file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Subir la canción a Supabase
      const result = await uploadSong(
        audioFile,
        coverFile,
        {
          title: data.title,
          artistName: data.artists,
          genre: data.primaryGenre,
          recordLabel: data.label,
          language: data.language,
        },
        user.id
      )

      toast({
        title: "Upload successful! 🎉",
        description: "Your track has been uploaded and is now live on Discover",
      })

      // Ir a la página Discover después de subir exitosamente
      router.push("/discover")
    } catch (error) {
      console.error("Upload error:", error)
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
    <PageContainer>
      <PageHeader title="Upload Music" description="Upload and distribute your music to all major platforms" />

      <PageContent>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8A3FFC] text-white">
                <Check className="h-5 w-5" />
              </div>
              <span className="font-medium">Release Information</span>
            </div>
            <Separator className="mx-4 h-8" orientation="vertical" />
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                2
              </div>
              <span className="text-muted-foreground">Track Details</span>
            </div>
            <Separator className="mx-4 h-8" orientation="vertical" />
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                3
              </div>
              <span className="text-muted-foreground">Distribution & Extras</span>
            </div>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Release Information</CardTitle>
                  <CardDescription>Enter the basic details about your release</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="releaseType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Release Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select release type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="ep">EP</SelectItem>
                                <SelectItem value="album">Album</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Select the type of release you're uploading</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Release Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter release title" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="artists"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Artist(s)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter artist name(s)" {...field} required />
                            </FormControl>
                            <FormDescription>Separate multiple artists with commas</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Record Label</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter label name or 'Self-released'" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="primaryGenre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Genre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select primary genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="electronic">Electronic</SelectItem>
                                <SelectItem value="pop">Pop</SelectItem>
                                <SelectItem value="rock">Rock</SelectItem>
                                <SelectItem value="hiphop">Hip-Hop</SelectItem>
                                <SelectItem value="rnb">R&B</SelectItem>
                                <SelectItem value="jazz">Jazz</SelectItem>
                                <SelectItem value="classical">Classical</SelectItem>
                                <SelectItem value="country">Country</SelectItem>
                                <SelectItem value="folk">Folk</SelectItem>
                                <SelectItem value="indie">Indie</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="secondaryGenre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Genre (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select secondary genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="electronic">Electronic</SelectItem>
                                <SelectItem value="pop">Pop</SelectItem>
                                <SelectItem value="rock">Rock</SelectItem>
                                <SelectItem value="hiphop">Hip-Hop</SelectItem>
                                <SelectItem value="rnb">R&B</SelectItem>
                                <SelectItem value="jazz">Jazz</SelectItem>
                                <SelectItem value="classical">Classical</SelectItem>
                                <SelectItem value="country">Country</SelectItem>
                                <SelectItem value="folk">Folk</SelectItem>
                                <SelectItem value="indie">Indie</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="german">German</SelectItem>
                                <SelectItem value="portuguese">Portuguese</SelectItem>
                                <SelectItem value="japanese">Japanese</SelectItem>
                                <SelectItem value="korean">Korean</SelectItem>
                                <SelectItem value="instrumental">Instrumental (No Lyrics)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="coverArt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Art</FormLabel>
                          <div className="mt-2 flex flex-col items-center gap-4 rounded-lg border border-dashed p-6">
                            {coverArtPreview ? (
                              <img
                                src={coverArtPreview || "/placeholder.svg"}
                                alt="Cover Art Preview"
                                className="aspect-square w-full max-w-[200px] rounded-md object-cover"
                              />
                            ) : (
                              <div className="flex h-40 w-40 items-center justify-center rounded-md bg-muted">
                                <Upload className="h-10 w-10 text-muted-foreground" />
                              </div>
                            )}
                            <div className="text-center">
                              <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() => document.getElementById("cover-art")?.click()}
                              >
                                {coverArtPreview ? "Change Cover Art" : "Upload Cover Art"}
                              </Button>
                              <FormControl>
                                <Input
                                  id="cover-art"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    handleCoverArtChange(e)
                                    field.onChange(e.target.files?.[0] || null)
                                  }}
                                />
                              </FormControl>
                              <p className="mt-2 text-xs text-muted-foreground">3000x3000px, RGB, JPG/PNG format</p>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="audioFile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audio File</FormLabel>
                          <div className="mt-2 flex flex-col items-center gap-4 rounded-lg border border-dashed p-6">
                            <div className="flex h-40 w-full items-center justify-center rounded-md bg-muted">
                              {audioFile ? (
                                <div className="flex flex-col items-center">
                                  <Check className="h-10 w-10 text-green-500" />
                                  <p className="mt-2 text-sm font-medium">{audioFile.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              ) : (
                                <Upload className="h-10 w-10 text-muted-foreground" />
                              )}
                            </div>
                            <div className="text-center">
                              <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() => document.getElementById("audio-file")?.click()}
                              >
                                {audioFile ? "Change Audio File" : "Upload Audio File"}
                              </Button>
                              <FormControl>
                                <Input
                                  id="audio-file"
                                  type="file"
                                  accept="audio/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    handleAudioFileChange(e)
                                    field.onChange(e.target.files?.[0] || null)
                                  }}
                                />
                              </FormControl>
                              <p className="mt-2 text-xs text-muted-foreground">WAV, FLAC, MP3 format</p>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/music">Cancel</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" type="button" disabled={isUploading}>
                    Save Draft
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-sonar-coral-500 hover:bg-sonar-coral-600"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        Upload Track
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </PageContent>
    </PageContainer>
  )
}
