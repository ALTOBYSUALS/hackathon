"use client"

import { useState } from "react"
import { MobilePageContainer } from "@/components/mobile-page-container"
import { MobileCard } from "@/components/mobile-card"
import { MobilePageHeader } from "@/components/mobile-page-header"
import { MobileTabs } from "@/components/mobile-tabs"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { MobileActionButton } from "@/components/mobile-action-button"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { MobileBottomSheet } from "@/components/mobile-bottom-sheet"
import { GestureHandler } from "@/components/gesture-handler"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Heart, Share, Bell, Search, Mic, ImageIcon, FileMusic } from "lucide-react"

export default function MobileDashboardPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const handleRefresh = async () => {
    // Simulate a refresh
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 1500)
    })
  }

  const actionItems = [
    {
      icon: <FileMusic className="h-5 w-5" />,
      label: "Upload Track",
      onClick: () => console.log("Upload Track"),
      color: "bg-purple-600 text-white",
    },
    {
      icon: <Mic className="h-5 w-5" />,
      label: "Record Audio",
      onClick: () => console.log("Record Audio"),
      color: "bg-pink-600 text-white",
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      label: "Add Cover Art",
      onClick: () => console.log("Add Cover Art"),
      color: "bg-blue-600 text-white",
    },
  ]

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <MobilePageContainer noPadding>
        <MobilePageHeader
          title="Discover"
          rightElement={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                  3
                </span>
              </Button>
            </div>
          }
        />

        <MobileTabs
          tabs={[
            { id: "trending", label: "Trending" },
            { id: "new", label: "New Releases" },
            { id: "recommended", label: "For You" },
            { id: "genres", label: "Genres" },
          ]}
          defaultTabId="trending"
          onChange={setActiveTab}
          className="mb-4"
        />

        <div className="px-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Featured Artists</h2>
          <HorizontalScroll className="gap-4 pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-20 flex-shrink-0">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/abstract-geometric-shapes.png`} alt={`Artist ${i}`} />
                  <AvatarFallback className="bg-purple-600 text-white">A{i}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-center">Artist {i}</span>
              </div>
            ))}
          </HorizontalScroll>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Popular Tracks</h2>
            <Button variant="link" size="sm" className="text-purple-600">
              See All
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <GestureHandler
                key={i}
                onSwipeLeft={() => console.log(`Like track ${i}`)}
                onSwipeRight={() => console.log(`Share track ${i}`)}
              >
                <MobileCard fullWidth noPadding className="overflow-hidden">
                  <div className="flex items-center p-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                      <img
                        src={`/abstract-geometric-shapes.png`}
                        alt={`Track ${i}`}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">Track Title {i}</h3>
                      <p className="text-xs text-muted-foreground truncate">Artist Name • Album Name</p>
                    </div>
                    <div className="flex items-center gap-3 ml-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </MobileCard>
              </GestureHandler>
            ))}
          </div>
        </div>

        <div className="px-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">New Releases</h2>
          <HorizontalScroll className="gap-3 pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-40 flex-shrink-0">
                <div className="relative h-40 w-40 rounded-md overflow-hidden mb-2">
                  <img
                    src={`/abstract-geometric-shapes.png`}
                    alt={`Album ${i}`}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h3 className="font-medium text-sm truncate">Album Title {i}</h3>
                <p className="text-xs text-muted-foreground truncate">Artist Name</p>
              </div>
            ))}
          </HorizontalScroll>
        </div>

        <div className="px-4 mb-20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="link" size="sm" className="text-purple-600">
              See All
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <MobileCard key={i} fullWidth>
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={`/abstract-geometric-shapes.png`} alt={`User ${i}`} />
                    <AvatarFallback className="bg-purple-600 text-white">U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">User {i}</span>
                      <span className="text-muted-foreground"> commented on your track</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                      This track is amazing! Love the beat and the vocals.
                    </div>
                  </div>
                </div>
              </MobileCard>
            ))}
          </div>
        </div>

        <MobileActionButton items={actionItems} />

        <Button
          onClick={() => setIsBottomSheetOpen(true)}
          className="fixed bottom-28 left-4 bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Open Player
        </Button>

        <MobileBottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} height="70vh">
          <div className="flex flex-col h-full">
            <div className="relative h-64 w-full mb-4">
              <img
                src="/abstract-geometric-shapes.png"
                alt="Album Cover"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">Track Title</h2>
              <p className="text-muted-foreground">Artist Name</p>
            </div>

            <div className="mb-6">
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 w-1/3" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                <Heart className="h-6 w-6" />
              </Button>
              <Button size="icon" className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                <Play className="h-8 w-8" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                <Share className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </MobileBottomSheet>
      </MobilePageContainer>
    </PullToRefresh>
  )
}
