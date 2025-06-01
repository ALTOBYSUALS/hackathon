"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ExternalLink, Filter, Search, Trophy, DollarSign, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for contests
const contests = [
  {
    id: 1,
    title: "Global Electronic Music Contest 2024",
    organizer: "MUSIC BASE",
    type: "Production",
    description:
      "International electronic music contest with cash prizes and label deals. Submit your best electronic tracks.",
    deadline: "2024-07-31",
    prize: "$10,000 + Label Deal",
    entryFee: "Free",
    participants: 1247,
    genres: ["Electronic", "House", "Techno", "Trance"],
    featured: true,
  },
  {
    id: 2,
    title: "Remix Challenge - Major Label Track",
    organizer: "Universal Music",
    type: "Remix",
    description: "Remix a hit track from a major label artist. Winner gets official release and promotion.",
    deadline: "2024-06-20",
    prize: "Official Release + $5,000",
    entryFee: "Free",
    participants: 892,
    genres: ["Electronic", "Pop", "Dance"],
    featured: true,
  },
  {
    id: 3,
    title: "Singer-Songwriter Competition",
    organizer: "Indie Music Awards",
    type: "Songwriting",
    description: "Showcase your original songs and lyrics. Open to all genres with acoustic focus.",
    deadline: "2024-08-15",
    prize: "$3,000 + Recording Session",
    entryFee: "$25",
    participants: 456,
    genres: ["Acoustic", "Folk", "Indie", "Singer-Songwriter"],
    featured: false,
  },
  {
    id: 4,
    title: "Beat Battle Championship",
    organizer: "Hip Hop Collective",
    type: "Production",
    description: "Monthly beat battle with hip-hop producers. Show off your best beats and win cash prizes.",
    deadline: "2024-06-30",
    prize: "$1,500 + Equipment",
    entryFee: "$10",
    participants: 234,
    genres: ["Hip-Hop", "Trap", "Boom Bap"],
    featured: false,
  },
  {
    id: 5,
    title: "Film Score Competition",
    organizer: "Cinematic Music Society",
    type: "Composition",
    description: "Compose original music for provided film scenes. Perfect for aspiring film composers.",
    deadline: "2024-09-01",
    prize: "$5,000 + Film Credits",
    entryFee: "$50",
    participants: 178,
    genres: ["Cinematic", "Orchestral", "Ambient"],
    featured: false,
  },
]

export default function Contests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [feeFilter, setFeeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter contests based on search query and filters
  const filteredContests = contests.filter((contest) => {
    const matchesSearch =
      contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || contest.type === typeFilter

    const matchesFee =
      feeFilter === "all" ||
      (feeFilter === "free" && contest.entryFee === "Free") ||
      (feeFilter === "paid" && contest.entryFee !== "Free")

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && contest.featured) ||
      (activeTab === "free" && contest.entryFee === "Free") ||
      (activeTab === "production" && contest.type === "Production") ||
      (activeTab === "songwriting" && contest.type === "Songwriting")

    return matchesSearch && matchesType && matchesFee && matchesTab
  })

  // Get contest type icon
  const getContestTypeIcon = (type: string) => {
    switch (type) {
      case "Production":
      case "Remix":
        return <Trophy className="h-4 w-4" />
      case "Songwriting":
      case "Composition":
        return <Users className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Contests</h1>
        <p className="text-muted-foreground">Participate in music contests and competitions</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Production">Production</SelectItem>
            <SelectItem value="Remix">Remix</SelectItem>
            <SelectItem value="Songwriting">Songwriting</SelectItem>
            <SelectItem value="Composition">Composition</SelectItem>
          </SelectContent>
        </Select>
        <Select value={feeFilter} onValueChange={(value) => setFeeFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Entry fee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contests</SelectItem>
            <SelectItem value="free">Free Entry</SelectItem>
            <SelectItem value="paid">Paid Entry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="free">Free Entry</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="songwriting">Songwriting</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredContests.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No contests found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContests.map((contest) => (
                <Card key={contest.id} className={contest.featured ? "border-[#8A3FFC]/30 shadow-md" : ""}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        className={
                          contest.type === "Production" || contest.type === "Remix"
                            ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }
                      >
                        {getContestTypeIcon(contest.type)}
                        <span className="ml-1">{contest.type}</span>
                      </Badge>
                      {contest.featured && (
                        <Badge className="bg-[#8A3FFC] text-white hover:bg-[#7B2CF9]">Featured</Badge>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{contest.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{contest.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>By: {contest.organizer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Prize: {contest.prize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{contest.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(contest.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {contest.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="bg-muted/50">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant={contest.entryFee === "Free" ? "secondary" : "outline"}>
                        {contest.entryFee === "Free" ? "Free Entry" : contest.entryFee}
                      </Badge>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4">
                    <Button className="w-full bg-[#8A3FFC] hover:bg-[#7B2CF9]" asChild>
                      <Link href={`/opportunities/contests/${contest.id}`}>
                        Enter Contest
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
