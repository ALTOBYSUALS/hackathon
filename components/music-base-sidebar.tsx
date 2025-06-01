"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  CircleDollarSign,
  Cog,
  HelpCircle,
  Home,
  Lightbulb,
  Menu,
  Music2,
  Sparkles,
  User,
  Boxes,
  LogOut,
  Upload,
  ListMusic,
  Disc3,
  Zap,
  Megaphone,
  Share2,
  FileText,
  Settings,
  Bell,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar,
  Layers,
  PieChart,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Shield,
  CreditCard,
  Clock,
  MessageSquare,
  BookOpen,
  LifeBuoy,
  Trophy,
  Video,
  Heart,
} from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

export function MusicBaseSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const isMobile = useMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if we're on mobile and adjust sidebar
  useEffect(() => {
    if (isMobile) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [isMobile])

  const navigationItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Discover",
      icon: Music2,
      href: "/discover",
      isNew: true,
    },
    {
      title: "My Music",
      icon: Music2,
      href: "/music",
      subItems: [
        { title: "Catalog", icon: ListMusic, href: "/music" },
        { title: "Upload", icon: Upload, href: "/music/upload" },
        { title: "Track Details", icon: FileText, href: "/music/upload/track-details" },
        { title: "Metadata", icon: Layers, href: "/music/upload/metadata" },
        { title: "Distribution", icon: Globe, href: "/music/upload/distribution" },
        { title: "Releases", icon: Disc3, href: "/releases" },
      ],
    },
    {
      title: "Earnings",
      icon: CircleDollarSign,
      href: "/earnings",
      subItems: [
        { title: "Overview", icon: PieChart, href: "/earnings" },
        { title: "Royalty Splits", icon: Users, href: "/earnings/royalty-splits" },
        { title: "Payment History", icon: Clock, href: "/earnings/history" },
        { title: "Tax Info", icon: FileText, href: "/earnings/tax" },
      ],
    },
    {
      title: "Analytics Pro",
      icon: BarChart3,
      href: "/analytics",
      subItems: [
        { title: "Overview", icon: TrendingUp, href: "/analytics" },
        { title: "Audience", icon: Users, href: "/analytics/audience" },
        { title: "Performance", icon: Target, href: "/analytics/performance" },
        { title: "Reports", icon: FileText, href: "/analytics/reports" },
      ],
    },
    {
      title: "Marketing Hub",
      icon: Sparkles,
      href: "/marketing",
      subItems: [
        { title: "Smart Links", icon: Share2, href: "/marketing/smart-links" },
        { title: "Promotion", icon: Megaphone, href: "/marketing/promotion" },
        { title: "Social Media", icon: Globe, href: "/marketing/social" },
        { title: "Campaigns", icon: Target, href: "/marketing/campaigns" },
        { title: "Release Planner", icon: Calendar, href: "/marketing/planner" },
      ],
    },
    {
      title: "Social",
      icon: Users,
      href: "/social",
      subItems: [
        { title: "Feed", icon: ListMusic, href: "/social" },
        { title: "My Profile", icon: User, href: "/social/artistname" },
        { title: "Discover", icon: Globe, href: "/social/discover" },
        { title: "Notifications", icon: Bell, href: "/social/notifications" },
        { title: "Saved Posts", icon: Heart, href: "/social/saved" },
      ],
      isNew: true,
    },
    {
      title: "Web3 Hub",
      icon: Boxes,
      href: "/web3",
      subItems: [
        { title: "Dashboard", icon: Home, href: "/web3" },
        { title: "Mint NFT", icon: Disc3, href: "/web3/mint" },
        { title: "Manage NFTs", icon: ListMusic, href: "/web3/manage" },
        { title: "Royalties", icon: CircleDollarSign, href: "/web3/royalties" },
        { title: "Wallet", icon: Wallet, href: "/web3/wallet" },
        { title: "Marketplace", icon: Globe, href: "/web3/marketplace" },
      ],
      isNew: true,
    },
    {
      title: "Tools",
      icon: Cog,
      href: "/tools",
      subItems: [
        { title: "Distribution", icon: Share2, href: "/tools/distribution" },
        { title: "Contracts", icon: FileText, href: "/tools/contracts" },
        { title: "Settings", icon: Settings, href: "/tools/settings" },
        { title: "API Access", icon: Shield, href: "/tools/api" },
        { title: "Integrations", icon: Layers, href: "/tools/integrations" },
      ],
    },
    {
      title: "Opportunities",
      icon: Lightbulb,
      href: "/opportunities",
      subItems: [
        { title: "All Opportunities", icon: Lightbulb, href: "/opportunities" },
        { title: "Collaborations", icon: Users, href: "/opportunities/collaborations" },
        { title: "Sync Licensing", icon: Music2, href: "/opportunities/sync" },
        { title: "Contests", icon: Trophy, href: "/opportunities/contests" },
        { title: "Grants", icon: CircleDollarSign, href: "/opportunities/grants" },
      ],
    },
    {
      title: "Account",
      icon: User,
      href: "/account",
      subItems: [
        { title: "Profile", icon: User, href: "/account" },
        { title: "Subscription", icon: Zap, href: "/account?tab=subscription" },
        { title: "Payment Methods", icon: CreditCard, href: "/account?tab=payment" },
        { title: "Security", icon: Shield, href: "/account?tab=security" },
        { title: "Notifications", icon: Bell, href: "/account?tab=notifications" },
      ],
    },
    {
      title: "Help",
      icon: HelpCircle,
      href: "/help",
      subItems: [
        { title: "Support Center", icon: LifeBuoy, href: "/help" },
        { title: "Documentation", icon: BookOpen, href: "/help/docs" },
        { title: "Tutorials", icon: Video, href: "/help/tutorials" },
        { title: "Contact Support", icon: MessageSquare, href: "/help/contact" },
        { title: "FAQ", icon: HelpCircle, href: "/help/faq" },
      ],
    },
  ]

  // Function to check if a path is active
  const isActive = (item: any, pathname: string) => {
    if (item.subItems) {
      // For parent items, check if the parent's href is active or any of its sub-items are active
      const isParentActive = item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href + "/"));
      const isSubItemActive = item.subItems.some((subItem: any) =>
        subItem.href === pathname ||
        (pathname.includes("?tab=") && subItem.href === pathname.split("?")[0]) ||
        (subItem.href !== "/" && pathname.startsWith(subItem.href + "/"))
      );
      return isParentActive || isSubItemActive;
    } else {
      // For regular items, use the existing logic
      if (item.href === "/") {
        return pathname === "/";
      }
      return pathname === item.href || pathname.startsWith(item.href + "/");
    }
  };

  // Function to toggle submenu
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})

  // Initialize open submenus based on current path
  useEffect(() => {
    const initialOpenSubMenus: Record<string, boolean> = {}
    navigationItems.forEach((item) => {
      if (item.subItems && isActive(item, pathname)) {
        initialOpenSubMenus[item.title] = true
      }
    })
    setOpenSubMenus(initialOpenSubMenus)
  }, [pathname])

  const toggleSubMenu = (title: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Get current page title
  const getCurrentPageTitle = () => {
    for (const item of navigationItems) {
      if (item.subItems) {
        const subItem = item.subItems.find(
          (sub) =>
            sub.href === pathname ||
            (pathname.includes("?tab=") && sub.href === pathname.split("?")[0]) ||
            (sub.href !== "/" && pathname.startsWith(sub.href + "/")),
        )
        if (subItem) return subItem.title
      }
    }

    const mainItem = navigationItems.find(
      (item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href + "/")),
    )
    return mainItem?.title || "Dashboard"
  }

  // Mobile navigation items
  const mobileNavItems = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Music", icon: Music2, href: "/music" },
    { title: "Social", icon: Users, href: "/social" },
    { title: "Upload", icon: Upload, href: "/music/upload" },
    { title: "Account", icon: User, href: "/account" },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.div
          className={cn(
            "hidden md:flex h-full flex-col border-r border-border bg-card z-30",
            expanded ? "w-64" : "w-20",
          )}
          animate={{ width: expanded ? "16rem" : "5rem" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.div
                  key="full-logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                    <Image 
                      src="/sonar-icon.png" 
                      alt="SONAR" 
                      width={40} 
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="sonar-logo-text">
                    SONAR
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="icon-logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden mx-auto"
                >
                  <Image 
                    src="/sonar-icon.png" 
                    alt="SONAR" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(!expanded)}
              className="h-8 w-8 flex-shrink-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <TooltipProvider delayDuration={0}>
              <nav className="space-y-1 p-3">
                {navigationItems.map((item) => {
                  const active = isActive(item, pathname)
                  const hasSubItems = item.subItems && item.subItems.length > 0
                  const isSubMenuOpen = openSubMenus[item.title]

                  return (
                    <div key={item.title} className="relative">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {hasSubItems ? (
                            <button
                              onClick={(e) => toggleSubMenu(item.title, e)}
                              className={cn(
                                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted",
                                active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                              )}
                            >
                              <item.icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />
                              {expanded && (
                                <>
                                  <span className="whitespace-nowrap flex-1 text-left">{item.title}</span>
                                  {item.isNew && (
                                    <Badge className="ml-auto bg-coral-600 text-white text-xs">New</Badge>
                                  )}
                                  {isSubMenuOpen ? (
                                    <ChevronUp className="h-4 w-4 flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                  )}
                                </>
                              )}
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted",
                                active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                              )}
                            >
                              <item.icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />
                              {expanded && (
                                <>
                                  <span className="whitespace-nowrap">{item.title}</span>
                                  {item.isNew && (
                                    <Badge className="ml-auto bg-coral-600 text-white text-xs">New</Badge>
                                  )}
                                </>
                              )}
                            </Link>
                          )}
                        </TooltipTrigger>
                        {!expanded && (
                          <TooltipContent side="right" className="flex items-center gap-2">
                            {item.title}
                            {item.isNew && <Badge className="bg-coral-600 text-white text-xs">New</Badge>}
                          </TooltipContent>
                        )}
                      </Tooltip>

                      {/* Submenu */}
                      {hasSubItems && expanded && (
                        <AnimatePresence>
                          {isSubMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-10 pr-2 mt-1 space-y-1"
                            >
                              {item.subItems.map((subItem) => {
                                const subActive =
                                  subItem.href === pathname ||
                                  (pathname.includes("?tab=") && subItem.href === pathname.split("?")[0]) ||
                                  (subItem.href !== "/" && pathname.startsWith(subItem.href + "/"))

                                return (
                                  <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                                      subActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                    )}
                                  >
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                  </Link>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  )
                })}
              </nav>
            </TooltipProvider>
          </div>

          {/* User Profile */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted cursor-pointer",
                      expanded ? "justify-start" : "justify-center",
                    )}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                      <AvatarFallback className="bg-coral-600 text-white">SN</AvatarFallback>
                    </Avatar>
                    {expanded && (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Demo Artist</span>
                        <span className="text-xs text-muted-foreground">Pro Account</span>
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {expanded && <ThemeToggle />}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            {/* Mobile Menu Button */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] max-w-[350px] p-0">
                  <SheetHeader className="border-b border-border p-4">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
                        <Image 
                          src="/sonar-icon.png" 
                          alt="SONAR" 
                          width={32} 
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="sonar-logo-text">
                        SONAR
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="flex-1 p-4">
                    <nav className="space-y-1">
                      {navigationItems.map((item) => (
                        <SheetClose key={item.title} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted"
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                            {item.isNew && <Badge className="ml-auto bg-coral-600 text-white text-xs">New</Badge>}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </ScrollArea>
                  <div className="border-t border-border p-4">
                    <Button variant="outline" className="w-full" size="sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <div className="flex items-center gap-2">
              {isMobile && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
                  <Image 
                    src="/sonar-icon.png" 
                    alt="SONAR" 
                    width={32} 
                    height={32}
                    className="object-contain"
                  />
                </div>
              )}
              <h1 className="text-xl font-semibold">{getCurrentPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral-600 text-[10px] text-white">
                  3
                </span>
              </Button>

              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <Link href="/help">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Support
                </Link>
              </Button>

              <Button
                className="bg-gradient-to-r from-coral-500 to-coral-400 hover:opacity-90 transition-opacity"
                size="sm"
                asChild
              >
                <Link href="/music/upload">
                  <Upload className={cn("h-4 w-4", isMobile ? "" : "mr-2")} />
                  {!isMobile && <span>Upload Music</span>}
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm z-40">
            <div className="flex items-center justify-around h-16">
              {mobileNavItems.map((item) => {
                const active = isActive(item, pathname)
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 mb-1", active && "text-primary")} />
                    <span>{item.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
