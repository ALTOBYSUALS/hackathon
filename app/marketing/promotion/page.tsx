import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Filter, ListFilter, Music, Plus, Radio, Search } from "lucide-react"

export default function PromotionPage() {
  // Sample playlists data
  const playlists = [
    {
      id: 1,
      name: "Indie Discoveries",
      curator: "Spotify Editorial",
      followers: 245000,
      genre: "Indie",
      status: "Submitted",
      date: "2023-06-28",
    },
    {
      id: 2,
      name: "Fresh Finds",
      curator: "Spotify Editorial",
      followers: 890000,
      genre: "Various",
      status: "Pending",
      date: "2023-06-25",
    },
    {
      id: 3,
      name: "Electronic Essentials",
      curator: "MusicTaste",
      followers: 125000,
      genre: "Electronic",
      status: "Accepted",
      date: "2023-06-15",
    },
    {
      id: 4,
      name: "Chill Vibes",
      curator: "ChillOut Media",
      followers: 78000,
      genre: "Chill",
      status: "Rejected",
      date: "2023-06-10",
    },
    {
      id: 5,
      name: "New Music Friday",
      curator: "Spotify Editorial",
      followers: 3800000,
      genre: "Various",
      status: "Pending",
      date: "2023-06-22",
    },
  ]

  // Sample radio stations
  const radioStations = [
    {
      id: 1,
      name: "KEXP 90.3 FM",
      location: "Seattle, WA",
      genre: "Alternative/Indie",
      contact: "music@kexp.org",
    },
    {
      id: 2,
      name: "BBC Radio 1",
      location: "London, UK",
      genre: "Contemporary",
      contact: "radio1.music@bbc.co.uk",
    },
    {
      id: 3,
      name: "Triple J",
      location: "Sydney, Australia",
      genre: "Alternative/Indie",
      contact: "music@triplej.net.au",
    },
    {
      id: 4,
      name: "KCRW 89.9 FM",
      location: "Los Angeles, CA",
      genre: "Eclectic",
      contact: "music@kcrw.org",
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Promotion</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="press">Press Kit</TabsTrigger>
          <TabsTrigger value="radio">Radio</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Playlist Submissions</CardTitle>
                  <CardDescription>Submit your music to playlists and track your submissions.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search playlists..." className="pl-8 w-[200px] md:w-[260px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/50 text-sm font-medium">
                  <div className="col-span-4">Playlist</div>
                  <div className="col-span-2 hidden md:block">Curator</div>
                  <div className="col-span-2 hidden md:block">Followers</div>
                  <div className="col-span-2 hidden md:block">Genre</div>
                  <div className="col-span-2 md:col-span-1">Status</div>
                  <div className="col-span-6 md:col-span-1">Actions</div>
                </div>

                {playlists.map((playlist) => (
                  <div key={playlist.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center text-sm">
                    <div className="col-span-4 font-medium">{playlist.name}</div>
                    <div className="col-span-2 hidden md:block text-muted-foreground">{playlist.curator}</div>
                    <div className="col-span-2 hidden md:block text-muted-foreground">
                      {playlist.followers.toLocaleString()}
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <Badge variant="outline">{playlist.genre}</Badge>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Badge
                        className={
                          playlist.status === "Accepted"
                            ? "bg-green-500"
                            : playlist.status === "Rejected"
                              ? "bg-red-500"
                              : playlist.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                        }
                      >
                        {playlist.status}
                      </Badge>
                    </div>
                    <div className="col-span-6 md:col-span-1 flex justify-end md:justify-center">
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 24 submissions</div>
              <Button variant="outline">View All</Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Submit to Playlists</CardTitle>
              <CardDescription>Find and submit your music to curated playlists.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="track-select">Select Track</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger id="track-select" className="flex-1">
                        <SelectValue placeholder="Choose a track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer-vibes">Summer Vibes EP - Track 1</SelectItem>
                        <SelectItem value="midnight-dreams">Midnight Dreams (Single)</SelectItem>
                        <SelectItem value="acoustic">Acoustic Sessions - Track 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Music className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label>Playlist Genres</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="indie" />
                      <Label htmlFor="indie">Indie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="electronic" />
                      <Label htmlFor="electronic">Electronic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pop" />
                      <Label htmlFor="pop">Pop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rock" />
                      <Label htmlFor="rock">Rock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hiphop" />
                      <Label htmlFor="hiphop">Hip Hop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ambient" />
                      <Label htmlFor="ambient">Ambient</Label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Recommended Playlists</Label>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      <ListFilter className="h-3 w-3 mr-1" />
                      Filter
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?key=ml4qq" />
                          <AvatarFallback>PL</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Indie Discoveries</div>
                          <div className="text-xs text-muted-foreground">Spotify Editorial • 245K followers</div>
                        </div>
                      </div>
                      <Button size="sm">Submit</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?key=khhcw" />
                          <AvatarFallback>PL</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Electronic Essentials</div>
                          <div className="text-xs text-muted-foreground">MusicTaste • 125K followers</div>
                        </div>
                      </div>
                      <Button size="sm">Submit</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?key=pv6mk" />
                          <AvatarFallback>PL</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Chill Vibes</div>
                          <div className="text-xs text-muted-foreground">ChillOut Media • 78K followers</div>
                        </div>
                      </div>
                      <Button size="sm">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="press" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Press Kit</CardTitle>
              <CardDescription>Create and manage your press kit for media outreach.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="artist-bio">Artist Bio</Label>
                  <Textarea id="artist-bio" placeholder="Write your artist bio here..." rows={5} />
                </div>

                <div className="grid gap-3">
                  <Label>Press Photos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-2 aspect-square flex items-center justify-center bg-muted/50">
                      <Button variant="ghost" className="h-24 w-24 rounded-full">
                        <Plus className="h-8 w-8" />
                      </Button>
                    </div>
                    <div className="border rounded-md p-2">
                      <img
                        src="/placeholder.svg?key=7wn38"
                        alt="Press photo"
                        className="w-full h-auto aspect-square object-cover rounded"
                      />
                    </div>
                    <div className="border rounded-md p-2">
                      <img
                        src="/placeholder.svg?key=v63z7"
                        alt="Press photo"
                        className="w-full h-auto aspect-square object-cover rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label>Press Quotes</Label>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="italic">
                        "An exciting new voice in the indie scene with a sound that's both fresh and familiar."
                      </div>
                      <div className="text-sm font-medium mt-2">— Music Magazine</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="italic">
                        "Their latest release showcases a maturity and depth that sets them apart from their peers."
                      </div>
                      <div className="text-sm font-medium mt-2">— Indie Music Blog</div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-2" />
                      Add Quote
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label>Contact Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="management" className="text-sm">
                        Management
                      </Label>
                      <Input id="management" className="mt-1" placeholder="Name and email" />
                    </div>
                    <div>
                      <Label htmlFor="booking" className="text-sm">
                        Booking
                      </Label>
                      <Input id="booking" className="mt-1" placeholder="Name and email" />
                    </div>
                    <div>
                      <Label htmlFor="publicity" className="text-sm">
                        Publicity
                      </Label>
                      <Input id="publicity" className="mt-1" placeholder="Name and email" />
                    </div>
                    <div>
                      <Label htmlFor="legal" className="text-sm">
                        Legal
                      </Label>
                      <Input id="legal" className="mt-1" placeholder="Name and email" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Preview</Button>
              <Button>Save Press Kit</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="radio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Radio Promotion</CardTitle>
              <CardDescription>Submit your music to radio stations and track airplay.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/50 text-sm font-medium">
                    <div className="col-span-4">Station</div>
                    <div className="col-span-3 hidden md:block">Location</div>
                    <div className="col-span-3 hidden md:block">Genre</div>
                    <div className="col-span-2">Actions</div>
                  </div>

                  {radioStations.map((station) => (
                    <div key={station.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center text-sm">
                      <div className="col-span-4 font-medium">{station.name}</div>
                      <div className="col-span-3 hidden md:block text-muted-foreground">{station.location}</div>
                      <div className="col-span-3 hidden md:block">
                        <Badge variant="outline">{station.genre}</Badge>
                      </div>
                      <div className="col-span-2 flex justify-end md:justify-start gap-2">
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                        <Button size="sm">Submit</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4">
                  <h3 className="text-lg font-medium">Submit to Radio</h3>
                  <div className="grid gap-3">
                    <Label htmlFor="radio-track">Select Track</Label>
                    <Select>
                      <SelectTrigger id="radio-track">
                        <SelectValue placeholder="Choose a track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer-vibes">Summer Vibes EP - Track 1</SelectItem>
                        <SelectItem value="midnight-dreams">Midnight Dreams (Single)</SelectItem>
                        <SelectItem value="acoustic">Acoustic Sessions - Track 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="radio-format">Radio Format</Label>
                    <Select>
                      <SelectTrigger id="radio-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="college">College Radio</SelectItem>
                        <SelectItem value="public">Public Radio</SelectItem>
                        <SelectItem value="commercial">Commercial Radio</SelectItem>
                        <SelectItem value="community">Community Radio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="radio-message">Submission Message</Label>
                    <Textarea
                      id="radio-message"
                      placeholder="Write a personalized message to the radio station..."
                      rows={4}
                    />
                  </div>

                  <Button className="w-full md:w-auto">
                    <Radio className="mr-2 h-4 w-4" />
                    Submit to Selected Stations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
