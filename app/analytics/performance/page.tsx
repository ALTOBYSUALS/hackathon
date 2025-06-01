"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Play, Heart, Share2, SkipForward, Volume2 } from "lucide-react"

const performanceMetrics = [
  { name: "Jan", streams: 45000, skips: 5400, saves: 2250, shares: 890 },
  { name: "Feb", streams: 52000, skips: 5720, saves: 2600, shares: 1040 },
  { name: "Mar", streams: 48000, skips: 5280, saves: 2400, shares: 960 },
  { name: "Apr", streams: 61000, skips: 6100, saves: 3050, shares: 1220 },
  { name: "May", streams: 55000, skips: 5500, saves: 2750, shares: 1100 },
  { name: "Jun", streams: 67000, skips: 6030, saves: 3350, shares: 1340 },
]

const trackPerformance = [
  {
    title: "Midnight Dreams",
    streams: 125000,
    completionRate: 78,
    skipRate: 12,
    saveRate: 15,
    shareRate: 8,
    trend: "up",
  },
  {
    title: "Electric Nights",
    streams: 98000,
    completionRate: 72,
    skipRate: 18,
    saveRate: 12,
    shareRate: 6,
    trend: "down",
  },
  {
    title: "Summer Vibes",
    streams: 87000,
    completionRate: 85,
    skipRate: 8,
    saveRate: 18,
    shareRate: 10,
    trend: "up",
  },
  {
    title: "Bass Dimension",
    streams: 76000,
    completionRate: 68,
    skipRate: 22,
    saveRate: 9,
    shareRate: 4,
    trend: "down",
  },
  {
    title: "Acoustic Sessions",
    streams: 65000,
    completionRate: 82,
    skipRate: 10,
    saveRate: 16,
    shareRate: 9,
    trend: "up",
  },
]

const engagementData = [
  { time: "0-15s", listeners: 100, retention: 100 },
  { time: "15-30s", listeners: 95, retention: 95 },
  { time: "30-60s", listeners: 88, retention: 88 },
  { time: "1-2m", listeners: 82, retention: 82 },
  { time: "2-3m", listeners: 75, retention: 75 },
  { time: "3-4m", listeners: 68, retention: 68 },
  { time: "4m+", listeners: 62, retention: 62 },
]

export default function AnalyticsPerformancePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <p className="text-muted-foreground">Track engagement, completion rates, and listener behavior</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.8%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skip Rate</CardTitle>
            <SkipForward className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -1.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Save Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13.5%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Share Rate</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.9%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.4% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="tracks">Track Analysis</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Over Time</CardTitle>
              <CardDescription>Track how your music performance evolves month by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="streams" stroke="#8884d8" strokeWidth={2} name="Streams" />
                  <Line type="monotone" dataKey="saves" stroke="#82ca9d" strokeWidth={2} name="Saves" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" strokeWidth={2} name="Shares" />
                  <Line type="monotone" dataKey="skips" stroke="#ff7300" strokeWidth={2} name="Skips" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Track Performance</CardTitle>
              <CardDescription>Detailed metrics for each of your tracks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackPerformance.map((track) => (
                  <div key={track.title} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Volume2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{track.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {track.streams.toLocaleString()} total streams
                          </p>
                        </div>
                      </div>
                      <Badge variant={track.trend === "up" ? "default" : "destructive"}>
                        {track.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {track.trend === "up" ? "Trending" : "Declining"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{track.completionRate}%</div>
                        <div className="text-xs text-muted-foreground">Completion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{track.skipRate}%</div>
                        <div className="text-xs text-muted-foreground">Skip Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{track.saveRate}%</div>
                        <div className="text-xs text-muted-foreground">Save Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{track.shareRate}%</div>
                        <div className="text-xs text-muted-foreground">Share Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listener Retention Curve</CardTitle>
              <CardDescription>How long listeners stay engaged with your tracks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="retention" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
