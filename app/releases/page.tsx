"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpDown, Download, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
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

// Sample data for the releases
const releases = [
  {
    id: 1,
    coverArt: "/abstract-soundscape.png",
    title: "Summer Nights",
    artist: "John Doe",
    type: "Single",
    releaseDate: "2023-05-01",
    status: "Live",
  },
  {
    id: 2,
    coverArt: "/electronic-album-cover.png",
    title: "Midnight Dreams",
    artist: "John Doe",
    type: "EP",
    releaseDate: "2023-04-15",
    status: "Live",
  },
  {
    id: 3,
    coverArt: "/hip-hop-album-cover.png",
    title: "Urban Echoes",
    artist: "John Doe ft. Jane Smith",
    type: "Album",
    releaseDate: "2023-03-20",
    status: "In Review",
  },
  {
    id: 4,
    coverArt: "/rock-album-cover.png",
    title: "Electric Pulse",
    artist: "John Doe",
    type: "Single",
    releaseDate: "2023-02-10",
    status: "Live",
  },
  {
    id: 5,
    coverArt: "/pop-album-cover.png",
    title: "Neon Lights",
    artist: "John Doe ft. Alex Johnson",
    type: "Single",
    releaseDate: "2023-01-05",
    status: "Live",
  },
  {
    id: 6,
    coverArt: "/placeholder.svg?key=95ngo",
    title: "Smooth Serenade",
    artist: "John Doe Quartet",
    type: "Album",
    releaseDate: "2022-12-01",
    status: "Live",
  },
  {
    id: 7,
    coverArt: "/classical-album-cover.png",
    title: "Harmonic Symphony",
    artist: "John Doe Orchestra",
    type: "Album",
    releaseDate: "2022-11-15",
    status: "Error",
  },
  {
    id: 8,
    coverArt: "/placeholder.svg?height=40&width=40&query=album%20cover%20indie",
    title: "Acoustic Sessions",
    artist: "John Doe",
    type: "EP",
    releaseDate: "2022-10-20",
    status: "Live",
  },
]

export default function ReleasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter releases based on search query and status filter
  const filteredReleases = releases.filter((release) => {
    const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || release.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Releases</h1>
        <Button asChild>
          <Link href="/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload New Music
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Cover</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Release Title
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Release Date
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReleases.map((release) => (
              <TableRow key={release.id}>
                <TableCell>
                  <Image
                    src={release.coverArt || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={`${release.title} cover art`}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{release.title}</TableCell>
                <TableCell>{release.artist}</TableCell>
                <TableCell>{release.type}</TableCell>
                <TableCell>{new Date(release.releaseDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      release.status === "Live"
                        ? "bg-green-100 text-green-800"
                        : release.status === "In Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {release.status}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Release</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>Manage Distribution</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Request Takedown</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredReleases.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No releases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
