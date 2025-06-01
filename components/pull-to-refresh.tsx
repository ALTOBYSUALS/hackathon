"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  className?: string
}

export function PullToRefresh({ children, onRefresh, className }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const pullStartY = useRef(0)
  const pullMoveY = useRef(0)
  const distanceThreshold = 80
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable pull to refresh at the top of the page
    if (window.scrollY === 0) {
      pullStartY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return

    pullMoveY.current = e.touches[0].clientY - pullStartY.current

    // Only allow pulling down, not up
    if (pullMoveY.current <= 0) {
      setIsPulling(false)
      return
    }

    // Prevent default scrolling when pulling
    if (pullMoveY.current > 10) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    if (pullMoveY.current > distanceThreshold) {
      // Trigger refresh
      setRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      } finally {
        setRefreshing(false)
      }
    }

    setIsPulling(false)
    pullStartY.current = 0
    pullMoveY.current = 0
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        animate={{
          y: isPulling ? Math.min(pullMoveY.current / 2, distanceThreshold) : 0,
          opacity: isPulling ? Math.min(pullMoveY.current / distanceThreshold, 1) : 0,
        }}
        className="flex items-center justify-center h-16 w-full absolute top-0 transform -translate-y-full"
      >
        {refreshing ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <div className="text-sm text-muted-foreground">
            {pullMoveY.current > distanceThreshold ? "Release to refresh" : "Pull down to refresh"}
          </div>
        )}
      </motion.div>

      <motion.div animate={{ y: refreshing ? 40 : 0 }} transition={{ type: "spring", damping: 30, stiffness: 200 }}>
        {children}
      </motion.div>
    </div>
  )
}
