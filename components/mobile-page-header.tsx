import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface MobilePageHeaderProps {
  title: string
  backHref?: string
  rightElement?: React.ReactNode
  className?: string
  sticky?: boolean
}

export function MobilePageHeader({ title, backHref, rightElement, className, sticky = true }: MobilePageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3 px-4 bg-background",
        sticky && "sticky top-16 z-10 border-b",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {backHref && (
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={backHref}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {rightElement && <div>{rightElement}</div>}
    </div>
  )
}
