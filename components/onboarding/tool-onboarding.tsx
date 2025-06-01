"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ToolOnboardingProps {
  toolName: string
  steps: { title: string; description: string }[]
  onComplete: () => void
}

export function ToolOnboarding({ toolName, steps, onComplete }: ToolOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { toast } = useToast()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      onComplete()
      toast({
        title: `${toolName} Onboarding Complete!`,
        description: "You can revisit this onboarding anytime from the settings.",
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const skipOnboarding = () => {
    onComplete()
    toast({
      title: `${toolName} Onboarding Skipped.`,
      description: "You can start this onboarding anytime from the settings.",
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{toolName} Onboarding</CardTitle>
        <CardDescription>Learn how to use this tool effectively.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
        <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button size="sm" onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={skipOnboarding}>
          Skip Onboarding
        </Button>
      </CardFooter>
    </Card>
  )
}
