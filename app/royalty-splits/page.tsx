"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Info, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

export default function RoyaltySplitsPage() {
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Primary Artist", percentage: 70 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Featured Artist", percentage: 20 },
  ])

  const totalPercentage = collaborators.reduce((sum, collab) => sum + collab.percentage, 0)
  const remainingPercentage = 100 - totalPercentage

  const addCollaborator = () => {
    if (remainingPercentage <= 0) return

    const newId = collaborators.length > 0 ? Math.max(...collaborators.map((c) => c.id)) + 1 : 1
    setCollaborators([
      ...collaborators,
      { id: newId, name: "", email: "", role: "Songwriter", percentage: remainingPercentage },
    ])
  }

  const removeCollaborator = (id: number) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  const updateCollaborator = (id: number, field: string, value: string | number) => {
    setCollaborators(collaborators.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center">
        <Button variant="outline" size="icon" className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Royalty Splits Configuration</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Configure Royalty Splits</CardTitle>
            <CardDescription>
              Specify how royalties should be distributed among collaborators for this release.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <Image
                  src="/electronic-album-cover.png"
                  width={150}
                  height={150}
                  alt="Album cover"
                  className="rounded-md object-cover"
                />
              </div>
              <div className="space-y-2 flex-1">
                <h2 className="text-xl font-semibold">Midnight Dreams</h2>
                <p className="text-sm text-muted-foreground">EP • 6 tracks</p>
                <p className="text-sm text-muted-foreground">Released: April 15, 2023</p>
                <div className="flex items-center mt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Info className="h-4 w-4 mr-1" />
                          What are royalty splits?
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Royalty splits determine how earnings from your music are distributed among collaborators. The
                          total must equal 100%.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Collaborators</h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm ${
                      remainingPercentage === 0
                        ? "text-green-600"
                        : remainingPercentage > 0
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  >
                    {remainingPercentage === 0
                      ? "100% Allocated"
                      : remainingPercentage > 0
                        ? `${remainingPercentage}% Remaining`
                        : "Over-allocated"}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Progress
                  value={totalPercentage}
                  className={`h-2 ${
                    totalPercentage > 100 ? "bg-red-200" : totalPercentage === 100 ? "bg-green-200" : "bg-amber-200"
                  }`}
                />
              </div>

              <div className="space-y-4">
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.id}
                    className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_2fr_auto] gap-4 items-center border p-4 rounded-md"
                  >
                    <div>
                      <Label htmlFor={`name-${collaborator.id}`} className="sr-only">
                        Name
                      </Label>
                      <Input
                        id={`name-${collaborator.id}`}
                        placeholder="Name"
                        value={collaborator.name}
                        onChange={(e) => updateCollaborator(collaborator.id, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`email-${collaborator.id}`} className="sr-only">
                        Email
                      </Label>
                      <Input
                        id={`email-${collaborator.id}`}
                        placeholder="Email"
                        type="email"
                        value={collaborator.email}
                        onChange={(e) => updateCollaborator(collaborator.id, "email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${collaborator.id}`} className="sr-only">
                        Role
                      </Label>
                      <Select
                        value={collaborator.role}
                        onValueChange={(value) => updateCollaborator(collaborator.id, "role", value)}
                      >
                        <SelectTrigger id={`role-${collaborator.id}`}>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Primary Artist">Primary Artist</SelectItem>
                          <SelectItem value="Featured Artist">Featured Artist</SelectItem>
                          <SelectItem value="Producer">Producer</SelectItem>
                          <SelectItem value="Songwriter">Songwriter</SelectItem>
                          <SelectItem value="Composer">Composer</SelectItem>
                          <SelectItem value="Mixer">Mixer</SelectItem>
                          <SelectItem value="Engineer">Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`percentage-${collaborator.id}`} className="text-sm">
                          Percentage
                        </Label>
                        <span className="text-sm font-medium">{collaborator.percentage}%</span>
                      </div>
                      <Slider
                        id={`percentage-${collaborator.id}`}
                        min={1}
                        max={100}
                        step={1}
                        value={[collaborator.percentage]}
                        onValueChange={(value) => updateCollaborator(collaborator.id, "percentage", value[0])}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCollaborator(collaborator.id)}
                      disabled={collaborators.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-4" onClick={addCollaborator} disabled={remainingPercentage <= 0}>
                <Plus className="mr-2 h-4 w-4" />
                Add Collaborator
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button disabled={totalPercentage !== 100}>Save Configuration</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Split Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: `hsl(${collaborator.id * 60}, 70%, 50%)`,
                        }}
                      />
                      <span className="text-sm font-medium">
                        {collaborator.name || `Collaborator ${collaborator.id}`}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{collaborator.percentage}%</span>
                  </div>
                ))}

                {remainingPercentage > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-300" />
                      <span className="text-sm font-medium text-muted-foreground">Unallocated</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{remainingPercentage}%</span>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>{totalPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <p>Royalty splits determine how earnings from your music are distributed among collaborators.</p>
              <p>The total percentage must equal exactly 100% before you can save this configuration.</p>
              <p>All collaborators will receive an email notification about their split percentage.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
