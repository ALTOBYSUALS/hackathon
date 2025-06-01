import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Share2, Diamond, Link2, Calendar, MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function UserProfilePage({ params }) {
  // En una implementación real, obtendríamos los datos del usuario basados en el username
  const username = params.username
  const user = {
    name: "Luna Waves",
    username: "lunawaves",
    bio: "Artista independiente | Productora | Web3 Enthusiast | Creando música desde el alma para el futuro",
    avatar: "/abstract-lw.png",
    coverImage: "/abstract-soundscape.png",
    followers: 12453,
    following: 342,
    isVerified: true,
    location: "Barcelona, España",
    website: "lunawaves.io",
    joinedDate: "Marzo 2022",
    nftBadge: "/abstract-nft-concept.png",
  }

  return (
    <div className="container px-4 py-6 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col gap-6">
        {/* Portada y perfil */}
        <div className="relative">
          <div className="h-48 md:h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={user.coverImage || "/placeholder.svg"}
              alt="Portada"
              className="object-cover w-full h-full"
              width={1200}
              height={300}
            />
          </div>

          <div className="absolute -bottom-16 left-6 flex items-end">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2">
                  <div className="relative h-10 w-10">
                    <Image
                      src={user.nftBadge || "/placeholder.svg"}
                      alt="NFT Badge"
                      className="object-cover rounded-full"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute right-6 bottom-6">
            <Button className="bg-gradient-primary">Seguir</Button>
          </div>
        </div>

        {/* Información del perfil */}
        <div className="mt-16 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.isVerified && (
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                  NFT Verificado
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>

          <p className="max-w-2xl">{user.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-1">
                <Link2 className="h-4 w-4" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  {user.website}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {user.joinedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Se unió en {user.joinedDate}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 text-sm">
            <div className="font-medium">
              <span className="font-bold">{user.following.toLocaleString()}</span> Siguiendo
            </div>
            <div className="font-medium">
              <span className="font-bold">{user.followers.toLocaleString()}</span> Seguidores
            </div>
          </div>
        </div>

        {/* Pestañas de contenido */}
        <Tabs defaultValue="posts" className="w-full mt-4">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="posts">Publicaciones</TabsTrigger>
            <TabsTrigger value="music">Música</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="about">Acerca de</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <ScrollArea className="h-[calc(100vh-480px)]">
              <div className="space-y-4 pr-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={{ ...post, author: user }} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="music" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map((track) => (
                <Card key={track.id}>
                  <div className="flex items-center p-4 gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={track.coverArt || "/placeholder.svg"}
                        alt={track.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{track.album}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs text-muted-foreground">{track.plays} reproducciones</div>
                        <div className="text-xs text-muted-foreground">{track.duration}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nfts" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nfts.map((nft) => (
                <Card key={nft.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{nft.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-muted-foreground">{nft.edition}</div>
                      <div className="flex items-center gap-1">
                        <Diamond className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{nft.price} ETH</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Biografía</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Luna Waves es una artista independiente y productora musical con base en Barcelona, España. Fusiona
                  elementos de música electrónica, ambient y pop experimental para crear paisajes sonoros únicos.
                </p>
                <p>
                  Desde 2022, ha estado explorando activamente el espacio Web3, tokenizando su música como NFTs y
                  construyendo una comunidad de fans que apoyan directamente su trabajo creativo.
                </p>
                <h4 className="font-medium mt-4">Géneros</h4>
                <div className="flex flex-wrap gap-2">
                  {["Electrónica", "Ambient", "Pop Experimental", "Downtempo", "Chillwave"].map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-medium mt-4">Plataformas</h4>
                <div className="flex flex-wrap gap-4">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center gap-2">
                      <div className="relative h-6 w-6">
                        <Image
                          src={platform.icon || "/placeholder.svg"}
                          alt={platform.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm">{platform.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PostCard({ post }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.author.name}</span>
              <span className="text-sm text-muted-foreground">@{post.author.username}</span>
            </div>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="whitespace-pre-wrap">{post.content}</p>

        {post.track && (
          <div className="mt-3 rounded-md overflow-hidden border bg-card">
            <div className="flex items-center p-3 gap-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={post.track.coverArt || "/placeholder.svg"}
                  alt={post.track.title}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{post.track.title}</p>
                <p className="text-sm text-muted-foreground truncate">{post.track.artist}</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardContent className="border-t pt-3">
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Heart className={`h-4 w-4 ${post.liked ? "fill-destructive text-destructive" : ""}`} />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            <span className="text-xs">{post.shares}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Diamond className="h-4 w-4" />
            <span className="text-xs">{post.tips}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Datos de ejemplo
const posts = [
  {
    id: 1,
    content: "¡Acabo de lanzar mi nuevo single! Escúchenlo en todas las plataformas y díganme qué les parece 🎵✨",
    timestamp: "hace 2h",
    likes: 245,
    comments: 37,
    shares: 18,
    tips: 5,
    liked: true,
    track: {
      title: "Midnight Dreams",
      artist: "Luna Waves",
      coverArt: "/midnight-dreams-album-cover.png",
    },
  },
  {
    id: 2,
    content:
      "Trabajando en algo especial para ustedes. La próxima semana tendremos grandes noticias. #NuevoProyecto #Web3Music",
    timestamp: "hace 1d",
    likes: 189,
    comments: 24,
    shares: 7,
    tips: 3,
    liked: false,
  },
  {
    id: 3,
    content:
      "Gracias a todos los que asistieron a mi concierto virtual anoche. ¡Fue increíble verlos a todos en el metaverso! Pronto compartiré algunas capturas del evento.",
    timestamp: "hace 3d",
    likes: 312,
    comments: 42,
    shares: 28,
    tips: 15,
    liked: false,
  },
]

const tracks = [
  {
    id: 1,
    title: "Midnight Dreams",
    album: "Ethereal Journeys",
    coverArt: "/midnight-dreams-album-cover.png",
    plays: "124.5K",
    duration: "3:42",
  },
  {
    id: 2,
    title: "Digital Horizon",
    album: "Ethereal Journeys",
    coverArt: "/electronic-album-cover.png",
    plays: "98.2K",
    duration: "4:15",
  },
  {
    id: 3,
    title: "Ocean Waves",
    album: "Ambient Reflections",
    coverArt: "/acoustic-sessions-album-cover.png",
    plays: "76.8K",
    duration: "5:21",
  },
  {
    id: 4,
    title: "Neon Lights",
    album: "Urban Nights",
    coverArt: "/pop-album-cover.png",
    plays: "203.1K",
    duration: "3:18",
  },
]

const nfts = [
  {
    id: 1,
    title: "Sonic Dreamscape #001",
    image: "/abstract-geometric-shapes.png",
    edition: "Edición 1 de 10",
    price: 0.5,
  },
  {
    id: 2,
    title: "Ethereal Vibrations #003",
    image: "/abstract-nft-concept.png",
    edition: "Edición 3 de 5",
    price: 0.8,
  },
  {
    id: 3,
    title: "Midnight Pulse #007",
    image: "/abstract-soundscape.png",
    edition: "Edición 7 de 7",
    price: 1.2,
  },
]

const platforms = [
  {
    name: "Spotify",
    icon: "/spotify-app-interface.png",
  },
  {
    name: "SoundCloud",
    icon: "/soundcloud-logo.png",
  },
  {
    name: "Deezer",
    icon: "/deezer-logo.png",
  },
  {
    name: "OpenSea",
    icon: "/abstract-ocean-market.png",
  },
]
