import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Share2, Megaphone, Globe, Target, Calendar, Plus, ExternalLink, Copy, BarChart3 } from "lucide-react"

export default function MarketingPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Hub</h1>
        <p className="text-muted-foreground">Promote your music and grow your audience with our marketing tools</p>
      </div>

      <Tabs defaultValue="smart-links" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="smart-links" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Smart Links</span>
          </TabsTrigger>
          <TabsTrigger value="promotion" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Promotion</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Social Media</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="planner" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Release Planner</span>
          </TabsTrigger>
        </TabsList>

        {/* Smart Links Tab */}
        <TabsContent value="smart-links" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Smart Links</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Smart Link
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Smart Link Card 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Summer Vibes EP</CardTitle>
                <CardDescription>Created 2 weeks ago • Active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Link URL:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                        musicbase.io/artist/summer-vibes
                      </span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Clicks:</span>
                    <span className="text-sm">1,245</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Platforms:</span>
                    <span className="text-sm">8 services</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
              </CardFooter>
            </Card>

            {/* Smart Link Card 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Midnight Dreams</CardTitle>
                <CardDescription>Created 1 month ago • Active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Link URL:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                        musicbase.io/artist/midnight-dreams
                      </span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Clicks:</span>
                    <span className="text-sm">3,782</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Platforms:</span>
                    <span className="text-sm">12 services</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
              </CardFooter>
            </Card>

            {/* Create New Smart Link Card */}
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-10">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create New Smart Link</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Connect all your music services in one shareable link
                </p>
                <Button>Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Promotion Tab */}
        <TabsContent value="promotion" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Promotion</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Promotion
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Playlist Submission */}
            <Card>
              <CardHeader>
                <CardTitle>Playlist Submission</CardTitle>
                <CardDescription>Submit your music to curated playlists</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get your music featured on popular playlists across streaming platforms.
                </p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Success rate:</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-brand-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Track</Button>
              </CardFooter>
            </Card>

            {/* Press Kit */}
            <Card>
              <CardHeader>
                <CardTitle>Press Kit</CardTitle>
                <CardDescription>Create and share your electronic press kit</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Build a professional press kit to share with media outlets and industry professionals.
                </p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Completion:</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-brand-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Edit Press Kit</Button>
              </CardFooter>
            </Card>

            {/* Radio Promotion */}
            <Card>
              <CardHeader>
                <CardTitle>Radio Promotion</CardTitle>
                <CardDescription>Get your music on radio stations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit your tracks to radio stations and digital radio platforms worldwide.
                </p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Available credits:</span>
                  <span className="font-medium">3 submissions</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-brand-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Campaign</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Social Media</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Connect Account
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your connected social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Twitter</h4>
                        <p className="text-sm text-muted-foreground">@artistname</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Instagram</h4>
                        <p className="text-sm text-muted-foreground">@artistname</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">YouTube</h4>
                        <p className="text-sm text-muted-foreground">Artist Channel</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Connect More Platforms</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M17.5 6.5 17.51 6.5"></path>
                      </svg>
                      TikTok
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                      Soundcloud
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Marketing Campaigns</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Track and manage your marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted px-4 py-3 font-medium">Summer EP Launch</div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Timeline:</span>
                        <span className="text-sm">May 15 - June 30, 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Budget spent:</span>
                        <span className="text-sm">$450 / $1,000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-brand-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted px-4 py-3 font-medium">New Single Promotion</div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-1 rounded-full">Scheduled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Timeline:</span>
                        <span className="text-sm">July 1 - July 31, 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Budget spent:</span>
                        <span className="text-sm">$0 / $500</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-brand-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Campaigns
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Release Planner Tab */}
        <TabsContent value="planner" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Release Planner</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Plan New Release
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Release Timeline</CardTitle>
                <CardDescription>Plan and schedule your upcoming releases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Summer Vibes EP</h4>
                          <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">
                            Released
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Released on May 15, 2023</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Spotify</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Apple Music</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Amazon Music</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">+5 more</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Midnight Dreams (Single)</h4>
                          <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-1 rounded-full">
                            In Review
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Scheduled for July 1, 2023</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Spotify</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Apple Music</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Amazon Music</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">+8 more</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Autumn Collection (Album)</h4>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">Draft</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Planned for September 15, 2023</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button size="sm">Continue Setup</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <h4 className="font-medium">Recommended Release Schedule</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your audience engagement and industry trends, we recommend:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-brand-primary h-5 w-5 flex items-center justify-center text-white text-xs mt-0.5">
                          1
                        </span>
                        <span>Release your next single in early August</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-brand-primary h-5 w-5 flex items-center justify-center text-white text-xs mt-0.5">
                          2
                        </span>
                        <span>Follow up with a music video 1-2 weeks after release</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-brand-primary h-5 w-5 flex items-center justify-center text-white text-xs mt-0.5">
                          3
                        </span>
                        <span>Plan your album release for mid-September to maximize Q4 streaming</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
