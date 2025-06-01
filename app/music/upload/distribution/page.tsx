"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Check, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

export default function DistributionPage() {
  const [selectedStores, setSelectedStores] = useState<string[]>(["all"])
  const [selectedTerritories, setSelectedTerritories] = useState<string>("worldwide")
  const [releaseDate, setReleaseDate] = useState<Date | undefined>(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)) // 2 weeks from now
  const [enablePreOrder, setEnablePreOrder] = useState(false)
  const [contentId, setContentId] = useState(true)
  const [publishingAdmin, setPublishingAdmin] = useState(false)
  const [aiMastering, setAiMastering] = useState(false)
  const [mintAsNFT, setMintAsNFT] = useState(false)
  const [enableOnChainRoyalties, setEnableOnChainRoyalties] = useState(false)

  const stores = [
    { id: "spotify", name: "Spotify", logo: "/spotify-logo.png" },
    { id: "apple", name: "Apple Music", logo: "/apple-music-logo.png" },
    { id: "amazon", name: "Amazon Music", logo: "/amazon-music-logo.png" },
    { id: "youtube", name: "YouTube Music", logo: "/youtube-music-logo.png" },
    { id: "tidal", name: "Tidal", logo: "/tidal-logo.png" },
    { id: "deezer", name: "Deezer", logo: "/deezer-logo.png" },
    { id: "pandora", name: "Pandora", logo: "/pandora-logo.png" },
    { id: "tiktok", name: "TikTok", logo: "/tiktok-logo.png" },
  ]

  const handleStoreSelection = (storeId: string) => {
    if (storeId === "all") {
      setSelectedStores(["all"])
      return
    }

    // If "all" is currently selected, remove it
    let newSelection = selectedStores.filter((id) => id !== "all")

    // Toggle the selected store
    if (newSelection.includes(storeId)) {
      newSelection = newSelection.filter((id) => id !== storeId)
    } else {
      newSelection.push(storeId)
    }

    // If no stores are selected, default to "all"
    if (newSelection.length === 0) {
      newSelection = ["all"]
    }

    setSelectedStores(newSelection)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/music/upload/track-details">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Distribution & Extras</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Step 3 of 3</div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Progress value={100} className="h-2 bg-gray-100" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Release Information</span>
              <span>Track Details</span>
              <span className="font-medium text-brand">Distribution & Extras</span>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Store Selection</CardTitle>
              <CardDescription>Choose where you want your music to be available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-stores"
                    checked={selectedStores.includes("all")}
                    onCheckedChange={() => handleStoreSelection("all")}
                  />
                  <Label htmlFor="all-stores" className="font-medium">
                    All Stores (Recommended)
                  </Label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {stores.map((store) => (
                    <div
                      key={store.id}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        selectedStores.includes("all") || selectedStores.includes(store.id)
                          ? "border-brand/50 bg-brand/5"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      onClick={() => handleStoreSelection(store.id)}
                    >
                      <div className="h-12 w-12 relative mb-2">
                        <Image
                          src={store.logo || "/placeholder.svg"}
                          alt={store.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium">{store.name}</span>
                      {(selectedStores.includes("all") || selectedStores.includes(store.id)) && (
                        <div className="absolute top-2 right-2 h-4 w-4 bg-brand rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Territories</CardTitle>
              <CardDescription>Choose where your music will be distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedTerritories} onValueChange={setSelectedTerritories} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="worldwide" id="worldwide" />
                  <Label htmlFor="worldwide">Worldwide (Recommended)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific">Specific Territories</Label>
                </div>
              </RadioGroup>

              {selectedTerritories === "specific" && (
                <div className="mt-4 p-4 border rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">
                    Contact support to set up specific territory distribution.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Release Date</CardTitle>
              <CardDescription>When should your music be available to the public?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>Release Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {releaseDate ? format(releaseDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={releaseDate}
                        onSelect={setReleaseDate}
                        initialFocus
                        disabled={(date) => date < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // Minimum 1 week from now
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">
                    Minimum 7 days from today for proper distribution to all platforms
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="pre-order" checked={enablePreOrder} onCheckedChange={setEnablePreOrder} />
                  <Label htmlFor="pre-order">Enable Pre-Order/Pre-Save</Label>
                </div>

                {enablePreOrder && (
                  <div className="pl-6 space-y-2">
                    <Label htmlFor="pre-order-tracks">Instant Gratification Tracks</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Select tracks that will be available immediately when pre-ordering
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="track-1" />
                        <Label htmlFor="track-1" className="text-sm">
                          Track 1 - Summer Nights
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="track-2" />
                        <Label htmlFor="track-2" className="text-sm">
                          Track 2 - Midnight Dreams
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
              <CardDescription>Enhance your release with these extra services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="content-id" checked={contentId} onCheckedChange={setContentId} />
                    <div>
                      <Label htmlFor="content-id">YouTube Content ID</Label>
                      <p className="text-xs text-muted-foreground">Monetize and protect your music on YouTube</p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Content ID scans YouTube for your music and allows you to monetize or block unauthorized uses.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="publishing" checked={publishingAdmin} onCheckedChange={setPublishingAdmin} />
                    <div>
                      <Label htmlFor="publishing">Publishing Administration</Label>
                      <p className="text-xs text-muted-foreground">Collect your publishing royalties worldwide</p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Our publishing administration service collects mechanical and performance royalties globally.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-mastering" checked={aiMastering} onCheckedChange={setAiMastering} />
                    <div>
                      <Label htmlFor="ai-mastering">AI Mastering</Label>
                      <p className="text-xs text-muted-foreground">Professional sound quality with AI technology</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-brand">$9.99 per track</div>
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="mint-nft" checked={mintAsNFT} onCheckedChange={setMintAsNFT} />
                    <div>
                      <Label htmlFor="mint-nft">Mint as NFT on SUI Network</Label>
                      <p className="text-xs text-muted-foreground">Create an NFT of this release upon publishing</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/web3/mint">Configure</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="on-chain-royalties"
                      checked={enableOnChainRoyalties}
                      onCheckedChange={setEnableOnChainRoyalties}
                    />
                    <div>
                      <Label htmlFor="on-chain-royalties">Enable On-Chain Royalty Splits</Label>
                      <p className="text-xs text-muted-foreground">Set up transparent royalty splits on SUI</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/web3/royalties">Configure</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Review your release details before submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Image
                    src="/pop-album-cover.png"
                    width={80}
                    height={80}
                    alt="Album cover"
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Midnight Dreams</h3>
                    <p className="text-sm text-muted-foreground">EP • 2 tracks</p>
                    <p className="text-sm text-muted-foreground">
                      Release Date: {releaseDate ? format(releaseDate, "PPP") : "Not set"}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">All Stores</span>
                      <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">Worldwide</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Selected Services</h4>
                  <ul className="space-y-1">
                    <li className="text-sm flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Distribution to all major platforms
                    </li>
                    {contentId && (
                      <li className="text-sm flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        YouTube Content ID
                      </li>
                    )}
                    {publishingAdmin && (
                      <li className="text-sm flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Publishing Administration
                      </li>
                    )}
                    {aiMastering && (
                      <li className="text-sm flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        AI Mastering ($19.98 for 2 tracks)
                      </li>
                    )}
                    {mintAsNFT && (
                      <li className="text-sm flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Mint as NFT on SUI Network
                      </li>
                    )}
                    {enableOnChainRoyalties && (
                      <li className="text-sm flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        On-Chain Royalty Splits
                      </li>
                    )}
                  </ul>
                </div>

                {aiMastering && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>$19.98</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/music/upload/track-details">Previous Step</Link>
                </Button>
                <Button variant="outline">Save Draft</Button>
              </div>
              <Button className="bg-brand hover:bg-brand-dark text-white">Submit for Review</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
