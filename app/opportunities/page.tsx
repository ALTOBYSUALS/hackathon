"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ExternalLink, Filter, Music, Search, Tag, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for opportunities
const opportunities = [
  {
    id: 1,
    title: "Collaboration with Top Producer",
    type: "Collaboration",
    category: "Production",
    description: "Work with a Grammy-nominated producer on your next track. Looking for electronic and pop artists.",
    deadline: "2024-06-15",
    postedBy: "MUSIC BASE",
    featured: true,
    genres: ["Electronic", "Pop"],
  },
  {
    id: 2,
    title: "Music for Indie Film",
    type: "Sync",
    category: "Film",
    description: "Independent film seeking original music for key scenes. Compensation and credit provided.",
    deadline: "2024-06-30",
    postedBy: "FilmWorks Studios",
    featured: false,
    genres: ["Ambient", "Instrumental"],
  },
  {
    id: 3,
    title: "Remix Contest - Major Label",
    type: "Contest",
    category: "Remix",
    description: "Remix a track from a major label artist. Winner receives official release and promotion.",
    deadline: "2024-07-10",
    postedBy: "Universal Music",
    featured: true,
    genres: ["Electronic", "Dance"],
  },
  {
    id: 4,
    title: "Vocalist Needed for EDM Track",
    type: "Collaboration",
    category: "Vocals",
    description: "Established producer seeking vocalist for upcoming EDM release. Must be able to write lyrics.",
    deadline: "2024-06-20",
    postedBy: "DJ Sparkwave",
    featured: false,
    genres: ["EDM", "Pop"],
  },
  {
    id: 5,
    title: "Commercial Background Music",
    type: "Sync",
    category: "Commercial",
    description: "Tech company looking for upbeat, modern tracks for new product campaign.",
    deadline: "2024-07-05",
    postedBy: "TechGiant Inc.",
    featured: false,
    genres: ["Corporate", "Upbeat"],
  },
  {
    id: 6,
    title: "Beat Battle - Hip Hop Producers",
    type: "Contest",
    category: "Production",
    description: "Show off your best beats in this online competition. Cash prizes for winners.",
    deadline: "2024-07-15",
    postedBy: "MUSIC BASE",
    featured: false,
    genres: ["Hip-Hop", "Trap"],
  },
]

export default function Opportunities() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter opportunities based on search query, type filter, and active tab
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || opportunity.type === typeFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && opportunity.featured) ||
      (activeTab === "collaboration" && opportunity.type === "Collaboration") ||
      (activeTab === "sync" && opportunity.type === "Sync") ||
      (activeTab === "contest" && opportunity.type === "Contest")

    return matchesSearch && matchesType && matchesTab
  })

  // Get opportunity type icon
  const getOpportunityTypeIcon = (type: string) => {
    switch (type) {
      case "Collaboration":
        return <Music className="h-4 w-4" />
      case "Sync":
        return <Video className="h-4 w-4" />
      case "Contest":
        return <Tag className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <p className="text-muted-foreground">Discover collaboration, sync, and contest opportunities</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
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
            <SelectItem value="Collaboration">Collaboration</SelectItem>
            <SelectItem value="Sync">Sync</SelectItem>
            <SelectItem value="Contest">Contest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="sync">Sync</TabsTrigger>
          <TabsTrigger value="contest">Contest</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredOpportunities.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No opportunities found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className={opportunity.featured ? "border-[#8A3FFC]/30 shadow-md" : ""}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        className={
                          opportunity.type === "Collaboration"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : opportunity.type === "Sync"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        }
                      >
                        {getOpportunityTypeIcon(opportunity.type)}
                        <span className="ml-1">{opportunity.type}</span>
                      </Badge>
                      {opportunity.featured && (
                        <Badge className="bg-[#8A3FFC] text-white hover:bg-[#7B2CF9]">Featured</Badge>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{opportunity.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{opportunity.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Posted by: {opportunity.postedBy}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {opportunity.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="bg-muted/50">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4">
                    <Button className="w-full bg-[#8A3FFC] hover:bg-[#7B2CF9]" asChild>
                      <Link href={`/opportunities/${opportunity.id}`}>
                        Apply Now
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
