import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Globe, Link, Music, Plus, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SmartLinksPage() {
  // Sample smart links data
  const smartLinks = [
    {
      id: 1,
      title: "Summer Vibes EP",
      url: "musicbase.io/artist/summer-vibes",
      clicks: 1243,
      platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"],
      created: "2023-06-15",
    },
    {
      id: 2,
      title: "Midnight Dreams (Single)",
      url: "musicbase.io/artist/midnight-dreams",
      clicks: 856,
      platforms: ["Spotify", "Apple Music", "Deezer", "Tidal"],
      created: "2023-05-22",
    },
    {
      id: 3,
      title: "Acoustic Sessions",
      url: "musicbase.io/artist/acoustic-sessions",
      clicks: 421,
      platforms: ["Spotify", "Apple Music", "SoundCloud", "Bandcamp"],
      created: "2023-04-10",
    },
  ]

  // Sample analytics data
  const platformClicks = [
    { platform: "Spotify", clicks: 1245, percentage: 45 },
    { platform: "Apple Music", clicks: 876, percentage: 32 },
    { platform: "YouTube Music", clicks: 432, percentage: 16 },
    { platform: "Amazon Music", clicks: 198, percentage: 7 },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Smart Links</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Smart Link
        </Button>
      </div>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="links">My Links</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="mt-6">
          <div className="grid gap-6">
            {smartLinks.map((link) => (
              <Card key={link.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{link.title}</CardTitle>
                      <CardDescription className="mt-1">
                        <span className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {link.url}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {link.clicks} clicks
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {link.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created on {new Date(link.created).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Visit
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-3 w-3 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-3 w-3 mr-2" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Link className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Link Performance</CardTitle>
              <CardDescription>Track how your smart links are performing across platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Platform Distribution</h3>
                  <div className="space-y-4">
                    {platformClicks.map((platform) => (
                      <div key={platform.platform} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{platform.platform}</span>
                          <span>
                            {platform.clicks} clicks ({platform.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${platform.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Geographic Distribution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">United States</div>
                      <div className="text-2xl font-bold mt-1">42%</div>
                      <div className="text-sm text-muted-foreground">1,156 clicks</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">United Kingdom</div>
                      <div className="text-2xl font-bold mt-1">18%</div>
                      <div className="text-sm text-muted-foreground">495 clicks</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">Germany</div>
                      <div className="text-2xl font-bold mt-1">12%</div>
                      <div className="text-sm text-muted-foreground">330 clicks</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="font-medium">Canada</div>
                      <div className="text-2xl font-bold mt-1">8%</div>
                      <div className="text-sm text-muted-foreground">220 clicks</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Link Settings</CardTitle>
              <CardDescription>Customize your smart link appearance and behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="artist-name">Artist Name</Label>
                <Input id="artist-name" defaultValue="Your Artist Name" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="custom-domain">Custom Domain</Label>
                <Input id="custom-domain" placeholder="yourname.com" />
                <p className="text-sm text-muted-foreground">Connect your own domain to use for your smart links.</p>
              </div>

              <div className="space-y-3">
                <Label>Default Platforms</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 border p-2 rounded-md">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?key=7bs7d" />
                      <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Spotify</span>
                  </div>
                  <div className="flex items-center space-x-2 border p-2 rounded-md">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?key=qgaaq" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Apple Music</span>
                  </div>
                  <div className="flex items-center space-x-2 border p-2 rounded-md">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?key=lh5it" />
                      <AvatarFallback>YT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">YouTube Music</span>
                  </div>
                  <div className="flex items-center space-x-2 border p-2 rounded-md">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?key=b3fgl" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Amazon Music</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-3 w-3 mr-2" />
                  Add Platform
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Create New Smart Link</CardTitle>
          <CardDescription>Create a single link that directs fans to your music on all platforms.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="link-title">Link Title</Label>
              <Input id="link-title" placeholder="e.g. Summer Vibes EP" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="release-select">Select Release</Label>
              <div className="flex gap-2">
                <Input id="release-select" placeholder="Search your releases..." className="flex-1" />
                <Button variant="outline">
                  <Music className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Platforms</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?key=e01lf" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Spotify</div>
                    <Input className="mt-1 h-7 text-xs" placeholder="Spotify URL" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?key=s05je" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Apple Music</div>
                    <Input className="mt-1 h-7 text-xs" placeholder="Apple Music URL" />
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-3 w-3 mr-2" />
                Add More Platforms
              </Button>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="custom-url">Custom URL Suffix</Label>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">musicbase.io/</span>
                <Input id="custom-url" placeholder="your-release-name" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create Smart Link</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
