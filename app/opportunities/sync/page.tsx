"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ExternalLink, Filter, Search, Video, DollarSign, Music } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for sync licensing opportunities
const syncOpportunities = [
  {
    id: 1,
    title: "Netflix Original Series - Opening Theme",
    client: "Netflix Productions",
    type: "TV Series",
    description:
      "Seeking an upbeat, modern track for the opening sequence of a new teen drama series. 30-60 seconds needed.",
    deadline: "2024-06-30",
    budget: "$5,000 - $15,000",
    genres: ["Pop", "Electronic", "Indie"],
    mood: "Upbeat",
    duration: "30-60 seconds",
    featured: true,
  },
  {
    id: 2,
    title: "Commercial - Electric Vehicle Campaign",
    client: "Tesla Motors",
    type: "Commercial",
    description: "Looking for futuristic, clean electronic music for new electric vehicle commercial campaign.",
    deadline: "2024-07-15",
    budget: "$10,000 - $25,000",
    genres: ["Electronic", "Ambient", "Cinematic"],
    mood: "Futuristic",
    duration: "15-30 seconds",
    featured: true,
  },
  {
    id: 3,
    title: "Indie Film - Emotional Scene",
    client: "Sundance Films",
    type: "Film",
    description: "Independent drama needs emotional, piano-driven track for key dramatic scene.",
    deadline: "2024-06-25",
    budget: "$2,000 - $5,000",
    genres: ["Classical", "Ambient", "Instrumental"],
    mood: "Emotional",
    duration: "2-3 minutes",
    featured: false,
  },
  {
    id: 4,
    title: "Video Game - Action Sequence",
    client: "Epic Games",
    type: "Video Game",
    description: "AAA video game needs high-energy rock/electronic hybrid for boss battle sequences.",
    deadline: "2024-08-01",
    budget: "$8,000 - $20,000",
    genres: ["Rock", "Electronic", "Metal"],
    mood: "Intense",
    duration: "3-5 minutes",
    featured: false,
  },
  {
    id: 5,
    title: "Documentary - Nature Scenes",
    client: "National Geographic",
    type: "Documentary",
    description: "Nature documentary needs ambient, organic soundscapes for wildlife footage.",
    deadline: "2024-07-20",
    budget: "$3,000 - $8,000",
    genres: ["Ambient", "World", "Instrumental"],
    mood: "Peaceful",
    duration: "1-2 minutes",
    featured: false,
  },
]

export default function SyncLicensing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [budgetFilter, setBudgetFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter sync opportunities based on search query and filters
  const filteredOpportunities = syncOpportunities.filter((sync) => {
    const matchesSearch =
      sync.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sync.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sync.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || sync.type === typeFilter

    const matchesBudget =
      budgetFilter === "all" ||
      (budgetFilter === "low" && sync.budget.includes("2,000")) ||
      (budgetFilter === "medium" && (sync.budget.includes("5,000") || sync.budget.includes("8,000"))) ||
      (budgetFilter === "high" && (sync.budget.includes("10,000") || sync.budget.includes("15,000")))

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && sync.featured) ||
      (activeTab === "film" && sync.type === "Film") ||
      (activeTab === "tv" && sync.type === "TV Series") ||
      (activeTab === "commercial" && sync.type === "Commercial")

    return matchesSearch && matchesType && matchesBudget && matchesTab
  })

  // Get sync type icon
  const getSyncTypeIcon = (type: string) => {
    switch (type) {
      case "Film":
      case "TV Series":
      case "Documentary":
        return <Video className="h-4 w-4" />
      case "Commercial":
        return <DollarSign className="h-4 w-4" />
      case "Video Game":
        return <Music className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sync Licensing</h1>
        <p className="text-muted-foreground">Discover music licensing opportunities for film, TV, and media</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sync opportunities..."
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
            <SelectItem value="Film">Film</SelectItem>
            <SelectItem value="TV Series">TV Series</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
            <SelectItem value="Documentary">Documentary</SelectItem>
            <SelectItem value="Video Game">Video Game</SelectItem>
          </SelectContent>
        </Select>
        <Select value={budgetFilter} onValueChange={(value) => setBudgetFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Budgets</SelectItem>
            <SelectItem value="low">$2K - $5K</SelectItem>
            <SelectItem value="medium">$5K - $10K</SelectItem>
            <SelectItem value="high">$10K+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="film">Film</TabsTrigger>
          <TabsTrigger value="tv">TV</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredOpportunities.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No sync opportunities found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((sync) => (
                <Card key={sync.id} className={sync.featured ? "border-[#8A3FFC]/30 shadow-md" : ""}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        className={
                          sync.type === "Film" || sync.type === "TV Series"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : sync.type === "Commercial"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                        }
                      >
                        {getSyncTypeIcon(sync.type)}
                        <span className="ml-1">{sync.type}</span>
                      </Badge>
                      {sync.featured && <Badge className="bg-[#8A3FFC] text-white hover:bg-[#7B2CF9]">Featured</Badge>}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{sync.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{sync.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Video className="h-4 w-4" />
                        <span>Client: {sync.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Budget: {sync.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {sync.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(sync.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sync.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="bg-muted/50">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Badge variant="secondary">{sync.mood}</Badge>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4">
                    <Button className="w-full bg-[#8A3FFC] hover:bg-[#7B2CF9]" asChild>
                      <Link href={`/opportunities/sync/${sync.id}`}>
                        Submit Music
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
