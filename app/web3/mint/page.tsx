"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Info, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

export default function MintNFT() {
  const [selectedRelease, setSelectedRelease] = useState("")
  const [nftTitle, setNftTitle] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [supplyType, setSupplyType] = useState("unique")
  const [supplyAmount, setSupplyAmount] = useState(10)
  const [mintPrice, setMintPrice] = useState("5")
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10)
  const [useExistingRelease, setUseExistingRelease] = useState(true)

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

  const selectedReleaseData = releases.find((release) => release.id === selectedRelease)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/web3">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Mint Music NFT</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>NFT Source</CardTitle>
              <CardDescription>Choose the music content for your NFT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="use-existing" checked={useExistingRelease} onCheckedChange={setUseExistingRelease} />
                <Label htmlFor="use-existing">Use existing release from My Music</Label>
              </div>

              {useExistingRelease ? (
                <div className="space-y-4">
                  <Select value={selectedRelease} onValueChange={setSelectedRelease}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a release" />
                    </SelectTrigger>
                    <SelectContent>
                      {releases.map((release) => (
                        <SelectItem key={release.id} value={release.id}>
                          {release.title} ({release.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedRelease && (
                    <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/20">
                      <Image
                        src={selectedReleaseData?.coverArt || "/placeholder.svg"}
                        alt={selectedReleaseData?.title || "Release cover"}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{selectedReleaseData?.title}</h3>
                        <p className="text-sm text-muted-foreground">{selectedReleaseData?.artist}</p>
                        <p className="text-sm text-muted-foreground">{selectedReleaseData?.type}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="audio-file">Audio File</Label>
                      <div className="mt-1 flex items-center justify-center border border-dashed rounded-md h-32">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <div className="mt-2 flex text-sm">
                            <label
                              htmlFor="audio-file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-brand hover:text-brand-dark"
                            >
                              <span>Upload audio file</span>
                              <input
                                id="audio-file-upload"
                                name="audio-file-upload"
                                type="file"
                                className="sr-only"
                                accept="audio/*"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-muted-foreground">WAV, MP3, or FLAC up to 50MB</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cover-art">Cover Art</Label>
                      <div className="mt-1 flex items-center justify-center border border-dashed rounded-md h-32">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <div className="mt-2 flex text-sm">
                            <label
                              htmlFor="cover-art-upload"
                              className="relative cursor-pointer rounded-md font-medium text-brand hover:text-brand-dark"
                            >
                              <span>Upload image</span>
                              <input
                                id="cover-art-upload"
                                name="cover-art-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-muted-foreground">PNG, JPG, or GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NFT Details</CardTitle>
              <CardDescription>Configure the details of your music NFT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nft-title">NFT Title</Label>
                <Input
                  id="nft-title"
                  placeholder="Enter NFT title"
                  value={nftTitle}
                  onChange={(e) => setNftTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nft-description">Description</Label>
                <Textarea
                  id="nft-description"
                  placeholder="Describe your NFT, its uniqueness, and what buyers will receive"
                  value={nftDescription}
                  onChange={(e) => setNftDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="indie">Indie</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Exclusivity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exclusivity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (Streaming Available)</SelectItem>
                      <SelectItem value="exclusive">Exclusive (NFT Holders Only)</SelectItem>
                      <SelectItem value="limited">Limited (Early Access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Supply Type</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Unique: One-of-a-kind NFT (1/1)
                          <br />
                          Limited: Fixed number of identical NFTs
                          <br />
                          Open: Unlimited supply until mint end date
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <RadioGroup value={supplyType} onValueChange={setSupplyType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unique" id="unique" />
                    <Label htmlFor="unique">Unique (1/1)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limited" id="limited" />
                    <Label htmlFor="limited">Limited Edition</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open">Open Edition</Label>
                  </div>
                </RadioGroup>
              </div>

              {supplyType === "limited" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Edition Size: {supplyAmount}</Label>
                    <span className="text-sm text-muted-foreground">{supplyAmount} NFTs</span>
                  </div>
                  <Slider
                    value={[supplyAmount]}
                    min={2}
                    max={1000}
                    step={1}
                    onValueChange={(value) => setSupplyAmount(value[0])}
                  />
                </div>
              )}

              {supplyType === "open" && (
                <div className="space-y-2">
                  <Label>Mint End Date</Label>
                  <Input type="date" min={new Date().toISOString().split("T")[0]} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Royalties</CardTitle>
              <CardDescription>Set the price and royalty terms for your NFT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mint-price">Mint Price (SUI)</Label>
                  <div className="flex items-center">
                    <Input
                      id="mint-price"
                      type="number"
                      min="0"
                      step="0.1"
                      value={mintPrice}
                      onChange={(e) => setMintPrice(e.target.value)}
                    />
                    <Select defaultValue="sui">
                      <SelectTrigger className="w-[110px] ml-2">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sui">SUI</SelectItem>
                        <SelectItem value="usdc">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estimated value: ${(Number.parseFloat(mintPrice || "0") * 1.25).toFixed(2)} USD
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Secondary Market Royalty: {royaltyPercentage}%</Label>
                    <span className="text-sm text-muted-foreground">{royaltyPercentage}%</span>
                  </div>
                  <Slider
                    value={[royaltyPercentage]}
                    min={0}
                    max={15}
                    step={0.5}
                    onValueChange={(value) => setRoyaltyPercentage(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll receive {royaltyPercentage}% of the sale price for all secondary market sales
                  </p>
                </div>
              </div>

              <div className="rounded-md border p-4 bg-muted/20">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Royalty Enforcement</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  SUI's royalty protocol ensures that creators receive their specified royalty percentage on all
                  secondary sales across supported marketplaces.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>NFT Preview</CardTitle>
              <CardDescription>How your NFT will appear on marketplaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg overflow-hidden border">
                <div className="aspect-square bg-muted relative">
                  {selectedReleaseData ? (
                    <Image
                      src={selectedReleaseData.coverArt || "/placeholder.svg"}
                      alt={selectedReleaseData.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      <span className="text-muted-foreground">Cover Art Preview</span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-medium">
                    {nftTitle || (selectedReleaseData ? selectedReleaseData.title : "NFT Title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedReleaseData ? selectedReleaseData.artist : "Artist Name"}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {supplyType === "unique"
                        ? "Unique 1/1"
                        : supplyType === "limited"
                          ? `Limited Edition (${supplyAmount})`
                          : "Open Edition"}
                    </span>
                    <span className="text-sm font-medium">{mintPrice || "0"} SUI</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Estimated Fees</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Fee (estimated)</span>
                    <span>0.01 SUI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee (2.5%)</span>
                    <span>{((Number.parseFloat(mintPrice || "0") * 2.5) / 100).toFixed(2)} SUI</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>You Receive (per NFT)</span>
                    <span>
                      {(
                        Number.parseFloat(mintPrice || "0") -
                        (Number.parseFloat(mintPrice || "0") * 2.5) / 100 -
                        0.01
                      ).toFixed(2)}{" "}
                      SUI
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full bg-brand hover:bg-brand-dark text-white">Mint NFT on SUI Network</Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/web3">Cancel</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
