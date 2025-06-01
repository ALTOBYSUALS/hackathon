import { Badge } from "@/components/ui/badge"
import { TrendingUp, Music, Boxes, Mic2, Calendar } from "lucide-react"

export function TrendingTopics() {
  const trendingTopics = [
    {
      tag: "Web3Music",
      posts: 1243,
      type: "web3",
    },
    {
      tag: "ElectronicProducers",
      posts: 876,
      type: "genre",
    },
    {
      tag: "NFTArtists",
      posts: 654,
      type: "web3",
    },
    {
      tag: "MusicDAOs",
      posts: 521,
      type: "web3",
    },
    {
      tag: "SummerTour2023",
      posts: 432,
      type: "event",
    },
  ]

  const getTopicIcon = (type: string) => {
    switch (type) {
      case "web3":
        return <Boxes className="h-4 w-4 text-primary" />
      case "genre":
        return <Music className="h-4 w-4 text-primary" />
      case "artist":
        return <Mic2 className="h-4 w-4 text-primary" />
      case "event":
        return <Calendar className="h-4 w-4 text-primary" />
      default:
        return <TrendingUp className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="space-y-3">
      {trendingTopics.map((topic) => (
        <div key={topic.tag} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTopicIcon(topic.type)}
            <span className="text-sm font-medium">#{topic.tag}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {topic.posts} posts
          </Badge>
        </div>
      ))}
    </div>
  )
}
