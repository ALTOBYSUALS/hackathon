"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Download, Music, PlusCircle, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "@/components/ui/chart"

import { PageContainer, PageHeader, PageContent } from "@/components/page-container"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Here's what's happening with your music today" />

      <PageContent>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Reports
                </Button>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Upload New Music
                </Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$4,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.2M</div>
                      <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Releases</CardTitle>
                      <Music className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+2 new this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Platforms</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">Spotify, Apple Music, etc.</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Stream Trends</CardTitle>
                      <CardDescription>Daily streams for the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <StreamChart />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Releases</CardTitle>
                      <CardDescription>Your 3 most recent releases</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src="/abstract-soundscape.png"
                            width={60}
                            height={60}
                            alt="Album cover"
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Summer Nights</p>
                            <p className="text-sm text-muted-foreground">Single • Released 2 days ago</p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
                            Live
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Image
                            src="/electronic-album-cover.png"
                            width={60}
                            height={60}
                            alt="Album cover"
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Midnight Dreams</p>
                            <p className="text-sm text-muted-foreground">EP • Released 1 week ago</p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
                            Live
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Image
                            src="/hip-hop-album-cover.png"
                            width={60}
                            height={60}
                            alt="Album cover"
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Urban Echoes</p>
                            <p className="text-sm text-muted-foreground">Album • Released 2 weeks ago</p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
                            In Review
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Link href="/releases" className="flex items-center justify-center w-full">
                          View All Releases
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks you might want to perform</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <Button className="justify-start">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload New Music
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        View Full Reports
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Manage Collaborators
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Performance</CardTitle>
                      <CardDescription>Streams by platform this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-green-500" />
                            <span className="text-sm font-medium">Spotify</span>
                          </div>
                          <span className="text-sm font-medium">450K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-red-500" />
                            <span className="text-sm font-medium">Apple Music</span>
                          </div>
                          <span className="text-sm font-medium">320K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-blue-500" />
                            <span className="text-sm font-medium">Amazon Music</span>
                          </div>
                          <span className="text-sm font-medium">180K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-yellow-500" />
                            <span className="text-sm font-medium">YouTube Music</span>
                          </div>
                          <span className="text-sm font-medium">150K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-purple-500" />
                            <span className="text-sm font-medium">Others</span>
                          </div>
                          <span className="text-sm font-medium">100K</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </PageContent>
    </PageContainer>
  )
}

function StreamChart() {
  const data = [
    { date: "May 1", streams: 2400 },
    { date: "May 2", streams: 1398 },
    { date: "May 3", streams: 9800 },
    { date: "May 4", streams: 3908 },
    { date: "May 5", streams: 4800 },
    { date: "May 6", streams: 3800 },
    { date: "May 7", streams: 4300 },
    { date: "May 8", streams: 5300 },
    { date: "May 9", streams: 4300 },
    { date: "May 10", streams: 5800 },
    { date: "May 11", streams: 6000 },
    { date: "May 12", streams: 6700 },
    { date: "May 13", streams: 6300 },
    { date: "May 14", streams: 6500 },
    { date: "May 15", streams: 7000 },
    { date: "May 16", streams: 7300 },
    { date: "May 17", streams: 7800 },
    { date: "May 18", streams: 8000 },
    { date: "May 19", streams: 8300 },
    { date: "May 20", streams: 8700 },
    { date: "May 21", streams: 9000 },
    { date: "May 22", streams: 9500 },
    { date: "May 23", streams: 9800 },
    { date: "May 24", streams: 10000 },
    { date: "May 25", streams: 10500 },
    { date: "May 26", streams: 11000 },
    { date: "May 27", streams: 11500 },
    { date: "May 28", streams: 12000 },
    { date: "May 29", streams: 12500 },
    { date: "May 30", streams: 13000 },
  ]

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
              <span className="font-bold text-muted-foreground">{label}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Streams</span>
              <span className="font-bold">{payload[0].value?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[1]}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="streams" stroke="#8884d8" fill="url(#colorStreams)" strokeWidth={2} />
        <defs>
          <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}
