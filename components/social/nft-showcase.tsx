import { Button } from "@/components/ui/button"
import { Diamond, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function NFTShowcase() {
  const nfts = [
    {
      id: 1,
      title: "Sonic Dreamscape #001",
      image: "/abstract-geometric-shapes.png",
      artist: "Luna Waves",
      price: 0.5,
    },
    {
      id: 2,
      title: "Ethereal Vibrations #003",
      image: "/abstract-nft-concept.png",
      artist: "Neon Pulse",
      price: 0.8,
    },
  ]

  return (
    <div className="space-y-4">
      {nfts.map((nft) => (
        <div key={nft.id} className="space-y-2">
          <div className="relative aspect-square rounded-md overflow-hidden">
            <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <h4 className="font-medium text-sm text-white">{nft.title}</h4>
              <p className="text-xs text-white/80">by {nft.artist}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Diamond className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">{nft.price} ETH</span>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                View
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
      <Button variant="ghost" size="sm" className="w-full">
        View more NFTs
      </Button>
    </div>
  )
}
