"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Filter, Plus, Search, FileText, Check, Clock, Settings } from "lucide-react"
import { format } from "date-fns"
import { useToolOnboarding } from "@/hooks/use-tool-onboarding"
import { ToolOnboarding } from "@/components/onboarding/tool-onboarding"
import { useState } from "react"

export default function ContractsPage() {
  const { showOnboarding, completeOnboarding, hasSeenOnboarding, startOnboarding } = useToolOnboarding({
    toolName: "Contracts",
  })

  const [showSettings, setShowSettings] = useState(false)

  const onboardingSteps = [
    {
      title: "Welcome to Contracts",
      description: "Manage your legal agreements and contracts",
    },
    {
      title: "Active Contracts",
      description: "View and manage your active contracts",
    },
    {
      title: "Contract Templates",
      description: "Start with pre-made templates for common agreements",
    },
    {
      title: "Contract Activity",
      description: "Track all actions related to your contracts",
    },
  ]

  const contracts = [
    {
      id: "1",
      title: "Collaboration Agreement",
      type: "Music",
      status: "Active",
      created: "2023-01-01",
      parties: ["Artist A", "Artist B"],
    },
    {
      id: "2",
      title: "Royalty Split Agreement",
      type: "Music",
      status: "Pending",
      created: "2023-02-15",
      parties: ["Producer X", "Artist A"],
    },
    {
      id: "3",
      title: "Licensing Agreement",
      type: "Music",
      status: "Draft",
      created: "2023-03-10",
      parties: ["Label Y", "Artist B"],
    },
  ]

  const templates = [
    {
      id: "1",
      title: "Collaboration Agreement",
      category: "Music",
      description: "Define terms for working with other artists or producers",
    },
    {
      id: "2",
      title: "Royalty Split",
      category: "Music",
      description: "Define how royalties will be split between collaborators",
    },
    {
      id: "3",
      title: "Licensing Agreement",
      category: "Music",
      description: "Create terms for licensing your music for commercial use",
    },
  ]

  const activities = [
    {
      id: "1",
      action: "Contract signed",
      contract: "Collaboration Agreement",
      user: "Artist A",
      date: "2023-01-05",
      time: "10:00 AM",
    },
    {
      id: "2",
      action: "Contract sent for signature",
      contract: "Royalty Split Agreement",
      user: "Producer X",
      date: "2023-02-16",
      time: "11:30 AM",
    },
    {
      id: "3",
      action: "Contract viewed",
      contract: "Licensing Agreement",
      user: "Label Y",
      date: "2023-03-11",
      time: "02:00 PM",
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Contract
        </Button>
        {!hasSeenOnboarding && (
          <Button onClick={() => setShowSettings(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        )}
      </div>

      {showOnboarding && (
        <ToolOnboarding toolName="Contracts" steps={onboardingSteps} onComplete={completeOnboarding} />
      )}

      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Your Contracts</CardTitle>
                  <CardDescription>Manage your agreements and legal documents.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search contracts..." className="pl-8 w-[200px] md:w-[260px]" />
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
                  <div className="col-span-4">Contract</div>
                  <div className="col-span-2 hidden md:block">Type</div>
                  <div className="col-span-2 hidden md:block">Status</div>
                  <div className="col-span-2 hidden md:block">Created</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {contracts.map((contract) => (
                  <div key={contract.id} className="grid grid-cols-12 gap-2 p-4 border-b items-center text-sm">
                    <div className="col-span-4">
                      <div className="font-medium">{contract.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">Between: {contract.parties.join(", ")}</div>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <Badge variant="outline">{contract.type}</Badge>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <Badge
                        className={
                          contract.status === "Active"
                            ? "bg-green-500"
                            : contract.status === "Pending"
                              ? "bg-amber-500"
                              : "bg-muted"
                        }
                      >
                        {contract.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 hidden md:block text-muted-foreground">
                      {format(new Date(contract.created), "MMM d, yyyy")}
                    </div>
                    <div className="col-span-8 md:col-span-2 flex justify-end md:justify-start gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contract Status</CardTitle>
              <CardDescription>Overview of your contract statuses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">Active</div>
                  <div className="text-2xl font-bold mt-1">2</div>
                  <div className="text-sm mt-2">
                    <span className="text-green-500">&#9679;</span> Up to date
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">Pending</div>
                  <div className="text-2xl font-bold mt-1">1</div>
                  <div className="text-sm mt-2">
                    <span className="text-amber-500">&#9679;</span> Awaiting signature
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">Draft</div>
                  <div className="text-2xl font-bold mt-1">1</div>
                  <div className="text-sm mt-2">
                    <span className="text-gray-500">&#9679;</span> In progress
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Contract Templates</CardTitle>
                  <CardDescription>Start with pre-made templates for common agreements.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search templates..." className="pl-8 w-[200px] md:w-[260px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center mb-2">
                            <FileText className="h-5 w-5 text-brand" />
                          </div>
                          <h3 className="font-medium">{template.title}</h3>
                          <Badge variant="outline" className="mt-1">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex-grow mb-4">{template.description}</p>
                        <Button variant="outline" className="w-full">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track all actions related to your contracts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {activity.action.includes("signed") ? (
                        <Check className="h-5 w-5" />
                      ) : activity.action.includes("sent") ? (
                        <Clock className="h-5 w-5" />
                      ) : activity.action.includes("viewed") ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.contract} by {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(activity.date), "MMMM d, yyyy")} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Create New Contract</CardTitle>
          <CardDescription>Start a new legal agreement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="font-medium mb-2">Collaboration Agreement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define terms for working with other artists or producers
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Create
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="font-medium mb-2">Royalty Split</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define how royalties will be split between collaborators
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Create
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="font-medium mb-2">Licensing Agreement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create terms for licensing your music for commercial use
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Create
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Custom Contract
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
