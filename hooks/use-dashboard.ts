"use client"

import { useState, useEffect } from "react"

// Define types for dashboard data
export interface DashboardData {
  earnings: number
  streams: number
  releases: number
  platforms: number
  platformData: {
    name: string
    streams: number
    color: string
  }[]
  recentReleases: {
    title: string
    type: string
    releaseDate: string
    status: "live" | "review"
    coverImage: string
  }[]
}

export function useDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DashboardData>({
    earnings: 4231.89,
    streams: 1200000,
    releases: 24,
    platforms: 12,
    platformData: [
      { name: "Spotify", streams: 450000, color: "bg-green-500" },
      { name: "Apple Music", streams: 320000, color: "bg-red-500" },
      { name: "Amazon Music", streams: 180000, color: "bg-blue-500" },
      { name: "YouTube Music", streams: 150000, color: "bg-yellow-500" },
      { name: "Others", streams: 100000, color: "bg-coral-500" },
    ],
    recentReleases: [
      {
        title: "Summer Nights",
        type: "Single",
        releaseDate: "2 days ago",
        status: "live",
        coverImage: "/abstract-soundscape.png",
      },
      {
        title: "Midnight Dreams",
        type: "EP",
        releaseDate: "1 week ago",
        status: "live",
        coverImage: "/electronic-album-cover.png",
      },
      {
        title: "Urban Echoes",
        type: "Album",
        releaseDate: "2 weeks ago",
        status: "review",
        coverImage: "/hip-hop-album-cover.png",
      },
    ],
  })

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return {
    isLoading,
    data,
    refreshData,
  }
}

// Export default for compatibility
export default useDashboard
