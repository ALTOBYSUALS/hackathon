"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Music, TrendingUpIcon as Trending, Users, Filter, Sparkles, Globe, Layers } from "lucide-react"
import Image from "next/image"
import { AdvancedPostCreator } from "@/components/social/advanced-post-creator"
import { EnhancedPostCard } from "@/components/social/enhanced-post-card"
import { MusicPlayer } from "@/components/social/music-player"
import { TrendingTopics } from "@/components/social/trending-topics"
import { SuggestedCommunities } from "@/components/social/suggested-communities"
import { UpcomingEvents } from "@/components/social/upcoming-events"
import { FeedFilters } from "@/components/social/feed-filters"
import { NFTShowcase } from "@/components/social/nft-showcase"

export default function EnhancedSocialPage() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any>(null)
  const [feedView, setFeedView] = useState("grid")

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold gradient-text">Social Hub</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
              <TabsTrigger value="for-you">
                <Sparkles className="h-4 w-4 mr-2" />
                For You
              </TabsTrigger>
              <TabsTrigger value="following">
                <Users className="h-4 w-4 mr-2" />
                Following
              </TabsTrigger>
              <TabsTrigger value="trending">
                <Trending className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="communities">
                <Globe className="h-4 w-4 mr-2" />
                Communities
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={() => setFeedView(feedView === "grid" ? "list" : "grid")}>
              {feedView === "grid" ? <Layers className="h-4 w-4 mr-2" /> : <Layers className="h-4 w-4 mr-2" />}
              {feedView === "grid" ? "Grid View" : "List View"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Feed Filters</DialogTitle>
                  <DialogDescription>
                    Customize your feed to see the content that matters most to you.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Content Type</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        All
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Posts
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Music
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        NFTs
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Events
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Genre</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        All
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Electronic
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Hip Hop
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Rock
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Pop
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Classical
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Time Range</h4>
                    <Select defaultValue="week">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Last 24 hours</SelectItem>
                        <SelectItem value="week">This week</SelectItem>
                        <SelectItem value="month">This month</SelectItem>
                        <SelectItem value="year">This year</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Popularity</h4>
                      <span className="text-sm text-muted-foreground">Medium</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Trending Topics</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TrendingTopics />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Suggested Communities</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SuggestedCommunities />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Upcoming Events</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <UpcomingEvents />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main feed */}
          <div className="lg:col-span-2">
            {/* Post creator */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <AdvancedPostCreator />
              </CardContent>
            </Card>

            {/* Feed filters - mobile only */}
            <div className="lg:hidden mb-4">
              <FeedFilters />
            </div>

            {/* Feed */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="for-you" className="mt-0">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className={`space-y-4 pr-4 ${feedView === "grid" ? "grid grid-cols-1 gap-4" : "space-y-4"}`}>
                    {enhancedPosts.map((post) => (
                      <EnhancedPostCard
                        key={post.id}
                        post={post}
                        onPlay={(track) => setCurrentlyPlaying(track)}
                        isPlaying={currentlyPlaying?.id === post.track?.id}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="following" className="mt-0">
                <div className="flex items-center justify-center h-[calc(100vh-280px)]">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Follow more artists</h3>
                    <p className="text-muted-foreground mb-4">
                      Start following artists to see their posts in your feed.
                    </p>
                    <Button>Discover Artists</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trending" className="mt-0">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className={`space-y-4 pr-4 ${feedView === "grid" ? "grid grid-cols-1 gap-4" : "space-y-4"}`}>
                    {trendingPosts.map((post) => (
                      <EnhancedPostCard
                        key={post.id}
                        post={post}
                        onPlay={(track) => setCurrentlyPlaying(track)}
                        isPlaying={currentlyPlaying?.id === post.track?.id}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="communities" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {communities.map((community) => (
                    <Card key={community.id} className="overflow-hidden">
                      <div className="relative h-32">
                        <Image
                          src={community.coverImage || "/placeholder.svg"}
                          alt={community.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h3 className="font-bold text-lg">{community.name}</h3>
                          <p className="text-sm text-white/80">{community.members} members</p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                        <Button variant="outline" className="w-full">
                          Join Community
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="font-semibold text-lg mb-4">Recent Community Posts</h3>
                <ScrollArea className="h-[calc(100vh-480px)]">
                  <div className="space-y-4 pr-4">
                    {communityPosts.map((post) => (
                      <EnhancedPostCard
                        key={post.id}
                        post={post}
                        onPlay={(track) => setCurrentlyPlaying(track)}
                        isPlaying={currentlyPlaying?.id === post.track?.id}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Featured Artists</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featuredArtists.map((artist) => (
                    <div key={artist.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
                        <AvatarFallback>{artist.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{artist.name}</p>
                        <p className="text-xs text-muted-foreground">{artist.followers} followers</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Follow
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full">
                    View more
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">NFT Showcase</h3>
                </CardHeader>
                <CardContent>
                  <NFTShowcase />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold">Now Playing</h3>
                </CardHeader>
                <CardContent>
                  {currentlyPlaying ? (
                    <MusicPlayer track={currentlyPlaying} />
                  ) : (
                    <div className="text-center py-6">
                      <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Play a track to see it here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile music player */}
      {currentlyPlaying && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card border-t border-border p-2 z-50 lg:hidden">
          <MusicPlayer track={currentlyPlaying} compact />
        </div>
      )}
    </div>
  )
}

// Sample data
const enhancedPosts = [
  {
    id: 1,
    author: {
      name: "Luna Waves",
      username: "lunawaves",
      avatar: "/abstract-lw.png",
      isVerified: true,
      hasNFTBadge: true,
    },
    content:
      "Just dropped my new single! This one explores some deep electronic vibes with a touch of ambient soundscapes. Would love to hear what you all think! 🎵✨ #NewMusic #Electronic #AmbientVibes",
    timestamp: "2h ago",
    likes: 245,
    comments: 37,
    shares: 18,
    tips: 5,
    reactions: {
      "❤️": 156,
      "🔥": 89,
      "🙌": 42,
      "🎵": 67,
    },
    liked: true,
    saved: false,
    track: {
      id: "track1",
      title: "Midnight Dreams",
      artist: "Luna Waves",
      coverArt: "/midnight-dreams-album-cover.png",
      audioUrl: "/audio-samples/midnight-dreams.mp3",
      duration: "3:42",
    },
    hasNFT: true,
    nftDetails: {
      tokenId: "NFT-001",
      blockchain: "Ethereum",
      price: 0.05,
      edition: "1 of 10",
    },
    tags: ["electronic", "ambient", "newrelease"],
    mentions: ["@synthcollective", "@ambientdreams"],
  },
  {
    id: 2,
    author: {
      name: "Neon Pulse",
      username: "neonpulse",
      avatar: "/abstract-geometric-np.png",
      isVerified: true,
      hasNFTBadge: true,
    },
    content:
      "Working on something special for you all. The Web3 music space is evolving so quickly, and I'm excited to be part of it. Here's a sneak peek of what I've been building - a platform where artists can collaborate directly with their fans through token-gated experiences. 🚀 #Web3Music #NFTs #MusicTech",
    timestamp: "5h ago",
    likes: 189,
    comments: 24,
    shares: 7,
    tips: 3,
    reactions: {
      "❤️": 102,
      "🔥": 45,
      "🙌": 22,
      "🚀": 20,
    },
    liked: false,
    saved: true,
    images: ["/web3-music-platform.png"],
    hasNFT: false,
    tags: ["web3", "musictech", "nfts"],
    mentions: ["@cryptobeats", "@web3audio"],
  },
  {
    id: 3,
    author: {
      name: "Echo Valley",
      username: "echovalley",
      avatar: "/electric-vehicle-charging.png",
      isVerified: false,
      hasNFTBadge: false,
    },
    content:
      "Just joined this amazing community of ambient music producers! We're planning a collaborative album where each track transitions seamlessly into the next. Looking for more collaborators who specialize in field recordings and atmospheric textures. Drop a comment if you're interested! 🎧 #AmbientMusic #Collaboration #FieldRecordings",
    timestamp: "8h ago",
    likes: 76,
    comments: 15,
    shares: 2,
    tips: 0,
    reactions: {
      "❤️": 45,
      "🎧": 31,
    },
    liked: false,
    saved: false,
    communityPost: {
      community: "Ambient Explorers",
      icon: "/ambient-explorers-icon.png",
    },
    tags: ["ambient", "collaboration", "fieldrecordings"],
    mentions: [],
  },
  {
    id: 4,
    author: {
      name: "Synth Collective",
      username: "synthcollective",
      avatar: "/stylized-initials-sc.png",
      isVerified: true,
      hasNFTBadge: true,
    },
    content:
      "We're excited to announce our new token-gated community! Holders of our Genesis NFT collection will get exclusive access to our sample packs, unreleased tracks, and monthly virtual studio sessions. Limited to 100 members - minting opens tomorrow at noon UTC. 🎹🔊 #Web3Music #NFTCommunity #SynthMusic",
    timestamp: "12h ago",
    likes: 312,
    comments: 42,
    shares: 28,
    tips: 15,
    reactions: {
      "❤️": 187,
      "🔥": 95,
      "🙌": 30,
    },
    liked: false,
    saved: false,
    track: {
      id: "track2",
      title: "Digital Horizons",
      artist: "Synth Collective",
      coverArt: "/electronic-album-cover.png",
      audioUrl: "/audio-samples/digital-horizons.mp3",
      duration: "4:15",
    },
    hasNFT: true,
    nftDetails: {
      tokenId: "SYNTH-001",
      blockchain: "Polygon",
      price: 0.1,
      edition: "Genesis Collection",
    },
    tags: ["web3music", "nftcommunity", "synthmusic"],
    mentions: [],
  },
  {
    id: 5,
    author: {
      name: "Acoustic Dreams",
      username: "acousticdreams",
      avatar: "/abstract-geometric-ad.png",
      isVerified: false,
      hasNFTBadge: false,
    },
    content:
      "Live acoustic session this Friday at 8pm EST! I'll be playing songs from my new album and taking requests. The stream will be available to everyone, but token holders will get access to the high-quality recording afterward. Drop a comment with song requests! 🎸 #LiveMusic #AcousticSession #VirtualConcert",
    timestamp: "1d ago",
    likes: 154,
    comments: 19,
    shares: 8,
    tips: 2,
    reactions: {
      "❤️": 98,
      "🎸": 56,
    },
    liked: true,
    saved: true,
    track: {
      id: "track3",
      title: "Acoustic Sessions Vol. 3",
      artist: "Acoustic Dreams",
      coverArt: "/acoustic-sessions-album-cover.png",
      audioUrl: "/audio-samples/acoustic-sessions.mp3",
      duration: "5:21",
    },
    event: {
      title: "Live Acoustic Session",
      date: "Friday, May 12, 2023",
      time: "8:00 PM EST",
      platform: "YouTube Live",
      link: "https://youtube.com/live/acousticdreams",
    },
    tags: ["livemusic", "acousticsession", "virtualconcert"],
    mentions: [],
  },
]

const trendingPosts = [
  {
    id: 6,
    author: {
      name: "Bass Dimension",
      username: "bassdimension",
      avatar: "/abstract-bd.png",
      isVerified: true,
      hasNFTBadge: true,
    },
    content:
      "Our remix competition is now LIVE! Download the stems from our latest track, create your remix, and submit by May 30th. The winner gets their remix officially released, 50% royalty split, and 500 USDC prize! #RemixCompetition #MusicProduction #BassMusic",
    timestamp: "6h ago",
    likes: 876,
    comments: 134,
    shares: 245,
    tips: 23,
    reactions: {
      "❤️": 456,
      "🔥": 320,
      "🙌": 100,
    },
    liked: false,
    saved: false,
    track: {
      id: "track4",
      title: "Quantum Leap (Stems)",
      artist: "Bass Dimension",
      coverArt: "/bass-dimension-album.png",
      audioUrl: "/audio-samples/quantum-leap.mp3",
      duration: "3:18",
    },
    tags: ["remixcompetition", "musicproduction", "bassmusic"],
    mentions: [],
  },
  {
    id: 7,
    author: {
      name: "Crypto Beats DAO",
      username: "cryptobeats",
      avatar: "/crypto-beats-logo.png",
      isVerified: true,
      hasNFTBadge: true,
    },
    content:
      "We just acquired the rights to a legendary sample pack from the 90s and made it available to all our DAO members! This is how we're preserving music history while empowering the next generation of producers. Join our DAO to get access! #MusicDAO #Web3 #SamplePack",
    timestamp: "1d ago",
    likes: 1243,
    comments: 87,
    shares: 312,
    tips: 45,
    reactions: {
      "❤️": 678,
      "🔥": 345,
      "🙌": 220,
    },
    liked: false,
    saved: false,
    images: ["/vintage-sampler.png"],
    hasNFT: true,
    nftDetails: {
      tokenId: "DAO-MEMBERSHIP",
      blockchain: "Ethereum",
      price: 0.2,
      edition: "Membership Token",
    },
    tags: ["musicdao", "web3", "samplepack"],
    mentions: [],
  },
]

const communityPosts = [
  {
    id: 8,
    author: {
      name: "DJ Horizon",
      username: "djhorizon",
      avatar: "/dj-horizon-profile.png",
      isVerified: false,
      hasNFTBadge: false,
    },
    content:
      "Hey House Heads community! I'm hosting a production workshop next week where I'll break down my latest track. We'll go through sound design, arrangement, and mixing techniques. Free for all community members! #HouseMusic #ProductionTips #MusicWorkshop",
    timestamp: "3h ago",
    likes: 67,
    comments: 12,
    shares: 5,
    tips: 2,
    reactions: {
      "❤️": 42,
      "🔥": 25,
    },
    liked: false,
    saved: false,
    communityPost: {
      community: "House Heads",
      icon: "/house-heads-icon.png",
    },
    event: {
      title: "House Production Workshop",
      date: "Wednesday, May 17, 2023",
      time: "7:00 PM CET",
      platform: "Discord",
      link: "https://discord.gg/househeads",
    },
    tags: ["housemusic", "productiontips", "musicworkshop"],
    mentions: [],
  },
  {
    id: 9,
    author: {
      name: "Melody Maker",
      username: "melodymaker",
      avatar: "/melody-maker-profile.png",
      isVerified: true,
      hasNFTBadge: false,
    },
    content:
      "Just shared my chord progression template with the Songwriters Circle community! It includes 50+ progressions across different genres with MIDI files and notation. Check the community resources section to download it. Hope it helps with your songwriting! #SongwritingTips #ChordProgressions #MusicTheory",
    timestamp: "2d ago",
    likes: 124,
    comments: 31,
    shares: 18,
    tips: 7,
    reactions: {
      "❤️": 89,
      "🙌": 35,
    },
    liked: true,
    saved: true,
    communityPost: {
      community: "Songwriters Circle",
      icon: "/songwriters-circle-icon.png",
    },
    tags: ["songwritingtips", "chordprogressions", "musictheory"],
    mentions: [],
  },
]

const communities = [
  {
    id: 1,
    name: "House Heads",
    description: "A community for house music producers, DJs, and enthusiasts to share tracks, techniques, and events.",
    members: 4567,
    coverImage: "/house-music-community.png",
    icon: "/house-heads-icon.png",
  },
  {
    id: 2,
    name: "Songwriters Circle",
    description: "Connect with fellow songwriters, share your work, get feedback, and collaborate on new projects.",
    members: 3298,
    coverImage: "/songwriters-community.png",
    icon: "/songwriters-circle-icon.png",
  },
  {
    id: 3,
    name: "Web3 Music Pioneers",
    description:
      "Exploring the intersection of blockchain technology and music. Discussions on NFTs, DAOs, and the future of the industry.",
    members: 2156,
    coverImage: "/web3-music-community.png",
    icon: "/web3-music-icon.png",
  },
  {
    id: 4,
    name: "Ambient Explorers",
    description: "A space for ambient, experimental, and atmospheric music creators to share their sonic journeys.",
    members: 1872,
    coverImage: "/ambient-music-community.png",
    icon: "/ambient-explorers-icon.png",
  },
]

const featuredArtists = [
  {
    id: 1,
    name: "Luna Waves",
    username: "lunawaves",
    avatar: "/abstract-lw.png",
    followers: 12453,
    isVerified: true,
  },
  {
    id: 2,
    name: "Neon Pulse",
    username: "neonpulse",
    avatar: "/abstract-geometric-np.png",
    followers: 8921,
    isVerified: true,
  },
  {
    id: 3,
    name: "Echo Valley",
    username: "echovalley",
    avatar: "/electric-vehicle-charging.png",
    followers: 5672,
    isVerified: false,
  },
  {
    id: 4,
    name: "Synth Collective",
    username: "synthcollective",
    avatar: "/stylized-initials-sc.png",
    followers: 15789,
    isVerified: true,
  },
  {
    id: 5,
    name: "Acoustic Dreams",
    username: "acousticdreams",
    avatar: "/abstract-geometric-ad.png",
    followers: 7345,
    isVerified: false,
  },
]
