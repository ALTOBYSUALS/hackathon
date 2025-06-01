"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, MoreHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ManageNFTs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample data for NFTs
  const nfts = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Your Artist Name",
      image: "/electronic-album-cover.png",
      type: "Limited Edition",
      supply: "10/50",
      mintPrice: "5 SUI",
      status: "Minted",
      mintDate: "2023-05-15",
      objectId: "0x1234567890abcdef1234567890abcdef12345678",
      marketplace: "SuiSwap",
      listingPrice: "8 SUI",
    },
    {
      id: 2,
      title: "Urban Vibes",
      artist: "Your Artist Name ft. MC Flow",
      image: "/hip-hop-album-cover.png",
      type: "Unique 1/1",
      supply: "1/1",
      mintPrice: "20 SUI",
      status: "Listed",
      mintDate: "2023-08-22",
      objectId: "0xabcdef1234567890abcdef1234567890abcdef12",
      marketplace: "SuiSwap",
      listingPrice: "25 SUI",
    },
    {
      id: 3,
      title: "Acoustic Sessions",
      artist: "Your Artist Name",
      image: "/indie-album-cover.png",
      type: "Open Edition",
      supply: "125/∞",
      mintPrice: "2 SUI",
      status: "Minted",
      mintDate: "2023-11-10",
      objectId: "0x7890abcdef1234567890abcdef1234567890abcd",
    },
    {
      id: 4,
      title: "Summer Nights",
      artist: "Your Artist Name",
      image: "/pop-album-cover.png",
      type: "Limited Edition",
      supply: "5/10",
      mintPrice: "10 SUI",
      status: "Sold",
      mintDate: "2024-01-05",
      objectId: "0xdef1234567890abcdef1234567890abcdef123456",
      salePrice: "12 SUI",
      saleDate: "2024-02-10",
    },
  ]

  // Filter NFTs based on search query and status filter
  const filteredNFTs = nfts.filter((nft) => {
    const matchesSearch =
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.artist.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || nft.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "minted":
        return "bg-green-100 text-green-700"
      case "listed":
        return "bg-blue-100 text-blue-700"
      case "sold":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/web3">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Manage My NFTs</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or artist..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="minted">Minted</SelectItem>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <Link href="/web3/mint">Mint New NFT</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <span className="text-sm text-muted-foreground">{filteredNFTs.length} NFTs</span>
        </div>

        <TabsContent value="grid">
          {filteredNFTs.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No NFTs found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNFTs.map((nft) => (
                <Card key={nft.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
                    <Badge className={`absolute top-2 right-2 ${getStatusBadgeClass(nft.status)}`}>{nft.status}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{nft.title}</h3>
                    <p className="text-sm text-muted-foreground">{nft.artist}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline">{nft.type}</Badge>
                      <span className="text-xs text-muted-foreground">{nft.supply}</span>
                    </div>
                    <div className="mt-2 text-sm">
                      {nft.status === "Listed" ? (
                        <span>Listed for: {nft.listingPrice}</span>
                      ) : nft.status === "Sold" ? (
                        <span>Sold for: {nft.salePrice}</span>
                      ) : (
                        <span>Mint Price: {nft.mintPrice}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/20 p-2 flex justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`https://explorer.sui.io/object/${nft.objectId}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Explorer
                      </Link>
                    </Button>
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
                        {nft.status === "Minted" && <DropdownMenuItem>List on Marketplace</DropdownMenuItem>}
                        {nft.status === "Listed" && <DropdownMenuItem>Update Listing</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Transfer NFT</DropdownMenuItem>
                        {nft.status === "Listed" && (
                          <DropdownMenuItem className="text-red-600">Cancel Listing</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          {filteredNFTs.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No NFTs found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left text-sm font-medium">NFT</th>
                    <th className="p-2 text-left text-sm font-medium">Type</th>
                    <th className="p-2 text-left text-sm font-medium">Supply</th>
                    <th className="p-2 text-left text-sm font-medium">Mint Date</th>
                    <th className="p-2 text-left text-sm font-medium">Status</th>
                    <th className="p-2 text-right text-sm font-medium">Price</th>
                    <th className="p-2 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNFTs.map((nft) => (
                    <tr key={nft.id} className="border-b">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.title}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium">{nft.title}</p>
                            <p className="text-xs text-muted-foreground">{nft.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-sm">{nft.type}</td>
                      <td className="p-2 text-sm">{nft.supply}</td>
                      <td className="p-2 text-sm">{new Date(nft.mintDate).toLocaleDateString()}</td>
                      <td className="p-2">
                        <Badge className={getStatusBadgeClass(nft.status)}>{nft.status}</Badge>
                      </td>
                      <td className="p-2 text-sm text-right">
                        {nft.status === "Listed"
                          ? nft.listingPrice
                          : nft.status === "Sold"
                            ? nft.salePrice
                            : nft.mintPrice}
                      </td>
                      <td className="p-2 text-right">
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
                            <DropdownMenuItem asChild>
                              <Link href={`https://explorer.sui.io/object/${nft.objectId}`} target="_blank">
                                View on Explorer
                              </Link>
                            </DropdownMenuItem>
                            {nft.status === "Minted" && <DropdownMenuItem>List on Marketplace</DropdownMenuItem>}
                            {nft.status === "Listed" && <DropdownMenuItem>Update Listing</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Transfer NFT</DropdownMenuItem>
                            {nft.status === "Listed" && (
                              <DropdownMenuItem className="text-red-600">Cancel Listing</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
