"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Filter, Plus, Search, Share2, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

export default function CampaignsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Add these state variables after the existing date state
  const [campaignTasks, setCampaignTasks] = useState([
    { id: 1, task: "Create promotional graphics", completed: true, dueDate: "2023-06-25" },
    { id: 2, task: "Write social media copy", completed: true, dueDate: "2023-06-28" },
    { id: 3, task: "Set up ad targeting", completed: true, dueDate: "2023-06-30" },
    { id: 4, task: "Launch Instagram campaign", completed: false, dueDate: "2023-07-01" },
    { id: 5, task: "Launch Facebook campaign", completed: false, dueDate: "2023-07-01" },
    { id: 6, task: "Launch TikTok campaign", completed: false, dueDate: "2023-07-02" },
    { id: 7, task: "Mid-campaign performance review", completed: false, dueDate: "2023-07-15" },
    { id: 8, task: "Adjust targeting based on performance", completed: false, dueDate: "2023-07-16" },
  ])

  const [targetPlatforms, setTargetPlatforms] = useState({
    instagram: false,
    facebook: false,
    tiktok: false,
    spotify: false,
  })

  // Sample campaigns data
  const campaigns = [
    {
      id: 1,
      name: "Summer Vibes EP Launch",
      status: "Active",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      budget: "$1,200",
      spent: "$450",
      progress: 38,
      platforms: ["Instagram", "Facebook", "TikTok"],
    },
    {
      id: 2,
      name: "Midnight Dreams Pre-save",
      status: "Scheduled",
      startDate: "2023-08-05",
      endDate: "2023-08-20",
      budget: "$800",
      spent: "$0",
      progress: 0,
      platforms: ["Spotify", "Apple Music"],
    },
    {
      id: 3,
      name: "Summer Tour Promotion",
      status: "Completed",
      startDate: "2023-05-15",
      endDate: "2023-06-15",
      budget: "$1,500",
      spent: "$1,500",
      progress: 100,
      platforms: ["Instagram", "Facebook", "YouTube"],
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>View and manage your currently running marketing campaigns.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search campaigns..." className="pl-8 w-[200px] md:w-[260px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaigns
                  .filter((c) => c.status === "Active")
                  .map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{campaign.name}</h3>
                              <Badge>{campaign.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {format(new Date(campaign.startDate), "MMM d, yyyy")} -{" "}
                              {format(new Date(campaign.endDate), "MMM d, yyyy")}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="h-3 w-3 mr-2" />
                              Share
                            </Button>
                            <Button size="sm">Manage</Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                          <div>
                            <div className="text-sm font-medium">Budget</div>
                            <div className="flex items-end gap-2 mt-1">
                              <div className="text-2xl font-bold">{campaign.spent}</div>
                              <div className="text-sm text-muted-foreground">of {campaign.budget}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Progress</div>
                            <div className="mt-2">
                              <Progress value={campaign.progress} className="h-2" />
                              <div className="text-sm text-muted-foreground mt-1">{campaign.progress}% complete</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Platforms</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {campaign.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Campaign Tasks:</span> 5 of 8 completed
                          </div>
                          <Button variant="ghost" size="sm">
                            View Tasks
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Campaign Tasks</CardTitle>
              <CardDescription>Track and manage tasks for your active campaign: Summer Vibes EP Launch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          setCampaignTasks(
                            campaignTasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)),
                          )
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <div>
                        <div className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                          {task.task}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Due: {format(new Date(task.dueDate), "MMMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Campaigns</CardTitle>
              <CardDescription>View and manage your upcoming marketing campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaigns
                  .filter((c) => c.status === "Scheduled")
                  .map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{campaign.name}</h3>
                              <Badge variant="outline">{campaign.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {format(new Date(campaign.startDate), "MMM d, yyyy")} -{" "}
                              {format(new Date(campaign.endDate), "MMM d, yyyy")}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button size="sm">Start Now</Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                          <div>
                            <div className="text-sm font-medium">Budget</div>
                            <div className="text-2xl font-bold mt-1">{campaign.budget}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Duration</div>
                            <div className="text-lg mt-1">15 days</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Platforms</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {campaign.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Campaigns</CardTitle>
              <CardDescription>Review your past marketing campaigns and their performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaigns
                  .filter((c) => c.status === "Completed")
                  .map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{campaign.name}</h3>
                              <Badge variant="secondary">{campaign.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {format(new Date(campaign.startDate), "MMM d, yyyy")} -{" "}
                              {format(new Date(campaign.endDate), "MMM d, yyyy")}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="h-3 w-3 mr-2" />
                              Export Report
                            </Button>
                            <Button size="sm">View Results</Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                          <div>
                            <div className="text-sm font-medium">Budget</div>
                            <div className="text-2xl font-bold mt-1">{campaign.spent}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Impressions</div>
                            <div className="text-2xl font-bold mt-1">125.4K</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Engagement</div>
                            <div className="text-2xl font-bold mt-1">8.2K</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Conversions</div>
                            <div className="text-2xl font-bold mt-1">1.2K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
          <CardDescription>Set up a new marketing campaign for your music.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input id="campaign-name" placeholder="e.g. Summer EP Launch" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="campaign-objective">Campaign Objective</Label>
              <Select>
                <SelectTrigger id="campaign-objective">
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                  <SelectItem value="presave">Pre-save Campaign</SelectItem>
                  <SelectItem value="release">Release Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-3">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="campaign-budget">Campaign Budget</Label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  <span className="text-sm">$</span>
                </div>
                <Input id="campaign-budget" type="number" placeholder="0.00" className="rounded-l-none" />
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Target Platforms</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="instagram"
                    checked={targetPlatforms.instagram}
                    onChange={(e) => setTargetPlatforms({ ...targetPlatforms, instagram: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="instagram">Instagram</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="facebook"
                    checked={targetPlatforms.facebook}
                    onChange={(e) => setTargetPlatforms({ ...targetPlatforms, facebook: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="facebook">Facebook</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="tiktok"
                    checked={targetPlatforms.tiktok}
                    onChange={(e) => setTargetPlatforms({ ...targetPlatforms, tiktok: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="tiktok">TikTok</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <input
                    type="checkbox"
                    id="spotify"
                    checked={targetPlatforms.spotify}
                    onChange={(e) => setTargetPlatforms({ ...targetPlatforms, spotify: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="spotify">Spotify</Label>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="campaign-description">Campaign Description</Label>
              <Textarea id="campaign-description" placeholder="Describe your campaign goals and strategy..." rows={4} />
            </div>

            <div className="grid gap-3">
              <Label>Target Audience</Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Audience Demographics</h4>
                  <Button variant="outline" size="sm">
                    <Target className="h-3 w-3 mr-2" />
                    Define Audience
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  No audience targeting defined yet. Click "Define Audience" to set up your target demographics,
                  interests, and locations.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Campaign</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
