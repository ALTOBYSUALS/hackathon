"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MobileCardProps {
  children?: React.ReactNode
  title?: string
  description?: string
  className?: string
  variant?: "default" | "elevated" | "outlined"
  padding?: "none" | "sm" | "md" | "lg"
  onClick?: () => void
}

export function MobileCard({
  children,
  title,
  description,
  className,
  variant = "default",
  padding = "md",
  onClick,
}: MobileCardProps) {
  const variantClasses = {
    default: "border border-border",
    elevated: "border-0 shadow-lg",
    outlined: "border-2 border-border",
  }

  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  return (
    <Card
      className={cn(
        "w-full transition-all duration-200",
        variantClasses[variant],
        onClick && "cursor-pointer hover:shadow-md active:scale-[0.98]",
        className,
      )}
      onClick={onClick}
    >
      {(title || description) && (
        <CardHeader className={cn("pb-3", paddingClasses[padding])}>
          {title && <CardTitle className="text-lg font-semibold">{title}</CardTitle>}
          {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
      )}
      {children && (
        <CardContent className={cn(title || description ? "pt-0" : "", paddingClasses[padding])}>
          {children}
        </CardContent>
      )}
    </Card>
  )
}
