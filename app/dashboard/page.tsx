"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Music,
  BarChart3,
  CircleDollarSign,
  Boxes,
  Play,
  Headphones,
  TrendingUp,
  Users,
  Globe,
  Clock,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"

// Sample data for charts
const streamData = [
  { name: "Apr 1", value: 400 },
  { name: "Apr 8", value: 600 },
  { name: "Apr 15", value: 500 },
  { name: "Apr 22", value: 700 },
  { name: "Apr 29", value: 800 },
  { name: "May 6", value: 1000 },
  { name: "May 13", value: 950 },
  { name: "May 20", value: 1200 },
  { name: "May 27", value: 1100 },
]

const recentReleases = [
  {
    id: 1,
    title: "Midnight Dreams",
    coverArt: "/electronic-album-cover.png",
    status: "Live In Stores",
    streams: 12500,
  },
  {
    id: 2,
    title: "Urban Vibes",
    coverArt: "/hip-hop-album-cover.png",
    status: "Live In Stores",
    streams: 8700,
  },
  {
    id: 3,
    title: "Acoustic Sessions",
    coverArt: "/indie-album-cover.png",
    status: "In Review",
    streams: 0,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const isMobile = useMobile()
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral-500 border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // Get current time to display appropriate greeting
  const currentHour = new Date().getHours()
  let greeting = "Good evening"
  if (currentHour < 12) greeting = "Good morning"
  else if (currentHour < 18) greeting = "Good afternoon"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="py-4 px-4 md:py-6 md:px-6 lg:px-8 space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <motion.section
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{greeting}, {user?.artistName || 'Artist'}</h2>
          <p className="text-muted-foreground">Here's what's happening with your music today</p>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <CircleDollarSign className="mr-2 h-4 w-4 text-brand-primary" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex items-baseline justify-between">
                  <div className="text-xl md:text-2xl font-bold">$1,284</div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-success">
                    <TrendingUp className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    12.5%
                  </div>
                </div>
                <Progress value={65} className="h-1 mt-3" />
              </CardContent>
            </Card>

            <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Headphones className="mr-2 h-4 w-4 text-brand-primary" />
                  Streams
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-col gap-2">
                  <div className="text-xl md:text-2xl font-bold">42.5K</div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-success">
                    <TrendingUp className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    8.3%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="mr-2 h-4 w-4 text-brand-primary" />
                  Listeners
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-col gap-2">
                  <div className="text-xl md:text-2xl font-bold">8.9K</div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-success">
                    <TrendingUp className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                    15.2%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Boxes className="mr-2 h-4 w-4 text-brand-primary" />
                  Tokenized Value
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-col gap-2">
                  <div className="text-xl md:text-2xl font-bold">$3,050</div>
                  <Badge className="w-fit bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 border-blue-200 text-xs">
                    2 Songs Tokenized
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Tabs Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4"
        >
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <TabsList className="bg-muted/50 p-1 w-full md:w-auto inline-flex">
                <TabsTrigger value="overview" className="min-w-[100px]">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="releases" className="min-w-[100px]">
                  Releases
                </TabsTrigger>
                <TabsTrigger value="analytics" className="min-w-[100px]">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="web3" className="min-w-[100px]">
                  Web3
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-brand-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Get started with these common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center mb-2">
                          <Music className="mr-2 h-4 w-4" />
                          Upload Music
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Add new tracks to your catalog
                        </span>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center mb-2">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Check your performance metrics
                        </span>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center mb-2">
                          <Boxes className="mr-2 h-4 w-4" />
                          Tokenize Track
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Create NFTs from your music
                        </span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Releases */}
              <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Releases</CardTitle>
                  <CardDescription>
                    Your latest music uploads and their performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReleases.map((release) => (
                      <div key={release.id} className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={release.coverArt}
                            alt={release.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{release.title}</p>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={release.status === "Live In Stores" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {release.status}
                            </Badge>
                            {release.streams > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {release.streams.toLocaleString()} streams
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Releases
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Additional tab content would go here */}
            <TabsContent value="releases">
              <Card>
                <CardHeader>
                  <CardTitle>Your Releases</CardTitle>
                  <CardDescription>Manage your music catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Releases management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>Detailed performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="web3">
              <Card>
                <CardHeader>
                  <CardTitle>Web3 Features</CardTitle>
                  <CardDescription>Tokenization and blockchain features</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Web3 features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>
      </div>
    </div>
  )
}
