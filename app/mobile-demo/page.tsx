"use client"

import { MobilePageContainer } from "@/components/mobile-page-container"
import { MobileCard } from "@/components/mobile-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Heart, Share, TrendingUp, Music, Users } from "lucide-react"

export default function MobileDemoPage() {
  return (
    <MobilePageContainer>
      <div className="space-y-6">
        {/* Header de bienvenida */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido a livre!</h1>
          <p className="text-muted-foreground">Tu plataforma de música descentralizada</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-4">
          <MobileCard className="text-center" padding="sm">
            <div className="flex flex-col items-center gap-2">
              <Music className="h-6 w-6 text-purple-600" />
              <div className="text-lg font-bold">24</div>
              <div className="text-xs text-muted-foreground">Canciones</div>
            </div>
          </MobileCard>
          <MobileCard className="text-center" padding="sm">
            <div className="flex flex-col items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              <div className="text-lg font-bold">1.2K</div>
              <div className="text-xs text-muted-foreground">Seguidores</div>
            </div>
          </MobileCard>
          <MobileCard className="text-center" padding="sm">
            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <div className="text-lg font-bold">$342</div>
              <div className="text-xs text-muted-foreground">Este mes</div>
            </div>
          </MobileCard>
        </div>

        {/* Acciones rápidas */}
        <MobileCard title="Acciones Rápidas">
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-12 bg-purple-600 hover:bg-purple-700">
              <Music className="h-4 w-4 mr-2" />
              Subir Música
            </Button>
            <Button variant="outline" className="h-12">
              <Share className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </MobileCard>

        {/* Feed de actividad */}
        <MobileCard title="Actividad Reciente">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>LW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Luna Waves</span>
                  <Badge variant="secondary" className="text-xs">
                    NFT
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Acaba de lanzar un nuevo single</p>
              </div>
              <Button size="sm" variant="ghost">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">DJ Horizon</span>
                  <Badge variant="secondary" className="text-xs">
                    Música
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Compartió un remix</p>
              </div>
              <Button size="sm" variant="ghost">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </MobileCard>

        {/* Trending */}
        <MobileCard title="Tendencias" description="Lo más popular ahora">
          <div className="space-y-3">
            {["#NewMusic", "#ElectronicVibes", "#IndieArtist", "#Web3Music"].map((tag, index) => (
              <div key={tag} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                  <span className="font-medium">{tag}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {Math.floor(Math.random() * 100)}K posts
                </Badge>
              </div>
            ))}
          </div>
        </MobileCard>
      </div>
    </MobilePageContainer>
  )
}
