"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { OnboardingModal } from "./onboarding-modal"

type OnboardingContextType = {
  showOnboarding: boolean
  startOnboarding: () => void
  completeOnboarding: () => void
  currentStep: number
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true) // Default to true to prevent flash
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 5 // Total number of onboarding steps

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompleted = localStorage.getItem("onboardingCompleted") === "true"
    setHasCompletedOnboarding(hasCompleted)

    // Show onboarding for new users
    if (!hasCompleted) {
      setShowOnboarding(true)
    }
  }, [])

  const startOnboarding = () => {
    setCurrentStep(0)
    setShowOnboarding(true)
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("onboardingCompleted", "true")
    setHasCompletedOnboarding(true)
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        showOnboarding,
        startOnboarding,
        completeOnboarding,
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
      {showOnboarding && <OnboardingModal />}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
