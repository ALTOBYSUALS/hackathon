"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "@/components/ui/chart"
import { Users, MapPin, Calendar, Clock, Smartphone, Monitor, Headphones } from "lucide-react"

const demographicsData = [
  { age: "13-17", male: 15, female: 25 },
  { age: "18-24", male: 35, female: 45 },
  { age: "25-34", male: 40, female: 35 },
  { age: "35-44", male: 25, female: 20 },
  { age: "45-54", male: 15, female: 12 },
  { age: "55+", male: 8, female: 6 },
]

const geographicData = [
  { country: "United States", listeners: 45000, percentage: 35 },
  { country: "United Kingdom", listeners: 25000, percentage: 20 },
  { country: "Canada", listeners: 18000, percentage: 14 },
  { country: "Australia", listeners: 12000, percentage: 9 },
  { country: "Germany", listeners: 10000, percentage: 8 },
  { country: "France", listeners: 8000, percentage: 6 },
  { country: "Others", listeners: 10000, percentage: 8 },
]

const deviceData = [
  { name: "Mobile", value: 65, color: "#8884d8" },
  { name: "Desktop", value: 25, color: "#82ca9d" },
  { name: "Tablet", value: 10, color: "#ffc658" },
]

const listeningHabits = [
  { hour: "00", streams: 1200 },
  { hour: "03", streams: 800 },
  { hour: "06", streams: 2500 },
  { hour: "09", streams: 4200 },
  { hour: "12", streams: 5800 },
  { hour: "15", streams: 6500 },
  { hour: "18", streams: 8200 },
  { hour: "21", streams: 7800 },
]

export default function AnalyticsAudiencePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audience Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your listener demographics and behavior</p>
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
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Audience Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listeners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156,432</div>
            <p className="text-xs text-muted-foreground">Unique monthly listeners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Country</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">🇺🇸 US</div>
            <p className="text-xs text-muted-foreground">35% of total listeners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Age</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26.5</div>
            <p className="text-xs text-muted-foreground">Years old</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6-9 PM</div>
            <p className="text-xs text-muted-foreground">Most active time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="behavior">Listening Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Age & Gender Distribution</CardTitle>
              <CardDescription>Breakdown of your audience by age groups and gender</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={demographicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="male" fill="#8884d8" name="Male" />
                  <Bar dataKey="female" fill="#82ca9d" name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Where your listeners are located worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{country.listeners.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{country.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>How your audience listens to your music</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Detailed device statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Mobile</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">65%</div>
                      <div className="text-sm text-muted-foreground">101,681 listeners</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Desktop</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">25%</div>
                      <div className="text-sm text-muted-foreground">39,108 listeners</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Headphones className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Tablet</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">10%</div>
                      <div className="text-sm text-muted-foreground">15,643 listeners</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listening Patterns</CardTitle>
              <CardDescription>When your audience is most active throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={listeningHabits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="streams" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
