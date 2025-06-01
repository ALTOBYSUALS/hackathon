"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Heart,
  MessageCircle,
  Share2,
  Diamond,
  MoreHorizontal,
  Bookmark,
  BookmarkCheck,
  Flag,
  UserPlus,
  UserMinus,
  Bell,
  Copy,
  ExternalLink,
  Play,
  Pause,
  Boxes,
  Wallet,
  Send,
  Headphones,
  Calendar,
  Clock,
  MapPin,
  Link2,
  Loader2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EnhancedPostCardProps {
  post: any
  onPlay?: (track: any) => void
  isPlaying?: boolean
}

export function EnhancedPostCard({ post, onPlay, isPlaying = false }: EnhancedPostCardProps) {
  const [liked, setLiked] = useState(post.liked || false)
  const [saved, setSaved] = useState(post.saved || false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [showReactions, setShowReactions] = useState(false)
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [showTipDialog, setShowTipDialog] = useState(false)
  const [tipAmount, setTipAmount] = useState("0.01")

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  const handleReaction = (emoji: string) => {
    setSelectedReaction(emoji)
    setShowReactions(false)
    setLiked(true)
  }

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") return

    setIsSubmittingComment(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newComment = {
      id: Date.now(),
      author: {
        name: "You",
        username: "yourusername",
        avatar: "/abstract-geometric-shapes.png",
        isVerified: false,
      },
      content: commentText,
      timestamp: "Just now",
      likes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")
    setIsSubmittingComment(false)
  }

  const handlePlayTrack = () => {
    if (post.track && onPlay) {
      onPlay(post.track)
    }
  }

  const formatContent = (content: string) => {
    // Format hashtags
    let formattedContent = content.replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>')

    // Format mentions
    formattedContent = formattedContent.replace(/@(\w+)/g, '<span class="text-primary font-medium">@$1</span>')

    return formattedContent
  }

  return (
    <Card className="overflow-hidden animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Link href={`/social/${post.author.username}`}>
            <Avatar>
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link href={`/social/${post.author.username}`} className="font-semibold hover:underline">
                {post.author.name}
              </Link>
              <span className="text-sm text-muted-foreground">@{post.author.username}</span>
              {post.author.isVerified && (
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                  {post.author.hasNFTBadge ? "NFT" : "Verified"}
                </Badge>
              )}
              {post.communityPost && (
                <Badge variant="outline" className="text-xs">
                  <Image
                    src={post.communityPost.icon || "/placeholder.svg"}
                    alt={post.communityPost.community}
                    width={12}
                    height={12}
                    className="mr-1"
                  />
                  {post.communityPost.community}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleSave}>
                {saved ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Save post</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {post.author.isFollowing ? (
                  <>
                    <UserMinus className="mr-2 h-4 w-4" />
                    <span>Unfollow @{post.author.username}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Follow @{post.author.username}</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Turn on notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy link to post</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Flag className="mr-2 h-4 w-4" />
                <span>Report post</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="whitespace-pre-wrap mb-4" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className={`grid ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2 mb-4`}>
            {post.images.map((image, index) => (
              <div key={index} className="relative rounded-md overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Post image"
                  width={500}
                  height={300}
                  className="object-cover w-full h-full max-h-[300px]"
                />
              </div>
            ))}
          </div>
        )}

        {/* Music Track */}
        {post.track && (
          <div className="mt-3 rounded-md overflow-hidden border bg-card">
            <div className="flex items-center p-3 gap-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={post.track.coverArt || "/placeholder.svg"}
                  alt={post.track.title}
                  fill
                  className="object-cover rounded-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-0 bg-black/30 rounded-sm hover:bg-black/40 transition-colors"
                  onClick={handlePlayTrack}
                >
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </Button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{post.track.title}</p>
                <p className="text-sm text-muted-foreground truncate">{post.track.artist}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Headphones className="h-3 w-3" />
                <span>{post.track.duration}</span>
              </div>
            </div>
          </div>
        )}

        {/* NFT Details */}
        {post.hasNFT && post.nftDetails && (
          <div className="mt-3 rounded-md overflow-hidden border bg-card p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Boxes className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">NFT</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {post.nftDetails.blockchain}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Edition: {post.nftDetails.edition}</span>
              <div className="flex items-center gap-1">
                <Diamond className="h-4 w-4 text-primary" />
                <span className="font-medium">{post.nftDetails.price} ETH</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">
              <Wallet className="h-4 w-4 mr-2" />
              Collect NFT
            </Button>
          </div>
        )}

        {/* Event Details */}
        {post.event && (
          <div className="mt-3 rounded-md overflow-hidden border bg-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{post.event.title}</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span>
                  {post.event.date} at {post.event.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span>{post.event.platform}</span>
              </div>
              {post.event.link && (
                <div className="flex items-center gap-2">
                  <Link2 className="h-3 w-3 text-muted-foreground" />
                  <a
                    href={post.event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    Join Event
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 flex flex-col">
        <div className="flex justify-between w-full">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 ${liked ? "text-primary" : ""}`}
              onClick={handleLike}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              {selectedReaction ? (
                <span className="text-lg mr-1">{selectedReaction}</span>
              ) : (
                <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`} />
              )}
              <span className="text-xs">{post.likes}</span>
            </Button>

            {/* Reaction Picker */}
            {showReactions && (
              <div className="absolute -top-10 left-0 bg-card border rounded-full px-2 py-1 shadow-md z-10 flex gap-1">
                {["❤️", "🔥", "🙌", "😮", "😂", "🎵"].map((emoji) => (
                  <button
                    key={emoji}
                    className="text-lg hover:scale-125 transition-transform"
                    onClick={() => handleReaction(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.comments}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Share2 className="h-4 w-4" />
                <span className="text-xs">{post.shares}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Share to Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Share to Instagram</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Share to Discord</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showTipDialog} onOpenChange={setShowTipDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Diamond className="h-4 w-4" />
                <span className="text-xs">{post.tips}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Send Tip to {post.author.name}</DialogTitle>
                <DialogDescription>Support this artist by sending them a crypto tip.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Amount (ETH)</span>
                    <span className="text-sm text-muted-foreground">≈ $18.42 USD</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setTipAmount("0.01")}>
                      0.01
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTipAmount("0.05")}>
                      0.05
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTipAmount("0.1")}>
                      0.1
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTipAmount("0.5")}>
                      0.5
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTipAmount("1")}>
                      1.0
                    </Button>
                  </div>
                  <input
                    type="number"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    min="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Add a message (optional)</span>
                  <Textarea placeholder="Great work! Keep it up!" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowTipDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary">
                  <Wallet className="mr-2 h-4 w-4" />
                  Send Tip
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 w-full space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/abstract-geometric-shapes.png" alt="Your avatar" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Write a comment..."
                  className="resize-none min-h-[80px]"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleCommentSubmit}
                    disabled={commentText.trim() === "" || isSubmittingComment}
                  >
                    {isSubmittingComment ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 ml-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                    </div>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  Be the first to comment on this post
                </div>
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
