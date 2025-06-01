"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Boxes,
  CircleDollarSign,
  Wallet,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Shield,
  Sparkles,
  Music,
  BarChart3,
  Users,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Web3Hub() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [copiedAddress, setCopiedAddress] = useState(false)

  const walletAddress = "0x7a5d...b0b0b"

  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

  const copyAddress = () => {
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Web3 Hub</h1>
            <Badge className="bg-brand-primary text-white">Beta</Badge>
          </div>
          <div className="flex items-center gap-4">
            {walletConnected ? (
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={copyAddress}>
                <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                {walletAddress}
                {copiedAddress ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            ) : (
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity" size="sm">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8 space-y-8 animate-fade-in">
        {!walletConnected ? (
          <motion.div
            className="max-w-3xl mx-auto space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.3 }}
          >
            {/* Welcome Card */}
            <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Boxes className="h-6 w-6 text-brand-primary" />
                  Welcome to Web3 Hub
                </CardTitle>
                <CardDescription className="text-base">
                  Explore the new frontier of music distribution with blockchain technology on the SUI network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                      <Music className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Music NFTs</h3>
                    <p className="text-sm text-muted-foreground">
                      Create unique digital collectibles from your music and build direct relationships with fans.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                      <CircleDollarSign className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="text-lg font-medium">On-Chain Royalties</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up transparent royalty splits with collaborators using smart contracts on SUI.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Ownership & Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Maintain ownership of your music while creating new revenue streams through Web3 technology.
                    </p>
                  </div>
                </div>

                <Alert className="bg-muted border-muted-foreground/20">
                  <Sparkles className="h-4 w-4 text-brand-primary" />
                  <AlertTitle>Get Started with Web3</AlertTitle>
                  <AlertDescription>
                    Connect your SUI wallet to start minting NFTs, setting up royalty splits, and exploring the Web3
                    music ecosystem.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                  size="lg"
                  onClick={handleConnectWallet}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect SUI Wallet
                </Button>
              </CardFooter>
            </Card>

            {/* Compatible Wallets */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Compatible SUI Wallets</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    name: "Suiet Wallet",
                    logo: "/wallet-logo-1.png",
                    description: "User-friendly SUI wallet with a simple interface",
                  },
                  { name: '  description: "User-friendly SUI wallet with a simple interface' },
                  {
                    name: "Sui Wallet",
                    logo: "/placeholder.svg?key=i1q2g",
                    description: "Official wallet from the Sui Foundation",
                  },
                  {
                    name: "Martian Wallet",
                    logo: "/placeholder.svg?key=7tvhs",
                    description: "Multi-chain wallet with SUI support",
                  },
                ].map((wallet, i) => (
                  <Card key={i} className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <Image
                          src={wallet.logo || "/placeholder.svg"}
                          alt={wallet.name}
                          width={48}
                          height={48}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{wallet.name}</h3>
                        <p className="text-sm text-muted-foreground">{wallet.description}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Install
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Learn More */}
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Learn More About Web3 Music</CardTitle>
                <CardDescription>Resources to help you understand the Web3 music ecosystem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                    <h3 className="text-sm font-medium mb-2">What are Music NFTs?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how NFTs are revolutionizing music ownership and distribution.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10 -ml-2"
                    >
                      Read Guide
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                    <h3 className="text-sm font-medium mb-2">Smart Contracts for Musicians</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Understand how smart contracts can automate royalty payments.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10 -ml-2"
                    >
                      Read Guide
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.3 }}
          >
            {/* Web3 Dashboard */}
            <Tabs defaultValue="dashboard" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="nfts"
                  className="data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                >
                  My NFTs
                </TabsTrigger>
                <TabsTrigger
                  value="royalties"
                  className="data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                >
                  Royalty Contracts
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Wallet className="mr-2 h-4 w-4 text-brand-primary" />
                        SUI Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-2xl font-bold">45.32 SUI</div>
                        <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
                          ≈ $56.65 USD
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Balance
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Music className="mr-2 h-4 w-4 text-brand-primary" />
                        Music NFTs Owned
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-sm text-muted-foreground">2 minted, 1 purchased</p>
                      <Button className="mt-4 w-full bg-brand-primary hover:bg-brand-primary/90 text-white" asChild>
                        <Link href="/web3/mint">Mint New NFT</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <CircleDollarSign className="mr-2 h-4 w-4 text-brand-primary" />
                        Royalty Contracts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-sm text-muted-foreground">Active smart contract</p>
                      <Button variant="outline" className="mt-4 w-full" asChild>
                        <Link href="/web3/royalties">Manage Contracts</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-brand-primary" />
                        NFT Performance
                      </CardTitle>
                      <CardDescription>Track your NFT sales and secondary market activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Primary Sales</span>
                          <span className="text-sm font-medium">35.5 SUI</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Secondary Sales</span>
                          <span className="text-sm font-medium">12.8 SUI</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Royalties Earned</span>
                          <span className="text-sm font-medium">2.4 SUI</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Earnings</span>
                        <span className="text-sm font-medium">50.7 SUI</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-brand-primary" />
                        NFT Collectors
                      </CardTitle>
                      <CardDescription>People who own your music NFTs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <Avatar key={i} className="h-10 w-10 border-2 border-background">
                            <AvatarImage
                              src={`/diverse-group.png?key=bnp9h&height=40&width=40&query=person${i}`}
                            />
                            <AvatarFallback className="bg-muted text-xs">U{i}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-xs font-medium">
                          +12
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Top Collectors</h3>
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={`/diverse-group.png?key=q91vi&height=32&width=32&query=person${i}`}
                                  />
                                  <AvatarFallback className="bg-muted text-xs">U{i}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">Collector #{i}</p>
                                  <p className="text-xs text-muted-foreground">Owns {4 - i} NFTs</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks for managing your Web3 presence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Button
                        className="bg-brand-primary hover:bg-brand-primary/90 text-white h-auto py-4 flex flex-col items-center justify-center"
                        asChild
                      >
                        <Link href="/web3/mint">
                          <Music className="h-5 w-5 mb-2" />
                          <span>Mint New Music NFT</span>
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center"
                        asChild
                      >
                        <Link href="/web3/manage">
                          <Boxes className="h-5 w-5 mb-2" />
                          <span>Manage My NFTs</span>
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center"
                        asChild
                      >
                        <Link href="/web3/royalties">
                          <CircleDollarSign className="h-5 w-5 mb-2" />
                          <span>Set Up On-Chain Royalties</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nfts">
                <Card>
                  <CardHeader>
                    <CardTitle>My NFTs</CardTitle>
                    <CardDescription>NFTs you've minted or purchased</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      {[
                        { title: "Midnight Dreams", type: "Audio NFT", minted: "May 15, 2023", owned: "You (Creator)" },
                        { title: "Urban Vibes", type: "Audio NFT", minted: "Jun 22, 2023", owned: "You (Creator)" },
                        {
                          title: "Synthwave Collection",
                          type: "Audio NFT",
                          minted: "Apr 10, 2023",
                          owned: "You (Collector)",
                        },
                      ].map((nft, i) => (
                        <Card
                          key={i}
                          className="card-hover border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden"
                        >
                          <div className="aspect-square relative bg-muted">
                            <Image
                              src={`/abstract-nft-concept.png?key=0abfv&height=300&width=300&query=nft%20${i + 1}`}
                              alt={nft.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="font-semibold text-white drop-shadow-md">{nft.title}</h3>
                              <Badge className="mt-1 bg-brand-primary/20 text-brand-primary border-brand-primary/30">
                                {nft.type}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Minted: {nft.minted}</span>
                              <span>{nft.owned}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              Transfer
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="royalties">
                <Card>
                  <CardHeader>
                    <CardTitle>Royalty Contracts</CardTitle>
                    <CardDescription>Smart contracts for royalty splits on the SUI network</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border border-border p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">Midnight Dreams EP</h3>
                          <p className="text-sm text-muted-foreground">Contract deployed on May 20, 2023</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Contract Address</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-mono">0x8a7d...f92e</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Royalty Splits</h4>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-brand-primary"></div>
                                  <span className="text-sm">You (Primary Artist)</span>
                                </div>
                                <span className="text-sm font-medium">70%</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-brand-secondary"></div>
                                  <span className="text-sm">Collaborator 1 (Producer)</span>
                                </div>
                                <span className="text-sm font-medium">20%</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-brand-tertiary"></div>
                                  <span className="text-sm">Collaborator 2 (Mixer)</span>
                                </div>
                                <span className="text-sm font-medium">10%</span>
                              </div>
                            </div>

                            <div className="h-4 w-full rounded-full overflow-hidden bg-muted flex">
                              <div className="h-full bg-brand-primary" style={{ width: "70%" }}></div>
                              <div className="h-full bg-brand-secondary" style={{ width: "20%" }}></div>
                              <div className="h-full bg-brand-tertiary" style={{ width: "10%" }}></div>
                            </div>
                          </div>

                          <Separator />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Total Distributed</span>
                            <span className="text-sm font-medium">12.5 SUI</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Last Distribution</span>
                            <span className="text-sm">May 30, 2023</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button variant="outline" className="flex-1">
                          View on Explorer
                        </Button>
                        <Button className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white">
                          Manage Contract
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href="/web3/royalties">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Royalty Contract
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Recent transactions on the SUI network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                        <div>Date</div>
                        <div>Type</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div className="text-right">Transaction ID</div>
                      </div>

                      {[
                        { date: "Jun 15, 2023", type: "NFT Mint", amount: "2.5 SUI", status: "Completed" },
                        { date: "Jun 10, 2023", type: "Royalty Payment", amount: "1.2 SUI", status: "Completed" },
                        { date: "May 28, 2023", type: "NFT Sale", amount: "15.0 SUI", status: "Completed" },
                        { date: "May 20, 2023", type: "Contract Deploy", amount: "0.5 SUI", status: "Completed" },
                        { date: "May 15, 2023", type: "NFT Mint", amount: "2.5 SUI", status: "Completed" },
                      ].map((tx, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 p-4 text-sm border-b last:border-0">
                          <div>{tx.date}</div>
                          <div>{tx.type}</div>
                          <div>{tx.amount}</div>
                          <div>
                            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">{tx.status}</Badge>
                          </div>
                          <div className="text-right">
                            <Button variant="link" size="sm" className="h-auto p-0 text-brand-primary">
                              0x{Math.random().toString(16).substring(2, 10)}...
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </main>
    </div>
  )
}
