"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { MusicBaseSidebar } from "@/components/music-base-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useMobile } from "@/hooks/use-mobile"

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  // Prevenir mismatch de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mostrar loading mientras se monta
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600"></div>
      </div>
    )
  }

  return (
    <>
      {isMobile ? (
        <>
          <MobileNavigation />
          <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 max-w-4xl">{children}</div>
          </main>
        </>
      ) : (
        <MusicBaseSidebar>{children}</MusicBaseSidebar>
      )}
    </>
  )
}
