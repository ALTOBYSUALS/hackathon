"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Music,
  ImageIcon,
  LucideLink,
  Video,
  FileMusic,
  Calendar,
  Smile,
  AtSign,
  Hash,
  Lock,
  Boxes,
  Sparkles,
  Loader2,
  X,
  Upload,
} from "lucide-react"
import Image from "next/image"

export function AdvancedPostCreator() {
  const [postContent, setPostContent] = useState("")
  const [postType, setPostType] = useState("text")
  const [attachments, setAttachments] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [isTokenGated, setIsTokenGated] = useState(false)
  const [mintAsNFT, setMintAsNFT] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setPostContent(text)
    setCharCount(text.length)
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleAudioUpload = () => {
    audioInputRef.current?.click()
  }

  const handleVideoUpload = () => {
    videoInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a URL for the file
      const newAttachments = Array.from(files).map((file) => ({
        id: Date.now(),
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("audio/")
            ? "audio"
            : file.type.startsWith("video/")
              ? "video"
              : "file",
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      }))

      setAttachments([...attachments, ...newAttachments])
    }
  }

  const removeAttachment = (id: number) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  const handleSubmit = async () => {
    if (postContent.trim() === "" && attachments.length === 0) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setPostContent("")
    setAttachments([])
    setCharCount(0)
    setIsTokenGated(false)
    setMintAsNFT(false)
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="/abstract-geometric-shapes.png" alt="@usuario" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Tabs defaultValue="text" onValueChange={setPostType}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
              <TabsTrigger value="event">Event</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="pt-4">
              <Textarea
                placeholder="What's on your mind?"
                className="resize-none min-h-[120px]"
                value={postContent}
                onChange={handleContentChange}
                maxLength={1000}
              />
            </TabsContent>

            <TabsContent value="music" className="pt-4">
              <Textarea
                placeholder="Share your latest track or musical thoughts..."
                className="resize-none min-h-[120px]"
                value={postContent}
                onChange={handleContentChange}
                maxLength={1000}
              />

              <div className="mt-4 p-4 border rounded-md bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <Music className="h-4 w-4 mr-2" />
                    Attach Music
                  </h4>
                  <Button variant="outline" size="sm" onClick={handleAudioUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input
                    type="file"
                    ref={audioInputRef}
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="track-title">Track Title</Label>
                    <Input id="track-title" placeholder="Enter track title" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="track-genre">Genre</Label>
                    <Select>
                      <SelectTrigger id="track-genre">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="hiphop">Hip Hop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="ambient">Ambient</SelectItem>
                        <SelectItem value="classical">Classical</SelectItem>
                        <SelectItem value="jazz">Jazz</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {attachments.filter((a) => a.type === "audio").length > 0 ? (
                    <div className="space-y-2 mt-4">
                      {attachments
                        .filter((a) => a.type === "audio")
                        .map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-2 bg-background rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <FileMusic className="h-4 w-4 text-primary" />
                              <span className="text-sm truncate max-w-[200px]">{attachment.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeAttachment(attachment.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">No audio file attached</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nft" className="pt-4">
              <Textarea
                placeholder="Share your NFT or token-gated content..."
                className="resize-none min-h-[120px]"
                value={postContent}
                onChange={handleContentChange}
                maxLength={1000}
              />

              <div className="mt-4 p-4 border rounded-md bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <Boxes className="h-4 w-4 mr-2" />
                    NFT Options
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <Label htmlFor="mint-nft">Mint as NFT</Label>
                    </div>
                    <Switch id="mint-nft" checked={mintAsNFT} onCheckedChange={setMintAsNFT} />
                  </div>

                  {mintAsNFT && (
                    <div className="space-y-2 pl-6">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="nft-price">Price (ETH)</Label>
                        <Input id="nft-price" type="number" placeholder="0.05" min="0" step="0.01" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label htmlFor="nft-editions">Editions</Label>
                        <Input id="nft-editions" type="number" placeholder="10" min="1" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label htmlFor="nft-royalty">Royalty %</Label>
                        <Input id="nft-royalty" type="number" placeholder="10" min="0" max="100" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <Label htmlFor="token-gated">Token-gated content</Label>
                    </div>
                    <Switch id="token-gated" checked={isTokenGated} onCheckedChange={setIsTokenGated} />
                  </div>

                  {isTokenGated && (
                    <div className="space-y-2 pl-6">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="token-contract">Token Contract</Label>
                        <Input id="token-contract" placeholder="0x..." />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label htmlFor="token-id">Token ID (optional)</Label>
                        <Input id="token-id" placeholder="Leave empty for any token" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="event" className="pt-4">
              <Textarea
                placeholder="Share details about your upcoming event..."
                className="resize-none min-h-[120px]"
                value={postContent}
                onChange={handleContentChange}
                maxLength={1000}
              />

              <div className="mt-4 p-4 border rounded-md bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Event Details
                  </h4>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="event-platform">Platform</Label>
                    <Select>
                      <SelectTrigger id="event-platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube Live</SelectItem>
                        <SelectItem value="twitch">Twitch</SelectItem>
                        <SelectItem value="instagram">Instagram Live</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="metaverse">Metaverse</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="event-link">Link</Label>
                    <Input id="event-link" placeholder="https://" />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <Label htmlFor="event-token-gated">Token-gated event</Label>
                    </div>
                    <Switch id="event-token-gated" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Attachments preview */}
          {attachments.filter((a) => a.type === "image").length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {attachments
                .filter((a) => a.type === "image")
                .map((attachment) => (
                  <div key={attachment.id} className="relative group">
                    <Image
                      src={attachment.url || "/placeholder.svg"}
                      alt="Attachment"
                      width={300}
                      height={200}
                      className="rounded-md object-cover h-[150px] w-full"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeAttachment(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          )}

          {attachments.filter((a) => a.type === "video").length > 0 && (
            <div className="space-y-2 mt-4">
              {attachments
                .filter((a) => a.type === "video")
                .map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-primary" />
                      <span className="text-sm truncate max-w-[200px]">{attachment.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeAttachment(attachment.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleImageUpload}>
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

              <Button variant="ghost" size="icon" onClick={handleVideoUpload}>
                <Video className="h-5 w-5 text-muted-foreground" />
              </Button>
              <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <LucideLink className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Link</DialogTitle>
                    <DialogDescription>Enter the URL you want to share.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link-url" className="text-right">
                        URL
                      </Label>
                      <Input id="link-url" placeholder="https://" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link-title" className="text-right">
                        Title
                      </Label>
                      <Input id="link-title" placeholder="Optional title" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Link</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Smile className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Button variant="ghost" size="icon">
                <AtSign className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Button variant="ghost" size="icon">
                <Hash className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs ${charCount > 900 ? "text-amber-500" : charCount > 980 ? "text-red-500" : "text-muted-foreground"}`}
              >
                {charCount}/1000
              </span>
              <Button
                className="bg-gradient-to-r from-brand-primary to-brand-secondary"
                onClick={handleSubmit}
                disabled={isSubmitting || (postContent.trim() === "" && attachments.length === 0)}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
