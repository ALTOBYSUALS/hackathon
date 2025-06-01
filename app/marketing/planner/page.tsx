"use client"

import { CalendarIcon, ChevronRightIcon, Clock, ListChecks, Music, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export default function ReleasePlannerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Release Planner</h1>
        <p className="text-muted-foreground">Plan, schedule, and manage your music releases efficiently</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Releases</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
            <CardDescription>Your scheduled releases for the next 90 days</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[320px]">
              {upcomingReleases.map((release, index) => (
                <div key={index} className="p-4 border-b last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center mr-3">
                        <Music className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{release.title}</h4>
                        <p className="text-sm text-muted-foreground">{release.artist}</p>
                      </div>
                    </div>
                    <Badge variant={getBadgeVariant(release.status)}>{release.status}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{release.date}</span>
                    <ChevronRightIcon className="h-3.5 w-3.5 mx-1" />
                    <span>{release.type}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Release Calendar</CardTitle>
            <CardDescription>View and manage your release schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" initialFocus />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">Single</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs">EP</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                <span className="text-xs">Album</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Release Checklist</CardTitle>
            <CardDescription>Track your pre-release tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="mt-0">
                <ScrollArea className="h-[280px] pr-4">
                  {releaseTasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3 mb-4">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${task.completed ? "bg-primary border-primary" : "border-input"}`}
                      >
                        {task.completed && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {task.dueIn}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="completed" className="mt-0">
                <ScrollArea className="h-[280px] pr-4">
                  {completedTasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3 mb-4">
                      <div className="w-5 h-5 rounded-full border bg-primary border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium line-through text-muted-foreground">{task.title}</h4>
                          <span className="text-xs text-muted-foreground">{task.completedOn}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Marketing Timeline</CardTitle>
            <CardDescription>Coordinated marketing activities for your releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l">
              {marketingTimeline.map((item, index) => (
                <div key={index} className="mb-6 last:mb-0 relative">
                  <div className="absolute w-3 h-3 rounded-full bg-primary -left-[22px] top-1"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.timing}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex space-x-2">
                    {item.platforms.map((platform, pIndex) => (
                      <Badge key={pIndex} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Marketing Activity
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Collaboration</CardTitle>
            <CardDescription>Coordinate with your team on release activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Team Members</h4>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-muted p-2 rounded-md">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{member.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Recent Activity</h4>
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.userAvatar || "/placeholder.svg"} alt={activity.userName} />
                      <AvatarFallback>{activity.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.userName}</span> {activity.action}
                      </p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-2 w-full">
              <Button variant="outline" className="flex-1">
                <ListChecks className="h-4 w-4 mr-2" />
                Tasks
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Helper function to determine badge variant based on status
function getBadgeVariant(status: string) {
  switch (status) {
    case "Scheduled":
      return "outline"
    case "In Progress":
      return "secondary"
    case "Ready":
      return "default"
    case "Delayed":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const upcomingReleases = [
  {
    title: "Midnight Dreams",
    artist: "Your Artist Name",
    date: "June 15, 2023",
    status: "Scheduled",
    type: "Single",
  },
  {
    title: "Summer Vibes EP",
    artist: "Your Artist Name",
    date: "July 8, 2023",
    status: "In Progress",
    type: "EP",
  },
  {
    title: "Acoustic Sessions",
    artist: "Your Artist Name ft. Guest Artist",
    date: "July 22, 2023",
    status: "Ready",
    type: "Single",
  },
  {
    title: "Remix Collection",
    artist: "Various Artists",
    date: "August 5, 2023",
    status: "In Progress",
    type: "Album",
  },
  {
    title: "Live at Studio 54",
    artist: "Your Artist Name",
    date: "August 19, 2023",
    status: "Delayed",
    type: "EP",
  },
]

const releaseTasks = [
  {
    title: "Finalize master audio files",
    description: "Complete mixing and mastering for all tracks",
    dueIn: "2 days",
    completed: false,
  },
  {
    title: "Upload to distribution",
    description: "Submit tracks to your distributor",
    dueIn: "5 days",
    completed: false,
  },
  {
    title: "Prepare press kit",
    description: "Create bio, photos, and press release",
    dueIn: "1 week",
    completed: false,
  },
  {
    title: "Schedule social media posts",
    description: "Plan content calendar for release promotion",
    dueIn: "1 week",
    completed: false,
  },
  {
    title: "Submit to playlist curators",
    description: "Send pre-release links to playlist contacts",
    dueIn: "2 weeks",
    completed: false,
  },
]

const completedTasks = [
  {
    title: "Create album artwork",
    description: "Design cover art and promotional images",
    completedOn: "May 10",
  },
  {
    title: "Register songs with PRO",
    description: "Register with ASCAP/BMI and publishing admin",
    completedOn: "May 8",
  },
  {
    title: "Finalize release date",
    description: "Confirm optimal release timing with team",
    completedOn: "May 5",
  },
]

const marketingTimeline = [
  {
    title: "Announcement",
    timing: "4 weeks before",
    description: "Initial announcement of upcoming release with teaser content",
    platforms: ["Instagram", "TikTok", "Twitter"],
  },
  {
    title: "Pre-save Campaign",
    timing: "3 weeks before",
    description: "Launch pre-save links across all platforms",
    platforms: ["Spotify", "Apple Music"],
  },
  {
    title: "Music Video",
    timing: "2 weeks before",
    description: "Release teaser clips and behind-the-scenes content",
    platforms: ["YouTube", "Instagram"],
  },
  {
    title: "Release Day",
    timing: "Day of release",
    description: "Coordinated posts across all platforms with links to stream",
    platforms: ["All Platforms"],
  },
]

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Manager",
    avatar: "/diverse-group.png",
  },
  {
    name: "Sam Rivera",
    role: "PR",
    avatar: "/diverse-group.png",
  },
  {
    name: "Taylor Kim",
    role: "Designer",
    avatar: "/diverse-group.png",
  },
  {
    name: "Jordan Smith",
    role: "Marketing",
    avatar: "/diverse-group.png",
  },
]

const recentActivity = [
  {
    userName: "Alex Johnson",
    userAvatar: "/diverse-group.png",
    action: "updated the release date for 'Summer Vibes EP'",
    time: "2 hours ago",
  },
  {
    userName: "Sam Rivera",
    userAvatar: "/diverse-group.png",
    action: "added 3 new playlist contacts",
    time: "Yesterday",
  },
  {
    userName: "Taylor Kim",
    userAvatar: "/diverse-group.png",
    action: "uploaded final artwork files",
    time: "2 days ago",
  },
]
