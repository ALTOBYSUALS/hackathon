"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Music2,
  Upload,
  User,
  Users,
  Menu,
  X,
  ChevronRight,
  Search,
  Bell,
  BarChart3,
  DollarSign,
  Megaphone,
  Boxes,
  PenToolIcon as Tool,
  Sparkles,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function MobileNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Navegación principal organizada por secciones
  const navigationSections = [
    {
      title: "Principal",
      items: [
        { title: "Dashboard", icon: Home, href: "/" },
        { title: "Mi Música", icon: Music2, href: "/music" },
        { title: "Social", icon: Users, href: "/social" },
      ],
    },
    {
      title: "Crear",
      items: [
        { title: "Subir Música", icon: Upload, href: "/music/upload" },
        { title: "Mint NFT", icon: Boxes, href: "/web3/mint", isNew: true },
      ],
    },
    {
      title: "Analíticas",
      items: [
        { title: "Ganancias", icon: DollarSign, href: "/earnings" },
        { title: "Analytics Pro", icon: BarChart3, href: "/analytics" },
      ],
    },
    {
      title: "Marketing",
      items: [
        { title: "Marketing Hub", icon: Megaphone, href: "/marketing" },
        { title: "Promoción", icon: Sparkles, href: "/marketing/promotion" },
      ],
    },
    {
      title: "Web3",
      items: [
        { title: "Web3 Hub", icon: Boxes, href: "/web3" },
        { title: "Gestionar NFTs", icon: Boxes, href: "/web3/manage" },
        { title: "Royalties", icon: DollarSign, href: "/web3/royalties" },
      ],
    },
    {
      title: "Herramientas",
      items: [
        { title: "Herramientas", icon: Tool, href: "/tools" },
        { title: "Oportunidades", icon: Sparkles, href: "/opportunities" },
      ],
    },
  ]

  const bottomItems = [
    { title: "Mi Cuenta", icon: User, href: "/account" },
    { title: "Ayuda", icon: HelpCircle, href: "/help" },
    { title: "Configuración", icon: Settings, href: "/settings" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Header móvil mejorado */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/95 backdrop-blur-md z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-coral-50 hover:text-coral-600"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[320px] p-0 border-r border-border"
              onInteractOutside={() => setIsOpen(false)}
            >
              <div className="flex flex-col h-full">
                {/* Header del menú */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-coral-500 to-coral-400">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm overflow-hidden">
                      <Image 
                        src="/coral-logo-transparent.png" 
                        alt="MUSIC BASE Logo" 
                        width={32} 
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-white">MUSIC BASE</span>
                      <span className="text-xs text-white/80">Neodistro Platform</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Perfil del usuario */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-coral-200">
                      <AvatarImage src="/coral-logo-transparent.png" alt="Usuario" />
                      <AvatarFallback className="bg-coral-600 text-white text-lg font-semibold">DA</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">Demo Artist</span>
                      <span className="text-sm text-muted-foreground">Cuenta Pro</span>
                      <Badge className="mt-1 w-fit bg-coral-100 text-coral-700 hover:bg-coral-200">Verificado</Badge>
                    </div>
                  </div>
                </div>

                {/* Contenido del menú */}
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-6">
                    {navigationSections.map((section) => (
                      <div key={section.title} className="space-y-2">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className={cn(
                                "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                                isActive(item.href)
                                  ? "bg-coral-600 text-white shadow-md"
                                  : "hover:bg-muted text-foreground hover:text-foreground",
                              )}
                              onClick={handleLinkClick}
                            >
                              <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.isNew && (
                                  <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">Nuevo</Badge>
                                )}
                                <ChevronRight className="h-4 w-4 opacity-50" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer del menú */}
                <div className="border-t border-border p-4 space-y-2">
                  {bottomItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-coral-600 text-white"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      )}
                      onClick={handleLinkClick}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLinkClick}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
              <Image 
                src="/coral-logo-transparent.png" 
                alt="MUSIC BASE Logo" 
                width={28} 
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-coral-500 to-coral-400">
              MUSIC BASE
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-coral-50 hover:text-coral-600">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 relative hover:bg-coral-50 hover:text-coral-600">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral-600 text-[10px] text-white font-medium">
              3
            </span>
            <span className="sr-only">Notificaciones</span>
          </Button>
        </div>
      </header>

      {/* Espaciado para el header fijo */}
      <div className="h-16" />
    </>
  )
}
