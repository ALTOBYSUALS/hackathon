"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ExternalLink, Filter, Search, DollarSign, Building, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for grants
const grants = [
  {
    id: 1,
    title: "Emerging Artist Development Grant",
    organization: "Music Foundation",
    type: "Development",
    description: "Supporting emerging artists with funding for recording, marketing, and professional development.",
    deadline: "2024-08-31",
    amount: "$5,000 - $15,000",
    eligibility: "Independent artists under 25",
    location: "United States",
    applicationFee: "Free",
    featured: true,
  },
  {
    id: 2,
    title: "Diversity in Music Initiative",
    organization: "Cultural Arts Council",
    type: "Diversity",
    description: "Grant program focused on supporting underrepresented artists in the music industry.",
    deadline: "2024-07-15",
    amount: "$3,000 - $10,000",
    eligibility: "BIPOC artists",
    location: "Canada",
    applicationFee: "Free",
    featured: true,
  },
  {
    id: 3,
    title: "Rural Music Development Fund",
    organization: "Country Music Association",
    type: "Regional",
    description: "Supporting country and folk artists from rural communities with recording and touring funds.",
    deadline: "2024-09-30",
    amount: "$2,000 - $8,000",
    eligibility: "Rural community artists",
    location: "Rural Areas",
    applicationFee: "Free",
    featured: false,
  },
  {
    id: 4,
    title: "Women in Music Grant",
    organization: "Female Musicians Alliance",
    type: "Gender",
    description: "Empowering female musicians with funding for equipment, recording, and career development.",
    deadline: "2024-06-30",
    amount: "$1,000 - $5,000",
    eligibility: "Female identifying artists",
    location: "International",
    applicationFee: "Free",
    featured: false,
  },
  {
    id: 5,
    title: "Innovation in Music Technology",
    organization: "Tech Music Fund",
    type: "Technology",
    description: "Supporting artists who integrate technology and innovation into their music creation process.",
    deadline: "2024-10-15",
    amount: "$10,000 - $25,000",
    eligibility: "Tech-focused artists",
    location: "Global",
    applicationFee: "$50",
    featured: false,
  },
]

export default function Grants() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter grants based on search query and filters
  const filteredGrants = grants.filter((grant) => {
    const matchesSearch =
      grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || grant.type === typeFilter

    const matchesLocation =
      locationFilter === "all" || grant.location.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && grant.featured) ||
      (activeTab === "free" && grant.applicationFee === "Free") ||
      (activeTab === "diversity" && grant.type === "Diversity") ||
      (activeTab === "development" && grant.type === "Development")

    return matchesSearch && matchesType && matchesLocation && matchesTab
  })

  // Get grant type icon
  const getGrantTypeIcon = (type: string) => {
    switch (type) {
      case "Development":
        return <Building className="h-4 w-4" />
      case "Diversity":
      case "Gender":
        return <DollarSign className="h-4 w-4" />
      case "Regional":
        return <MapPin className="h-4 w-4" />
      case "Technology":
        return <Building className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Grants</h1>
        <p className="text-muted-foreground">Find funding opportunities and grants for your music career</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search grants..."
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
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Diversity">Diversity</SelectItem>
            <SelectItem value="Regional">Regional</SelectItem>
            <SelectItem value="Gender">Gender</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={(value) => setLocationFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="united states">United States</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="international">International</SelectItem>
            <SelectItem value="global">Global</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="free">Free Application</TabsTrigger>
          <TabsTrigger value="diversity">Diversity</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredGrants.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No grants found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGrants.map((grant) => (
                <Card key={grant.id} className={grant.featured ? "border-[#8A3FFC]/30 shadow-md" : ""}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        className={
                          grant.type === "Development"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : grant.type === "Diversity" || grant.type === "Gender"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : grant.type === "Regional"
                                ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                        }
                      >
                        {getGrantTypeIcon(grant.type)}
                        <span className="ml-1">{grant.type}</span>
                      </Badge>
                      {grant.featured && <Badge className="bg-[#8A3FFC] text-white hover:bg-[#7B2CF9]">Featured</Badge>}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{grant.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{grant.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>By: {grant.organization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Amount: {grant.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Location: {grant.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-muted-foreground">Eligibility:</p>
                      <p className="text-sm">{grant.eligibility}</p>
                    </div>
                    <div className="mt-4">
                      <Badge variant={grant.applicationFee === "Free" ? "secondary" : "outline"}>
                        {grant.applicationFee === "Free" ? "Free Application" : grant.applicationFee}
                      </Badge>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4">
                    <Button className="w-full bg-[#8A3FFC] hover:bg-[#7B2CF9]" asChild>
                      <Link href={`/opportunities/grants/${grant.id}`}>
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
