"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Share2,
  FileText,
  Settings,
  Shield,
  Layers,
  Globe,
  Download,
  Upload,
  BarChart3,
  Check,
  AlertCircle,
  Clock,
  Plus,
  ExternalLink,
  RefreshCw,
  Copy,
} from "lucide-react"
import { useToolOnboarding } from "@/hooks/use-tool-onboarding"
import { ToolOnboarding } from "@/components/onboarding/tool-onboarding"
import { useState } from "react"

export default function ToolsPage() {
  const { showOnboarding, completeOnboarding, hasSeenOnboarding, startOnboarding } = useToolOnboarding({
    toolName: "Tools",
  })

  const [showSettings, setShowSettings] = useState(false)

  const onboardingSteps = [
    {
      title: "Welcome to Tools",
      description: "Access distribution, contracts, and settings for your music",
    },
    {
      title: "Distribution",
      description: "Manage where your music is distributed",
    },
    {
      title: "Contracts",
      description: "Manage your legal agreements and contracts",
    },
    {
      title: "Settings",
      description: "Configure your default distribution preferences",
    },
    {
      title: "API Access",
      description: "Manage your API keys for third-party integrations",
    },
    {
      title: "Integrations",
      description: "Manage your third-party integrations",
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
        <p className="text-muted-foreground">Access distribution, contracts, and settings for your music</p>
        {!hasSeenOnboarding && (
          <Button onClick={() => setShowSettings(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        )}
      </div>

      {showOnboarding && <ToolOnboarding toolName="Tools" steps={onboardingSteps} onComplete={completeOnboarding} />}

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Distribution</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">API Access</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* Distribution Tab */}
        <TabsContent value="distribution" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Distribution</h2>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Distribute New Release
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution Platforms</CardTitle>
                <CardDescription>Manage where your music is distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v12"></path>
                          <path d="M6 12h12"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Spotify</h4>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white">
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
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                          <path d="M12 8v8"></path>
                          <path d="M8 12h8"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Apple Music</h4>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

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
                          <path d="M2 3h20"></path>
                          <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                          <path d="m7 21 5-5 5 5"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Amazon Music</h4>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
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
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                          <path d="M12 8v8"></path>
                          <path d="M8 12h8"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Deezer</h4>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add More Platforms
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribution Status</CardTitle>
                <CardDescription>Track the status of your distributed releases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted px-4 py-3 font-medium">Summer Vibes EP</div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Live</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Release Date:</span>
                        <span className="text-sm">May 15, 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Platforms:</span>
                        <span className="text-sm">12 of 12 active</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-brand-primary h-2 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Analytics
                        </Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted px-4 py-3 font-medium">Midnight Dreams (Single)</div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-1 rounded-full">
                          Processing
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Release Date:</span>
                        <span className="text-sm">July 1, 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Platforms:</span>
                        <span className="text-sm">8 of 12 processing</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-brand-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Check Status
                        </Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Releases
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Contracts</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Contract
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Manage your legal agreements and contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Collaboration Agreement</h4>
                        <p className="text-sm text-muted-foreground">With: Producer XYZ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Royalty Split Agreement</h4>
                        <p className="text-sm text-muted-foreground">Summer Vibes EP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Licensing Agreement</h4>
                        <p className="text-sm text-muted-foreground">For: Commercial Use</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-1 rounded-full">Pending</span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <h4 className="font-medium">Contract Templates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Collaboration Agreement
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Royalty Split Contract
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Licensing Agreement
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Activity</CardTitle>
                <CardDescription>Recent updates to your contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>

                    <div className="relative pl-10 pb-6">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Royalty Split Agreement Signed</h4>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          All parties have signed the agreement for Summer Vibes EP
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-10 pb-6">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Licensing Agreement Sent</h4>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Waiting for counter-party signature</p>
                      </div>
                    </div>

                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Contract Revision Requested</h4>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Producer XYZ has requested changes to the collaboration agreement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution Settings</CardTitle>
                <CardDescription>Configure your default distribution preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-platforms">Default Distribution Platforms</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="spotify" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="spotify" className="text-sm">
                          Spotify
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="apple" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="apple" className="text-sm">
                          Apple Music
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="amazon" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="amazon" className="text-sm">
                          Amazon Music
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="deezer" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="deezer" className="text-sm">
                          Deezer
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="tidal" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="tidal" className="text-sm">
                          Tidal
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="youtube" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="youtube" className="text-sm">
                          YouTube Music
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pandora" className="rounded border-gray-300" />
                        <label htmlFor="pandora" className="text-sm">
                          Pandora
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="soundcloud" className="rounded border-gray-300" />
                        <label htmlFor="soundcloud" className="text-sm">
                          SoundCloud
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="release-schedule">Default Release Schedule</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="release-day" className="text-sm">
                          Preferred Release Day
                        </Label>
                        <select
                          id="release-day"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option>Friday</option>
                          <option>Monday</option>
                          <option>Tuesday</option>
                          <option>Wednesday</option>
                          <option>Thursday</option>
                          <option>Saturday</option>
                          <option>Sunday</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lead-time" className="text-sm">
                          Lead Time Before Release
                        </Label>
                        <select
                          id="lead-time"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option>2 weeks</option>
                          <option>3 weeks</option>
                          <option>4 weeks</option>
                          <option>6 weeks</option>
                          <option>8 weeks</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-pricing">Default Pricing Strategy</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="single-price" className="text-sm">
                          Single Price (USD)
                        </Label>
                        <Input id="single-price" type="text" defaultValue="0.99" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="album-price" className="text-sm">
                          Album Price (USD)
                        </Label>
                        <Input id="album-price" type="text" defaultValue="9.99" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Release Updates</h4>
                      <p className="text-sm text-muted-foreground">Get notified about release status changes</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="release-updates" className="rounded border-gray-300" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Royalty Payments</h4>
                      <p className="text-sm text-muted-foreground">Get notified when you receive payments</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="royalty-payments" className="rounded border-gray-300" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Opportunities</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about promotion opportunities</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        id="marketing-opportunities"
                        className="rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Platform Newsletter</h4>
                      <p className="text-sm text-muted-foreground">Receive our monthly newsletter</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="platform-newsletter" className="rounded border-gray-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* API Access Tab */}
        <TabsContent value="api" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">API Access</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate New Key
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for third-party integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-medium">Production Key</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-mono bg-background px-2 py-1 rounded">
                          ••••••••••••••••••••••••
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-medium">Development Key</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-mono bg-background px-2 py-1 rounded">
                          ••••••••••••••••••••••••
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <h4 className="font-medium">API Usage</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">This Month</span>
                      <span className="text-sm">2,345 / 10,000 requests</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-brand-primary h-2 rounded-full" style={{ width: "23.45%" }}></div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Resources to help you integrate with our API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <FileText className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h3 className="font-medium mb-2">API Reference</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Complete documentation of all API endpoints and parameters
                        </p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Docs
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <Download className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h3 className="font-medium mb-2">SDK & Libraries</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Download client libraries for popular programming languages
                        </p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <Globe className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h3 className="font-medium mb-2">Code Examples</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Sample code and tutorials to get started quickly
                        </p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Examples
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Integrations</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Browse Integrations
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage your third-party integrations</CardDescription>
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
                          <path d="M2 3h20"></path>
                          <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                          <path d="m7 21 5-5 5 5"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">MailChimp</h4>
                        <p className="text-sm text-muted-foreground">Email marketing integration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Connected</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
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
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                          <path d="M12 8v8"></path>
                          <path d="M8 12h8"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Google Analytics</h4>
                        <p className="text-sm text-muted-foreground">Website analytics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Connected</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
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
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                          <path d="M12 8v8"></path>
                          <path d="M8 12h8"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Zapier</h4>
                        <p className="text-sm text-muted-foreground">Workflow automation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Connected</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect More Services
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Integrations</CardTitle>
                <CardDescription>Discover new services to enhance your workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <BarChart3 className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h3 className="font-medium mb-2">Chartmetric</h3>
                        <p className="text-sm text-muted-foreground mb-4">Advanced music analytics and insights</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <Globe className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h3 className="font-medium mb-2">Shopify</h3>
                        <p className="text-sm text-muted-foreground mb-4">Merchandise and e-commerce integration</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <Share2 className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h3 className="font-medium mb-2">Buffer</h3>
                        <p className="text-sm text-muted-foreground mb-4">Social media scheduling and management</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Integrations
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
