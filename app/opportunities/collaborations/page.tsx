"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ExternalLink, Filter, Search, Users, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for collaborations
const collaborations = [
  {
    id: 1,
    title: "Electronic Producer Seeking Vocalist",
    artist: "DJ Sparkwave",
    location: "Los Angeles, CA",
    type: "Remote",
    description:
      "Looking for a talented vocalist to collaborate on my upcoming electronic album. Must be able to write lyrics and have professional recording setup.",
    deadline: "2024-06-20",
    genres: ["Electronic", "Pop", "Dance"],
    experience: "Intermediate",
    compensation: "Revenue Split",
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    title: "Hip-Hop Artist Looking for Producer",
    artist: "MC Flow",
    location: "Atlanta, GA",
    type: "In-Person",
    description:
      "Established hip-hop artist seeking producer for next mixtape. Looking for someone with trap and boom-bap experience.",
    deadline: "2024-07-01",
    genres: ["Hip-Hop", "Trap", "Rap"],
    experience: "Professional",
    compensation: "Paid",
    rating: 4.9,
    featured: false,
  },
  {
    id: 3,
    title: "Indie Band Needs Drummer",
    artist: "The Midnight Echoes",
    location: "Nashville, TN",
    type: "In-Person",
    description: "Indie rock band looking for a permanent drummer for upcoming tour and album recording.",
    deadline: "2024-06-25",
    genres: ["Indie", "Rock", "Alternative"],
    experience: "Intermediate",
    compensation: "Revenue Split",
    rating: 4.6,
    featured: true,
  },
  {
    id: 4,
    title: "Jazz Pianist Available for Sessions",
    artist: "Sarah Keys",
    location: "New York, NY",
    type: "Both",
    description:
      "Professional jazz pianist available for recording sessions and live performances. 15+ years experience.",
    deadline: "2024-08-15",
    genres: ["Jazz", "Blues", "Soul"],
    experience: "Professional",
    compensation: "Paid",
    rating: 5.0,
    featured: false,
  },
]

export default function Collaborations() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter collaborations based on search query and filters
  const filteredCollaborations = collaborations.filter((collab) => {
    const matchesSearch =
      collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || collab.type === typeFilter
    const matchesExperience = experienceFilter === "all" || collab.experience === experienceFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && collab.featured) ||
      (activeTab === "remote" && collab.type === "Remote") ||
      (activeTab === "local" && collab.type === "In-Person")

    return matchesSearch && matchesType && matchesExperience && matchesTab
  })

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Collaborations</h1>
        <p className="text-muted-foreground">Find artists and musicians to collaborate with</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collaborations..."
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
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="In-Person">In-Person</SelectItem>
            <SelectItem value="Both">Both</SelectItem>
          </SelectContent>
        </Select>
        <Select value={experienceFilter} onValueChange={(value) => setExperienceFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="remote">Remote</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredCollaborations.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No collaborations found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCollaborations.map((collab) => (
                <Card key={collab.id} className={collab.featured ? "border-[#8A3FFC]/30 shadow-md" : ""}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        className={
                          collab.type === "Remote"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : collab.type === "In-Person"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                        }
                      >
                        <Users className="mr-1 h-3 w-3" />
                        {collab.type}
                      </Badge>
                      {collab.featured && (
                        <Badge className="bg-[#8A3FFC] text-white hover:bg-[#7B2CF9]">Featured</Badge>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{collab.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{collab.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>By: {collab.artist}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{collab.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(collab.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{collab.rating}/5.0</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {collab.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="bg-muted/50">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="secondary">{collab.experience}</Badge>
                      <Badge variant="outline">{collab.compensation}</Badge>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4">
                    <Button className="w-full bg-[#8A3FFC] hover:bg-[#7B2CF9]" asChild>
                      <Link href={`/opportunities/collaborations/${collab.id}`}>
                        Connect
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
