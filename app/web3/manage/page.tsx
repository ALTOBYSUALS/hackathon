"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Copy, Eye, Settings, Wallet, TrendingUp, Users, DollarSign, Music, Shield, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ManageNFTs() {
  const [walletConnected] = useState(true) // Assume connected from previous flow

  // Mock data for tokenized songs
  const tokenizedSongs = [
    {
      id: "1",
      songTitle: "Midnight Dreams",
      artist: "Your Artist Name",
      coverArt: "/electronic-album-cover.png",
      songNftAddress: "0x1a2b3c...d4e5f6",
      royaltyCoinAddress: "0x7g8h9i...j0k1l2",
      songVaultAddress: "0x3m4n5o...p6q7r8",
      royaltyPercentage: 25,
      totalSupply: 10000,
      currentPrice: "0.15",
      totalRaised: "1,250",
      holdersCount: 89,
      monthlyRevenue: "420",
      lastDistribution: "2024-01-15",
      status: "Active",
      blockchainHash: "0xabc123...def456",
    },
    {
      id: "2", 
      songTitle: "Urban Vibes",
      artist: "Your Artist Name ft. MC Flow",
      coverArt: "/hip-hop-album-cover.png",
      songNftAddress: "0x2b3c4d...e5f6g7",
      royaltyCoinAddress: "0x8h9i0j...k1l2m3",
      songVaultAddress: "0x4n5o6p...q7r8s9",
      royaltyPercentage: 30,
      totalSupply: 15000,
      currentPrice: "0.12",
      totalRaised: "1,800",
      holdersCount: 156,
      monthlyRevenue: "680",
      lastDistribution: "2024-01-10",
      status: "Active",
      blockchainHash: "0xdef456...ghi789",
    }
  ]

  const walletBalances = [
    { symbol: "DOT", balance: "125.45", value: "$842.15" },
    { symbol: "USDC", balance: "2,340.00", value: "$2,340.00" },
    { symbol: "ROYAL-MD", balance: "500", value: "$75.00", songTitle: "Midnight Dreams" },
    { symbol: "ROYAL-UV", balance: "750", value: "$90.00", songTitle: "Urban Vibes" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/web3">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Manage Web3 Assets</h1>
          <p className="text-muted-foreground">Your tokenized music portfolio on Polkadot</p>
        </div>
      </div>

      <Tabs defaultValue="nfts" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="nfts">My SongNFTs</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="nfts" className="space-y-6">
          <div className="grid gap-6">
            {tokenizedSongs.map((song) => (
              <Card key={song.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={song.coverArt}
                        alt={song.songTitle}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <CardTitle className="text-xl">{song.songTitle}</CardTitle>
                        <CardDescription>{song.artist}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {song.status}
                          </Badge>
                          <Badge variant="outline">
                            {song.royaltyPercentage}% Tokenized
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${song.totalRaised}</div>
                      <div className="text-sm text-muted-foreground">Total Raised</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Contract Addresses */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">SongNFT Contract</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {song.songNftAddress}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(song.songNftAddress)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                          <a href={`https://moonbeam.moonscan.io/address/${song.songNftAddress}`} target="_blank">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">RoyaltyCoin</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {song.royaltyCoinAddress}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(song.royaltyCoinAddress)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                          <a href={`https://moonbeam.moonscan.io/address/${song.royaltyCoinAddress}`} target="_blank">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">SongVault</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {song.songVaultAddress}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(song.songVaultAddress)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                          <a href={`https://moonbeam.moonscan.io/address/${song.songVaultAddress}`} target="_blank">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{song.totalSupply.toLocaleString()}</div>
                      <div className="text-sm text-blue-700">Total Supply</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{song.currentPrice} USDC</div>
                      <div className="text-sm text-green-700">Current Price</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{song.holdersCount}</div>
                      <div className="text-sm text-purple-700">Holders</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">${song.monthlyRevenue}</div>
                      <div className="text-sm text-yellow-700">Monthly Revenue</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View on Explorer
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {tokenizedSongs.length === 0 && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>No Tokenized Music Yet</AlertTitle>
              <AlertDescription>
                Start by tokenizing your first song in the Mint NFT section to see your Web3 assets here.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Balances
              </CardTitle>
              <CardDescription>Your cryptocurrency and RoyaltyCoin holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletBalances.map((balance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {balance.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{balance.symbol}</div>
                        {balance.songTitle && (
                          <div className="text-sm text-muted-foreground">{balance.songTitle}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{balance.balance}</div>
                      <div className="text-sm text-muted-foreground">{balance.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Your Web3 music portfolio overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Value Locked</span>
                    <span className="font-medium">$3,050</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Monthly Revenue</span>
                    <span className="font-medium text-green-600">$1,100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Holders</span>
                    <span className="font-medium">245</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Royalty %</span>
                    <span className="font-medium">27.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transactions and distributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Royalty Distribution</div>
                      <div className="text-xs text-muted-foreground">Midnight Dreams - $420</div>
                    </div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Token Purchase</div>
                      <div className="text-xs text-muted-foreground">Urban Vibes - 100 ROYAL-UV</div>
                    </div>
                    <div className="text-xs text-muted-foreground">1 week ago</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Song Tokenized</div>
                      <div className="text-xs text-muted-foreground">Urban Vibes NFT Created</div>
                    </div>
                    <div className="text-xs text-muted-foreground">2 weeks ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
