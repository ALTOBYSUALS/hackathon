import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export function SuggestedCommunities() {
  const communities = [
    {
      id: 1,
      name: "House Heads",
      members: 4567,
      icon: "/house-heads-icon.png",
      isNew: true,
    },
    {
      id: 2,
      name: "Songwriters Circle",
      members: 3298,
      icon: "/songwriters-circle-icon.png",
      isNew: false,
    },
    {
      id: 3,
      name: "Web3 Music Pioneers",
      members: 2156,
      icon: "/web3-music-icon.png",
      isNew: true,
    },
  ]

  return (
    <div className="space-y-3">
      {communities.map((community) => (
        <div key={community.id} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={community.icon || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{community.name}</p>
              {community.isNew && (
                <Badge variant="outline" className="text-[10px] h-4 bg-primary/10 text-primary border-primary/20">
                  New
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{community.members.toLocaleString()} members</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            Join
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" className="w-full">
        View more
      </Button>
    </div>
  )
}
