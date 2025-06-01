"use client"

import { useEffect, useState } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      // Check multiple conditions for mobile detection
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth < 768
      const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0

      // Consider it mobile if any of these conditions are true
      const mobile = isMobileUserAgent || (isSmallScreen && hasTouchScreen) || isSmallScreen
      setIsMobile(mobile)
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    const handleResize = () => {
      checkMobile()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
