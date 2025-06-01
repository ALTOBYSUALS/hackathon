import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "House Production Workshop",
      date: "May 17, 2023",
      time: "7:00 PM CET",
      platform: "Discord",
      link: "https://discord.gg/househeads",
    },
    {
      id: 2,
      title: "Live Acoustic Session",
      date: "May 12, 2023",
      time: "8:00 PM EST",
      platform: "YouTube Live",
      link: "https://youtube.com/live/acousticdreams",
    },
    {
      id: 3,
      title: "Web3 Music Meetup",
      date: "May 20, 2023",
      time: "6:30 PM PST",
      platform: "Metaverse",
      link: "https://decentraland.org/events/web3music",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="space-y-2">
          <h4 className="font-medium text-sm">{event.title}</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span>{event.platform}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs" asChild>
            <Link href={event.link} target="_blank" rel="noopener noreferrer">
              Join Event
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
