"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Info, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RoyaltiesPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [selectedRelease, setSelectedRelease] = useState("")
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "You (Primary Artist)", wallet: "0x7a5d2ff7b5c8c9f0e4f48e9b0b0b0b0b0b0b0b0b", percentage: 70 },
    { id: 2, name: "", wallet: "", percentage: 30 },
  ])

  // Sample data for existing releases
  const releases = [
    {
      id: "1",
      title: "Midnight Dreams",
      artist: "Your Artist Name",
      coverArt: "/electronic-album-cover.png",
      type: "Single",
    },
    {
      id: "2",
      title: "Urban Vibes",
      artist: "Your Artist Name ft. MC Flow",
      coverArt: "/hip-hop-album-cover.png",
      type: "EP",
    },
    {
      id: "3",
      title: "Acoustic Sessions",
      artist: "Your Artist Name",
      coverArt: "/indie-album-cover.png",
      type: "Album",
    },
  ]

  // Sample data for existing royalty contracts
  const existingContracts = [
    {
      id: 1,
      release: {
        title: "Midnight Dreams",
        artist: "Your Artist Name",
        coverArt: "/electronic-album-cover.png",
      },
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      deployDate: "2023-05-20",
      collaborators: [
        { name: "You (Primary Artist)", wallet: "0x7a5d...b0b0b", percentage: 70 },
        { name: "Featured Artist", wallet: "0x8b6e...c1d1d", percentage: 20 },
        { name: "Producer", wallet: "0x9c7f...d2e2e", percentage: 10 },
      ],
      totalDistributed: "45.5 SUI",
      lastDistribution: "2024-04-15",
    },
    {
      id: 2,
      release: {
        title: "Urban Vibes",
        artist: "Your Artist Name ft. MC Flow",
        coverArt: "/hip-hop-album-cover.png",
      },
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      deployDate: "2023-09-05",
      collaborators: [
        { name: "You (Primary Artist)", wallet: "0x7a5d...b0b0b", percentage: 60 },
        { name: "MC Flow", wallet: "0x8b6e...c1d1d", percentage: 30 },
        { name: "Producer", wallet: "0x9c7f...d2e2e", percentage: 10 },
      ],
      totalDistributed: "120.75 SUI",
      lastDistribution: "2024-05-01",
    },
  ]

  const selectedReleaseData = releases.find((release) => release.id === selectedRelease)

  const addCollaborator = () => {
    const totalPercentage = collaborators.reduce((sum, collab) => sum + collab.percentage, 0)
    if (totalPercentage >= 100) return

    const newPercentage = 100 - totalPercentage > 0 ? 100 - totalPercentage : 0
    setCollaborators([...collaborators, { id: Date.now(), name: "", wallet: "", percentage: newPercentage }])
  }

  const removeCollaborator = (id: number) => {
    if (collaborators.length <= 2) return
    const filtered = collaborators.filter((collab) => collab.id !== id)
    setCollaborators(filtered)
  }

  const updateCollaborator = (id: number, field: string, value: string | number) => {
    const updated = collaborators.map((collab) => {
      if (collab.id === id) {
        return { ...collab, [field]: value }
      }
      return collab
    })
    setCollaborators(updated)
  }

  const totalPercentage = collaborators.reduce((sum, collab) => sum + collab.percentage, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/web3">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">On-Chain Royalties</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="existing">My Royalty Contracts</TabsTrigger>
          <TabsTrigger value="create">Create New Royalty Contract</TabsTrigger>
        </TabsList>

        <TabsContent value="existing" className="mt-6 space-y-6">
          {existingContracts.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
              <p className="text-lg font-medium">No royalty contracts found</p>
              <p className="text-sm text-muted-foreground">Create your first on-chain royalty contract</p>
              <Button className="mt-4 bg-brand hover:bg-brand-dark text-white" onClick={() => setActiveTab("create")}>
                Create New Contract
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {existingContracts.map((contract) => (
                <Card key={contract.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="flex-shrink-0">
                        <Image
                          src={contract.release.coverArt || "/placeholder.svg"}
                          alt={contract.release.title}
                          width={120}
                          height={120}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">{contract.release.title}</h3>
                          <p className="text-sm text-muted-foreground">{contract.release.artist}</p>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Contract Address:</span>{" "}
                            <span className="font-mono">
                              {contract.contractAddress.substring(0, 6)}...
                              {contract.contractAddress.substring(contract.contractAddress.length - 4)}
                            </span>
                            <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Deployed:</span>{" "}
                            {new Date(contract.deployDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Distributed:</span>{" "}
                            {contract.totalDistributed}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Distribution:</span>{" "}
                            {new Date(contract.lastDistribution).toLocaleDateString()}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Collaborators</h4>
                          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {contract.collaborators.map((collab, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border bg-muted/20 px-3 py-2"
                              >
                                <div>
                                  <div className="font-medium">{collab.name}</div>
                                  <div className="text-xs text-muted-foreground">{collab.wallet}</div>
                                </div>
                                <Badge className="bg-brand/10 text-brand">{collab.percentage}%</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/20 p-4 flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://explorer.sui.io/object/${contract.contractAddress}`} target="_blank">
                        View on Explorer
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-brand hover:bg-brand-dark text-white">
                      View Distribution History
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Royalty Contract</CardTitle>
              <CardDescription>
                Set up transparent on-chain royalty splits for your music on the SUI network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="release-select">Select Release</Label>
                <Select value={selectedRelease} onValueChange={setSelectedRelease}>
                  <SelectTrigger id="release-select">
                    <SelectValue placeholder="Choose a release" />
                  </SelectTrigger>
                  <SelectContent>
                    {releases.map((release) => (
                      <SelectItem key={release.id} value={release.id}>
                        {release.title} ({release.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedReleaseData && (
                <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/20">
                  <Image
                    src={selectedReleaseData.coverArt || "/placeholder.svg"}
                    alt={selectedReleaseData.title}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{selectedReleaseData.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedReleaseData.artist}</p>
                    <p className="text-sm text-muted-foreground">{selectedReleaseData.type}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Collaborator Splits</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Add all collaborators who should receive royalties. The total percentage must equal 100%. Once
                          deployed, these splits cannot be changed.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-4">
                  {collaborators.map((collab, index) => (
                    <div key={collab.id} className="flex items-end gap-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`name-${collab.id}`}>Name/Role</Label>
                        <Input
                          id={`name-${collab.id}`}
                          value={collab.name}
                          onChange={(e) => updateCollaborator(collab.id, "name", e.target.value)}
                          placeholder="Collaborator name or role"
                          disabled={index === 0}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`wallet-${collab.id}`}>SUI Wallet Address</Label>
                        <Input
                          id={`wallet-${collab.id}`}
                          value={collab.wallet}
                          onChange={(e) => updateCollaborator(collab.id, "wallet", e.target.value)}
                          placeholder="0x..."
                          disabled={index === 0}
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <Label htmlFor={`percentage-${collab.id}`}>Percentage</Label>
                        <div className="flex items-center">
                          <Input
                            id={`percentage-${collab.id}`}
                            type="number"
                            min="1"
                            max="100"
                            value={collab.percentage}
                            onChange={(e) =>
                              updateCollaborator(collab.id, "percentage", Number.parseInt(e.target.value) || 0)
                            }
                          />
                          <span className="ml-2">%</span>
                        </div>
                      </div>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCollaborator(collab.id)}
                          className="mb-2"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" onClick={addCollaborator} disabled={totalPercentage >= 100}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Collaborator
                    </Button>
                    <div
                      className={`text-sm font-medium ${totalPercentage === 100 ? "text-green-600" : "text-red-600"}`}
                    >
                      Total: {totalPercentage}%
                    </div>
                  </div>
                </div>

                <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Once deployed, this royalty contract cannot be modified. The splits are permanently recorded on the
                    SUI blockchain for transparency and trust.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 p-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/web3">Cancel</Link>
              </Button>
              <Button
                className="bg-brand hover:bg-brand-dark text-white"
                disabled={totalPercentage !== 100 || !selectedRelease}
              >
                Deploy Smart Contract on SUI Network
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
