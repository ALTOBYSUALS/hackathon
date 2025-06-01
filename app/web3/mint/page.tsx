"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Info, Upload, Wallet, AlertCircle, Sparkles, Music, DollarSign, Shield } from "lucide-react"

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function MintNFT() {
  const [selectedRelease, setSelectedRelease] = useState("")
  const [nftTitle, setNftTitle] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [royaltyPercentageToTokenize, setRoyaltyPercentageToTokenize] = useState([25])
  const [royaltyCoinSupply, setRoyaltyCoinSupply] = useState(10000)
  const [suggestedPrice, setSuggestedPrice] = useState("0.10")
  const [walletConnected, setWalletConnected] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [mintingInProgress, setMintingInProgress] = useState(false)
  const [useExistingRelease, setUseExistingRelease] = useState(true)

  // Sample data for existing releases
  const releases = [
    {
      id: "1",
      title: "Midnight Dreams",
      artist: "Your Artist Name",
      coverArt: "/electronic-album-cover.png",
      type: "Single",
      streams: 125000,
      monthlyGrowth: 15,
      estimatedRevenue: "$3,200",
      isTokenized: false,
      ipfsHash: "QmX7Y8Z9...",
    },
    {
      id: "2", 
      title: "Urban Vibes",
      artist: "Your Artist Name ft. MC Flow",
      coverArt: "/hip-hop-album-cover.png",
      type: "EP",
      streams: 89000,
      monthlyGrowth: 8,
      estimatedRevenue: "$2,100",
      isTokenized: false,
      ipfsHash: "QmA1B2C3...",
    },
    {
      id: "3",
      title: "Acoustic Sessions",
      artist: "Your Artist Name",
      coverArt: "/indie-album-cover.png", 
      type: "Album",
      streams: 45000,
      monthlyGrowth: 22,
      estimatedRevenue: "$1,800",
      isTokenized: true,
      ipfsHash: "QmD4E5F6...",
    },
  ]

  const selectedReleaseData = releases.find((release) => release.id === selectedRelease)

  // AI-powered suggestions based on selected release
  useEffect(() => {
    if (selectedReleaseData) {
      setNftTitle(`${selectedReleaseData.title} - SongNFT`)
      setNftDescription(`Exclusive ownership NFT for "${selectedReleaseData.title}". Holders of this SongNFT can participate in future RoyaltyCoin distributions and receive transparent royalty payments directly to their wallet.`)
      
      // AI suggestion for price based on performance
      const basePrice = selectedReleaseData.streams > 100000 ? 0.15 : 
                       selectedReleaseData.streams > 50000 ? 0.10 : 0.05
      const growthMultiplier = 1 + (selectedReleaseData.monthlyGrowth / 100)
      setSuggestedPrice((basePrice * growthMultiplier).toFixed(3))
    }
  }, [selectedReleaseData])

  const connectWallet = () => {
    // Simulamos conexión a MetaMask/Talisman para Moonbeam
    setWalletConnected(true)
  }

  const handleMintNFT = async () => {
    if (!selectedReleaseData || !walletConnected) return
    
    setMintingInProgress(true)
    setCurrentStep(2)
    
    // Simulamos el proceso de minting
    setTimeout(() => {
      setCurrentStep(3)
      setTimeout(() => {
        setCurrentStep(4)
        setMintingInProgress(false)
      }, 2000)
    }, 3000)
  }

  const availableReleases = releases.filter(release => !release.isTokenized)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/web3">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Tokenize Your Music</h1>
          <p className="text-muted-foreground">Create SongNFT + RoyaltyCoin on Polkadot</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: "Select Music", icon: Music },
              { step: 2, title: "Smart Contract Deploy", icon: Sparkles },
              { step: 3, title: "SongVault Setup", icon: Shield },
              { step: 4, title: "Ready to Trade", icon: DollarSign },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className="text-sm mt-2">{title}</span>
              </div>
            ))}
          </div>
          {mintingInProgress && (
            <div className="mt-4">
              <Progress value={(currentStep - 1) * 33} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">Creating your music assets on Polkadot...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {!walletConnected && (
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle>Connect Polkadot Wallet</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Connect MetaMask or Talisman to Moonbeam network to continue</span>
            <Button onClick={connectWallet} size="sm" className="bg-blue-500 hover:bg-blue-600">
              Connect Wallet
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-blue-500" />
                Select Music to Tokenize
              </CardTitle>
              <CardDescription>Choose a song from your catalog to create SongNFT + RoyaltyCoin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedRelease} onValueChange={setSelectedRelease}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an untokenized release" />
                </SelectTrigger>
                <SelectContent>
                  {availableReleases.map((release) => (
                    <SelectItem key={release.id} value={release.id}>
                      {release.title} ({release.type}) - {release.streams.toLocaleString()} streams
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedRelease && (
                <div className="p-4 border rounded-md bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={selectedReleaseData?.coverArt || "/placeholder.svg"}
                      alt={selectedReleaseData?.title || "Release cover"}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedReleaseData?.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedReleaseData?.artist}</p>
                      <div className="flex gap-4 mt-2">
                        <Badge variant="outline">{selectedReleaseData?.streams.toLocaleString()} streams</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          +{selectedReleaseData?.monthlyGrowth}% growth
                        </Badge>
                        <Badge variant="outline">{selectedReleaseData?.estimatedRevenue} est. revenue</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Tokenization Configuration
              </CardTitle>
              <CardDescription>Configure how much of your royalties to tokenize</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Percentage of Royalties to Tokenize</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This percentage of your net royalties will be distributed to RoyaltyCoin holders</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={royaltyPercentageToTokenize}
                    onValueChange={setRoyaltyPercentageToTokenize}
                    max={50}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>10% (Conservative)</span>
                    <span className="font-medium text-foreground">{royaltyPercentageToTokenize[0]}%</span>
                    <span>50% (Aggressive)</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>RoyaltyCoin Supply</Label>
                  <Input
                    type="number"
                    value={royaltyCoinSupply}
                    onChange={(e) => setRoyaltyCoinSupply(Number(e.target.value))}
                    placeholder="10000"
                  />
                  <p className="text-xs text-muted-foreground">Total RoyaltyCoins that will be minted</p>
                </div>

                <div className="space-y-2">
                  <Label>AI Suggested Initial Price</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={suggestedPrice}
                      onChange={(e) => setSuggestedPrice(e.target.value)}
                      placeholder="0.10"
                    />
                    <span className="text-sm text-muted-foreground">USDC</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Based on streams and growth metrics</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nft-title">SongNFT Title</Label>
                <Input
                  id="nft-title"
                  placeholder="Enter NFT title"
                  value={nftTitle}
                  onChange={(e) => setNftTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nft-description">SongNFT Description</Label>
                <Textarea
                  id="nft-description"
                  placeholder="Describe the NFT and what holders receive"
                  value={nftDescription}
                  onChange={(e) => setNftDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Tokenization Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedReleaseData ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Song:</span>
                      <span className="font-medium">{selectedReleaseData.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Royalty %:</span>
                      <span className="font-medium">{royaltyPercentageToTokenize[0]}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>RoyaltyCoins:</span>
                      <span className="font-medium">{royaltyCoinSupply.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Initial Price:</span>
                      <span className="font-medium">{suggestedPrice} USDC</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">What will be created:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>SongNFT (ERC-721)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>RoyaltyCoin (ERC-20)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>SongVault Contract</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={handleMintNFT}
                    disabled={!walletConnected || mintingInProgress}
                  >
                    {mintingInProgress ? "Creating Assets..." : "Tokenize Music"}
                  </Button>

                  {currentStep === 4 && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Success!</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Your music has been tokenized on Polkadot. Check Web3 > Manage NFTs to view your assets.
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select a release to see tokenization summary</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
