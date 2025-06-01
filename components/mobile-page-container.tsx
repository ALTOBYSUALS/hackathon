"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface MobilePageContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

export function MobilePageContainer({
  children,
  className,
  maxWidth = "lg",
  padding = "md",
}: MobilePageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full",
  }

  const paddingClasses = {
    none: "",
    sm: "px-2 py-2",
    md: "px-4 py-4",
    lg: "px-6 py-6",
  }

  return (
    <div className={cn("w-full mx-auto", maxWidthClasses[maxWidth], paddingClasses[padding], className)}>
      {children}
    </div>
  )
}
