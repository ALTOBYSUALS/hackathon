"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ArrowLeft, Music, BarChart3, CircleDollarSign, Boxes, Upload } from "lucide-react"
import { useOnboarding } from "./onboarding-provider"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function OnboardingModal() {
  const { currentStep, totalSteps, nextStep, prevStep, completeOnboarding } = useOnboarding()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const steps = [
    {
      title: "Welcome to SONAR",
      description: "Your all-in-one platform for music distribution, analytics, and promotion.",
      icon: <Music className="h-10 w-10 text-brand-primary" />,
      image: "/abstract-soundscape.png",
    },
    {
      title: "Upload & Distribute Your Music",
      description: "Upload your tracks and distribute them to all major streaming platforms with just a few clicks.",
      icon: <Upload className="h-10 w-10 text-brand-primary" />,
      image: "/electronic-album-cover.png",
    },
    {
      title: "Track Your Performance",
      description: "Get detailed analytics on streams, listeners, and earnings across all platforms.",
      icon: <BarChart3 className="h-10 w-10 text-brand-primary" />,
      image: "/abstract-geometric-shapes.png",
    },
    {
      title: "Manage Your Earnings",
      description: "Track your revenue and set up royalty splits with collaborators.",
      icon: <CircleDollarSign className="h-10 w-10 text-brand-primary" />,
      image: "/diverse-group-profile.png",
    },
    {
      title: "Explore Web3 Opportunities",
      description: "Mint your music as NFTs and explore new revenue streams in the Web3 space.",
      icon: <Boxes className="h-10 w-10 text-brand-primary" />,
      image: "/abstract-nft-concept.png",
    },
  ]

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-gray-900"
        >
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10" onClick={completeOnboarding}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div
              className="relative h-48 overflow-hidden rounded-t-xl md:h-full md:rounded-l-xl md:rounded-tr-none"
              style={{
                backgroundImage: `url(${currentStepData.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2">
                <div className="rounded-full bg-white/10 p-3 backdrop-blur-md">{currentStepData.icon}</div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="mb-2 text-2xl font-bold">{currentStepData.title}</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">{currentStepData.description}</p>

              <div className="mb-6">
                <Progress value={progress} className="h-2" />
                <div className="mt-2 text-right text-sm text-gray-500">
                  Step {currentStep + 1} of {totalSteps}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                <div className="flex gap-2">
                  <Button variant="ghost" onClick={completeOnboarding}>
                    Skip
                  </Button>

                  <Button onClick={nextStep} className="gap-1 bg-brand-primary hover:bg-brand-primary/90">
                    {currentStep === totalSteps - 1 ? "Get Started" : "Next"}
                    {currentStep !== totalSteps - 1 && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
