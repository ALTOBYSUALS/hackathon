"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  HelpCircle,
  Home,
  Menu,
  Music,
  Settings,
  PenToolIcon as Tool,
  User,
  DollarSign,
  Megaphone,
  Sparkles,
  Boxes,
  Users,
  Music2,
  TrendingUp,
  Target,
  FileText,
} from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

export function MainSidebar() {
  const pathname = usePathname()
  const { expanded, setExpanded } = useSidebar()
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "My Music", icon: Music, path: "/music" },
    { name: "Earnings", icon: DollarSign, path: "/earnings" },
    {
      name: "Analytics Pro",
      icon: BarChart3,
      path: "/analytics",
      subItems: [
        { name: "Overview", icon: TrendingUp, path: "/analytics/overview" },
        { name: "Audience", icon: Users, path: "/analytics/audience" },
        { name: "Performance", icon: Target, path: "/analytics/performance" },
        { name: "Reports", icon: FileText, path: "/analytics/reports" },
      ],
    },
    { name: "Marketing Hub", icon: Megaphone, path: "/marketing" },
    { name: "Social", icon: Users, path: "/social" },
    { name: "Web3 Hub", icon: Boxes, path: "/web3" },
    { name: "Tools", icon: Tool, path: "/tools" },
    { name: "Opportunities", icon: Sparkles, path: "/opportunities" },
    { name: "Account", icon: User, path: "/account" },
    { name: "Help", icon: HelpCircle, path: "/help" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        expanded ? "w-64" : "w-16",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {expanded ? (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-md overflow-hidden flex items-center justify-center">
              <Image 
                src="/sonar-icon.png" 
                alt="SONAR Logo" 
                width={32} 
                height={32}
                className="object-contain"
              />
            </div>
            <span className="sonar-logo-text">
              SONAR
            </span>
          </Link>
        ) : (
          <Link href="/" className="flex-1 flex justify-center">
            <div className="h-8 w-8 rounded-md overflow-hidden flex items-center justify-center">
              <Image 
                src="/sonar-icon.png" 
                alt="SONAR Logo" 
                width={32} 
                height={32}
                className="object-contain"
              />
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="h-8 w-8 flex-shrink-0"
        >
          {expanded ? (
            <Menu className="h-5 w-5" />
          ) : (
            <div className="h-5 w-5 relative">
              <Image 
                src="/sonar-icon.png" 
                alt="SONAR Logo" 
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => {
            if (item.subItems) {
              const isActive = item.subItems.some((subItem) => pathname.startsWith(subItem.path))
              return (
                <div key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setIsAnalyticsExpanded(!isAnalyticsExpanded)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive || isAnalyticsExpanded
                            ? "bg-brand text-brand-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {expanded && <span>{item.name}</span>}
                      </button>
                    </TooltipTrigger>
                    {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                  </Tooltip>
                  {isAnalyticsExpanded && expanded && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isSubItemActive = pathname.startsWith(subItem.path)
                        return (
                          <Tooltip key={subItem.name}>
                            <TooltipTrigger asChild>
                              <Link
                                href={subItem.path}
                                className={cn(
                                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                  isSubItemActive
                                    ? "bg-brand text-brand-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                              >
                                <subItem.icon className="h-5 w-5" />
                                <span>{subItem.name}</span>
                              </Link>
                            </TooltipTrigger>
                            {!expanded && <TooltipContent side="right">{subItem.name}</TooltipContent>}
                          </Tooltip>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            const isActive = pathname.startsWith(item.path)
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand text-brand-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {expanded && <span>{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>
      <div className="border-t p-2"></div>
    </div>
  )
}
