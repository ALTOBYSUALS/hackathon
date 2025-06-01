"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, ImageIcon, Instagram, Linkedin, Plus, Share2, Twitter, Youtube } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

export default function SocialMediaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample scheduled posts
  const scheduledPosts = [
    {
      id: 1,
      content:
        "Excited to announce my new single 'Midnight Dreams' dropping next Friday! Pre-save link in bio. #NewMusic #MidnightDreams",
      platforms: ["Instagram", "Twitter"],
      date: "2023-07-10",
      time: "18:00",
      image: true,
    },
    {
      id: 2,
      content:
        "Behind the scenes from our latest music video shoot. Can't wait for you all to see the final result! #BTS #MusicVideo",
      platforms: ["Instagram"],
      date: "2023-07-12",
      time: "12:30",
      image: true,
    },
    {
      id: 3,
      content: "MIDNIGHT DREAMS OUT NOW on all platforms! Listen here: [link] #NewRelease #MidnightDreams",
      platforms: ["Instagram", "Twitter", "LinkedIn"],
      date: "2023-07-14",
      time: "09:00",
      image: true,
    },
  ]

  // Sample connected accounts
  const connectedAccounts = [
    {
      platform: "Instagram",
      username: "@artistname",
      followers: "12.5K",
      connected: true,
      icon: Instagram,
    },
    {
      platform: "Twitter",
      username: "@artistname",
      followers: "8.2K",
      connected: true,
      icon: Twitter,
    },
    {
      platform: "YouTube",
      username: "Artist Official",
      followers: "25.7K",
      connected: false,
      icon: Youtube,
    },
    {
      platform: "LinkedIn",
      username: "Artist Name",
      followers: "3.4K",
      connected: true,
      icon: Linkedin,
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Social Media</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>Schedule and manage your social media posts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </div>
                <div className="md:w-1/2">
                  <h3 className="font-medium mb-2">
                    Scheduled Posts for {date ? format(date, "MMMM d, yyyy") : "selected date"}
                  </h3>
                  <div className="space-y-4">
                    {date && format(date, "yyyy-MM-dd") === "2023-07-10" ? (
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?key=iym3k" />
                              <AvatarFallback>IG</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?key=eed6h" />
                              <AvatarFallback>TW</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            6:00 PM
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          Excited to announce my new single 'Midnight Dreams' dropping next Friday! Pre-save link in
                          bio. #NewMusic #MidnightDreams
                        </div>
                        <div className="mt-2">
                          <img
                            src="/placeholder.svg?key=grpjs"
                            alt="Post image"
                            className="h-24 w-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No posts scheduled for this date.</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>View and manage your upcoming social media posts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {post.platforms.map((platform) => (
                            <Badge key={platform} variant="outline">
                              {platform === "Instagram" && <Instagram className="h-3 w-3 mr-1" />}
                              {platform === "Twitter" && <Twitter className="h-3 w-3 mr-1" />}
                              {platform === "LinkedIn" && <Linkedin className="h-3 w-3 mr-1" />}
                              {platform}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm">{post.content}</div>
                        {post.image && (
                          <div className="mt-2">
                            <img
                              src="/placeholder.svg?key=a3p5r"
                              alt="Post image"
                              className="h-24 w-48 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(post.date), "MMM d, yyyy")} at {post.time}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Duplicate
                          </Button>
                          <Button size="sm">
                            <Share2 className="h-3 w-3 mr-2" />
                            Post Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your connected social media accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {connectedAccounts.map((account) => (
                  <div key={account.platform} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10">
                          <account.icon className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{account.platform}</div>
                        <div className="text-sm text-muted-foreground">{account.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="font-medium">{account.followers}</span> followers
                      </div>
                      {account.connected ? (
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect New Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Analytics</CardTitle>
              <CardDescription>Track your performance across social platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Audience Growth</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-500" />
                        <span className="font-medium">Instagram</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">12.5K</div>
                      <div className="text-xs text-green-500 mt-1">+3.2% this month</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Twitter</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">8.2K</div>
                      <div className="text-xs text-green-500 mt-1">+2.8% this month</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Youtube className="h-4 w-4 text-red-500" />
                        <span className="font-medium">YouTube</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">25.7K</div>
                      <div className="text-xs text-green-500 mt-1">+5.1% this month</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <span className="font-medium">LinkedIn</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">3.4K</div>
                      <div className="text-xs text-green-500 mt-1">+1.5% this month</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Engagement Overview</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Instagram Engagement Rate</span>
                        <span>4.8%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-pink-500 rounded-full h-2" style={{ width: "4.8%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Twitter Engagement Rate</span>
                        <span>3.2%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: "3.2%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">YouTube Engagement Rate</span>
                        <span>6.5%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-red-500 rounded-full h-2" style={{ width: "6.5%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Top Performing Posts</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <Avatar>
                        <AvatarImage src="/instagram-post-lifestyle.png" />
                        <AvatarFallback>IG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-3 w-3 text-pink-500" />
                          <span className="text-sm font-medium">Instagram</span>
                          <span className="text-xs text-muted-foreground">June 15, 2023</span>
                        </div>
                        <div className="text-sm mt-1">
                          "Behind the scenes from our latest studio session. New music coming soon! #StudioLife"
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>1.2K likes</span>
                          <span>87 comments</span>
                          <span>156 shares</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <Avatar>
                        <AvatarImage src="/twitter-post.png" />
                        <AvatarFallback>TW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-3 w-3 text-blue-500" />
                          <span className="text-sm font-medium">Twitter</span>
                          <span className="text-xs text-muted-foreground">June 22, 2023</span>
                        </div>
                        <div className="text-sm mt-1">
                          "Excited to announce we'll be performing at @MusicFestival next month! Tickets in bio.
                          #LiveMusic"
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>845 likes</span>
                          <span>132 retweets</span>
                          <span>56 replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Create and schedule posts across your social media platforms.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Select Platforms</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  Instagram
                </Button>
                <Button variant="outline" className="gap-2">
                  <Twitter className="h-4 w-4 text-blue-500" />
                  Twitter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  YouTube
                </Button>
                <Button variant="outline" className="gap-2">
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="post-content">Post Content</Label>
              <Textarea id="post-content" placeholder="What do you want to share?" rows={4} />
            </div>

            <div className="grid gap-3">
              <Label>Media</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <div className="text-sm text-muted-foreground text-center">
                  Drag and drop an image or video, or click to browse
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Media
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Label>Schedule Date</Label>
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
                <Label htmlFor="post-time">Schedule Time</Label>
                <Select>
                  <SelectTrigger id="post-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Post Now
            </Button>
            <Button>Schedule Post</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
