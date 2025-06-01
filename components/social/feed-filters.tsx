import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, Music, Boxes, Calendar, Mic2, Headphones } from "lucide-react"

export function FeedFilters() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Quick Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Filter className="h-3 w-3" />
          <span className="text-xs">More Filters</span>
        </Button>
      </div>

      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 flex items-center gap-1">
            <Music className="h-3 w-3" />
            <span>All</span>
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 flex items-center gap-1">
            <Music className="h-3 w-3" />
            <span>Music</span>
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 flex items-center gap-1">
            <Boxes className="h-3 w-3" />
            <span>NFTs</span>
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Events</span>
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 flex items-center gap-1">
            <Mic2 className="h-3 w-3" />
            <span>Artists</span>
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 flex items-center gap-1">
            <Headphones className="h-3 w-3" />
            <span>Genres</span>
          </Badge>
        </div>
      </ScrollArea>
    </div>
  )
}
