"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageContainer, PageHeader, PageContent } from "@/components/page-container"

// Sample data for releases
const releases = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Your Artist Name",
    coverArt: "/electronic-album-cover.png",
    type: "Single",
    releaseDate: "2023-05-15",
    status: "Live In Stores",
  },
  {
    id: 2,
    title: "Urban Vibes",
    artist: "Your Artist Name ft. MC Flow",
    coverArt: "/hip-hop-album-cover.png",
    type: "EP",
    releaseDate: "2023-08-22",
    status: "Live In Stores",
  },
  {
    id: 3,
    title: "Acoustic Sessions",
    artist: "Your Artist Name",
    coverArt: "/indie-album-cover.png",
    type: "Album",
    releaseDate: "2023-11-10",
    status: "In Review",
  },
  {
    id: 4,
    title: "Summer Nights",
    artist: "Your Artist Name",
    coverArt: "/pop-album-cover.png",
    type: "Single",
    releaseDate: "2024-01-05",
    status: "Approved",
  },
  {
    id: 5,
    title: "Rock Anthems",
    artist: "Your Artist Name & The Band",
    coverArt: "/rock-album-cover.png",
    type: "Album",
    releaseDate: "2024-03-20",
    status: "Draft",
  },
]

export default function MyMusic() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter releases based on search query and status filter
  const filteredReleases = releases.filter((release) => {
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.artist.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || release.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Live In Stores":
        return "bg-green-100 text-green-700"
      case "In Review":
        return "bg-yellow-100 text-yellow-700"
      case "Approved":
        return "bg-blue-100 text-blue-700"
      case "Draft":
        return "bg-gray-100 text-gray-700"
      case "Error":
        return "bg-red-100 text-red-700"
      case "Takedown":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <PageContainer>
      <PageHeader title="My Music" description="Manage your releases and tracks">
        <Button asChild className="bg-[#8A3FFC] hover:bg-[#7B2CF9]">
          <Link href="/music/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload New Music
          </Link>
        </Button>
      </PageHeader>

      <PageContent>
        <Card>
          <CardHeader>
            <CardTitle>Your Releases</CardTitle>
            <CardDescription>View and manage all your music releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search releases..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Live In Stores">Live In Stores</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Error">Error</SelectItem>
                    <SelectItem value="Takedown">Takedown</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Cover</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Release Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReleases.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        No releases found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReleases.map((release) => (
                      <TableRow key={release.id}>
                        <TableCell>
                          <img
                            src={release.coverArt || "/placeholder.svg"}
                            alt={release.title}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link href={`/music/${release.id}`} className="hover:text-[#8A3FFC] hover:underline">
                            {release.title}
                          </Link>
                        </TableCell>
                        <TableCell>{release.artist}</TableCell>
                        <TableCell>{release.type}</TableCell>
                        <TableCell>{new Date(release.releaseDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getStatusBadgeClass(
                              release.status,
                            )}`}
                          >
                            {release.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => (window.location.href = `/music/${release.id}`)}>
                                View/Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => (window.location.href = `/analytics?releaseId=${release.id}`)}
                              >
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => (window.location.href = `/marketing?releaseId=${release.id}`)}
                              >
                                Marketing
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  (window.location.href = `/earnings/royalty-splits?releaseId=${release.id}`)
                                }
                              >
                                Manage Splits
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  // Open a modal or navigate to collaboration management
                                  alert(`Managing collaboration for "${release.title}"`)
                                }}
                              >
                                Manage Collaboration
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to request takedown for "${release.title}"?`)) {
                                    alert(`Takedown request submitted for "${release.title}"`)
                                  }
                                }}
                              >
                                Request Takedown
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  )
}
