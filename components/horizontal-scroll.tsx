"use client"

import React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  itemClassName?: string
  showScrollButtons?: boolean
  snapScroll?: boolean
}

export function HorizontalScroll({
  children,
  className,
  itemClassName,
  showScrollButtons = true,
  snapScroll = true,
}: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const isMobile = useMobile()

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  // Wrap children with item class if provided
  const wrappedChildren = itemClassName
    ? React.Children.map(children, (child) => <div className={itemClassName}>{child}</div>)
    : children

  return (
    <div className="relative">
      {showScrollButtons && !isMobile && showLeftButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className={cn("flex overflow-x-auto scrollbar-hide", snapScroll && "scroll-snap-container", className)}
        onScroll={handleScroll}
      >
        {wrappedChildren}
      </div>

      {showScrollButtons && !isMobile && showRightButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
