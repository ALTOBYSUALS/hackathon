"use client"

import { useState, useEffect } from "react"

interface UseToolOnboardingProps {
  toolName: string
}

export function useToolOnboarding({ toolName }: UseToolOnboardingProps) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true) // Default to true to prevent flash
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasSeen = localStorage.getItem(`${toolName}Onboarding`) === "true"
    setHasSeenOnboarding(hasSeen)

    if (!hasSeen) {
      setShowOnboarding(true)
    }
  }, [toolName])

  const completeOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem(`${toolName}Onboarding`, "true")
    setHasSeenOnboarding(true)
  }

  const startOnboarding = () => {
    setShowOnboarding(true)
  }

  return {
    hasSeenOnboarding,
    showOnboarding,
    completeOnboarding,
    startOnboarding,
  }
}
