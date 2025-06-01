"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Clock, Filter, Globe, Plus, Search, Settings } from "lucide-react"
import { format } from "date-fns"
import { useToolOnboarding } from "@/hooks/use-tool-onboarding"
import { ToolOnboarding } from "@/components/onboarding/tool-onboarding"
import { useState } from "react"

export default function DistributionPage() {
  const { showOnboarding, completeOnboarding, hasSeenOnboarding, startOnboarding } = useToolOnboarding({
    toolName: "Distribution",
  })

  const [showSettings, setShowSettings] = useState(false)

  const onboardingSteps = [
    {
      title: "Welcome to Distribution",
      description: "Manage your distributed music across platforms.",
    },
    {
      title: "Your Releases",
      description: "View and manage your releases",
    },
    {
      title: "Connected Platforms",
      description: "Manage your distribution platforms and connections",
    },
    {
      title: "Distribution Settings",
      description: "Configure your global distribution preferences",
    },
    {
      title: "Distribution Analytics",
      description: "Track the performance of your distributed music",
    },
  ]

  // Sample releases data
  const releases = [
    {
      id: 1,
      title: "Summer Vibes EP",
      type: "EP",
      releaseDate: "2023-07-15",
      status: "Live",
      platforms: ["Spotify", "Apple Music", "Amazon Music", "Deezer", "Tidal"],
      artwork: "/summer-vibes-album-cover.png",
    },
    {
      id: 2,
      title: "Midnight Dreams",
      type: "Single",
      releaseDate: "2023-08-02",
      status: "Scheduled",
      platforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer"],
      artwork: "/midnight-dreams-album-cover.png",
    },
    {
      id: 3,
      title: "Acoustic Sessions",
      type: "Album",
      releaseDate: "2023-09-10",
      status: "Draft",
      platforms: [],
      artwork: "/acoustic-sessions-album-cover.png",
    },
  ]

  // Sample platforms data
  const platforms = [
    {
      name: "Spotify",
      connected: true,
      icon: "/placeholder.svg?key=dr10o",
      releases: 12,
    },
    {
      name: "Apple Music",
      connected: true,
      icon: "/placeholder.svg?key=4ffr2",
      releases: 12,
    },
    {
      name: "Amazon Music",
      connected: true,
      icon: "/placeholder.svg?key=etx29",
      releases: 10,
    },
    {
      name: "YouTube Music",
      connected: true,
      icon: "/placeholder.svg?key=74ecf",
      releases: 11,
    },
    {
      name: "Deezer",
      connected: true,
      icon: "/deezer-logo.png",
      releases: 12,
    },
    {
      name: "Tidal",
      connected: true,
      icon: "/abstract-wave-logo.png",
      releases: 9,
    },
    {
      name: "Pandora",
      connected: false,
      icon: "/generic-jewelry-logo.png",
      releases: 0,
    },
    {
      name: "SoundCloud",
      connected: false,
      icon: "/soundcloud-logo.png",
      releases: 0,
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Distribution</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Release
        </Button>
        {!hasSeenOnboarding && (
          <Button onClick={() => setShowSettings(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        )}
      </div>

      {showOnboarding && (
        <ToolOnboarding toolName="Distribution" steps={onboardingSteps} onComplete={completeOnboarding} />
      )}

      <Tabs defaultValue="releases" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="releases" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Your Releases</CardTitle>
                  <CardDescription>Manage your distributed music across platforms.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search releases..." className="pl-8 w-[200px] md:w-[260px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {releases.map((release) => (
                  <div
                    key={release.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={release.artwork || "/placeholder.svg"}
                        alt={release.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{release.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{release.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(release.releaseDate), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 w-full md:w-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Distribution Status</div>
                        <Badge
                          className={
                            release.status === "Live"
                              ? "bg-green-500"
                              : release.status === "Scheduled"
                                ? "bg-blue-500"
                                : "bg-muted"
                          }
                        >
                          {release.status}
                        </Badge>
                      </div>

                      {release.status !== "Draft" && (
                        <div className="flex flex-wrap gap-2">
                          {release.platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {release.status === "Draft" && (
                        <div className="text-sm text-muted-foreground">Not yet distributed to any platforms</div>
                      )}
                    </div>

                    <div className="flex gap-2 self-end md:self-center">
                      {release.status === "Draft" && <Button size="sm">Distribute</Button>}
                      {release.status === "Scheduled" && (
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      )}
                      {release.status === "Live" && (
                        <Button variant="outline" size="sm">
                          <Globe className="h-3 w-3 mr-2" />
                          View
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Distribution Activity</CardTitle>
              <CardDescription>Recent updates to your distributed releases.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 border rounded-md">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Summer Vibes EP is now live</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Your release is now available on all platforms.
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>

                <div className="flex items-start gap-4 p-3 border rounded-md">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Midnight Dreams scheduled for release</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Your single will be released on August 2, 2023.
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 week ago</div>
                </div>

                <div className="flex items-start gap-4 p-3 border rounded-md">
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <Settings className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Distribution settings updated</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      You've updated your distribution preferences.
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 weeks ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>Manage your distribution platforms and connections.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <div key={platform.name} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={platform.icon || "/placeholder.svg"} alt={platform.name} />
                        <AvatarFallback>{platform.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        {platform.connected ? (
                          <Badge
                            variant="outline"
                            className="mt-1 text-xs bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          >
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Not Connected
                          </Badge>
                        )}
                      </div>
                    </div>

                    {platform.connected && (
                      <div className="mt-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Releases:</span>
                          <span>{platform.releases}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      {platform.connected ? (
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-3 w-3 mr-2" />
                          Manage
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full">
                          <Plus className="h-3 w-3 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Distribution Settings</CardTitle>
              <CardDescription>Configure your global distribution preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="default-platforms">Default Platforms</Label>
                  <Select>
                    <SelectTrigger id="default-platforms">
                      <SelectValue placeholder="All Platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="major">Major Platforms Only</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose which platforms to distribute to by default for new releases.
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="release-timing">Release Timing</Label>
                  <Select>
                    <SelectTrigger id="release-timing">
                      <SelectValue placeholder="Friday Release (Industry Standard)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friday">Friday Release (Industry Standard)</SelectItem>
                      <SelectItem value="custom">Custom Day of Week</SelectItem>
                      <SelectItem value="immediate">Immediate (As Soon As Possible)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Set your preferred release day for new music.</p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="distribution-territory">Distribution Territory</Label>
                  <Select>
                    <SelectTrigger id="distribution-territory">
                      <SelectValue placeholder="Worldwide" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                      <SelectItem value="us">United States Only</SelectItem>
                      <SelectItem value="europe">Europe Only</SelectItem>
                      <SelectItem value="custom">Custom Territories</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose where your music will be distributed by default.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Analytics</CardTitle>
              <CardDescription>Track the performance of your distributed music.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Platform Breakdown</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Spotify</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Apple Music</span>
                        <span>28%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-pink-500 rounded-full h-2" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Amazon Music</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Other Platforms</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-purple-500 rounded-full h-2" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Top Performing Releases</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <img
                          src="/summer-vibes-album-cover.png"
                          alt="Summer Vibes EP"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <div className="font-medium">Summer Vibes EP</div>
                          <div className="text-xs text-muted-foreground">Released Jul 15, 2023</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">24.5K</div>
                        <div className="text-xs text-muted-foreground">Total Streams</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <img
                          src="/midnight-dreams-album-cover.png"
                          alt="Midnight Dreams"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <div className="font-medium">Midnight Dreams</div>
                          <div className="text-xs text-muted-foreground">Scheduled Aug 2, 2023</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">0</div>
                        <div className="text-xs text-muted-foreground">Not Yet Released</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Geographic Distribution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">United States</div>
                      <div className="text-2xl font-bold mt-1">38%</div>
                      <div className="text-sm text-muted-foreground">9,310 streams</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">United Kingdom</div>
                      <div className="text-2xl font-bold mt-1">15%</div>
                      <div className="text-sm text-muted-foreground">3,675 streams</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">Germany</div>
                      <div className="text-2xl font-bold mt-1">12%</div>
                      <div className="text-sm text-muted-foreground">2,940 streams</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">Other Countries</div>
                      <div className="text-2xl font-bold mt-1">35%</div>
                      <div className="text-sm text-muted-foreground">8,575 streams</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
