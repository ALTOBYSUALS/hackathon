"use client"

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Play, Pause, Music, Upload, BarChart3, CircleDollarSign, ArrowRight, Globe, Users, Sparkles, Boxes } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AudioTrack } from '@/components/audio-player'
import AuthModal from '@/components/auth/auth-modal'
import { useAuth } from '@/contexts/auth-context'

// Sample featured tracks for non-registered users
const featuredTracks: AudioTrack[] = [
  {
    id: '1',
    title: 'Cosmic Journey',
    artist: 'Space Travelers',
    coverUrl: '/abstract-soundscape.png',
    audioUrl: 'https://sample-music.com/preview1.mp3',
  },
  {
    id: '2',
    title: 'Urban Pulse',
    artist: 'City Beats',
    coverUrl: '/hip-hop-album-cover.png',
    audioUrl: 'https://sample-music.com/preview2.mp3',
  },
  {
    id: '3',
    title: 'Digital Dawn',
    artist: 'Electronic Masters',
    coverUrl: '/electronic-album-cover.png',
    audioUrl: 'https://sample-music.com/preview3.mp3',
  },
  {
    id: '4',
    title: 'Neon Lights',
    artist: 'Synthwave',
    coverUrl: '/abstract-geometric-shapes.png',
    audioUrl: 'https://sample-music.com/preview4.mp3',
  },
];

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlayPause = (track: AudioTrack) => {
    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      
      // Reset and play new audio
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl
        audioRef.current.load()
        audioRef.current.play()
      }
    }
  }

  const handleLaunchApp = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    router.push('/dashboard')
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Audio element for playing samples */}
      <audio ref={audioRef} />
      
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-coral-500/30 via-background to-background z-0"></div>
        
        {/* Content overlay */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 sonar-logo-text">
              SONAR: Discover. Create. Earn.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              The next generation music platform empowering artists with transparent distribution 
              and Web3-powered royalties. Take control of your music career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-coral-500 hover:bg-coral-600 text-white"
                onClick={handleLaunchApp}
              >
                Launch App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/discover')}
              >
                Explore Music
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Featured Music Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2">Discover New Music</h2>
            <p className="text-muted-foreground mb-8">Preview trending tracks from our artists</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTracks.map((track) => (
                <Card key={track.id} className="overflow-hidden group hover:shadow-md transition-all">
                  <div className="aspect-square relative">
                    <Image 
                      src={track.coverUrl} 
                      alt={track.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        className="rounded-full bg-coral-500 hover:bg-coral-600 text-white h-12 w-12"
                        onClick={() => handlePlayPause(track)}
                      >
                        {currentTrack?.id === track.id && isPlaying 
                          ? <Pause className="h-6 w-6" /> 
                          : <Play className="h-6 w-6 ml-0.5" />
                        }
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                    <p className="text-xs text-coral-500 mt-2">
                      Preview only • <button onClick={() => setShowAuthModal(true)} className="underline">Sign up</button> for full access
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-10">
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/discover')}
              >
                Browse All Tracks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">How SONAR Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A revolutionary platform combining traditional music distribution with Web3 technology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Music</h3>
              <p className="text-muted-foreground">
                Simple and fast uploads with support for high-quality audio formats
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Distribution</h3>
              <p className="text-muted-foreground">
                Get your music on all major streaming platforms with just a few clicks
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4">
                <CircleDollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Royalties</h3>
              <p className="text-muted-foreground">
                Fair and transparent payments with detailed analytics and reporting
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4">
                <Boxes className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Web3 Integration</h3>
              <p className="text-muted-foreground">
                Tokenize your music on Polkadot blockchain for new revenue opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Web3 Features Section */}
      <section className="py-16 bg-gradient-to-br from-background via-coral-50/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Powered by Polkadot</h2>
              <p className="text-xl text-muted-foreground mb-6">
                SONAR leverages Polkadot blockchain technology to create new opportunities for artists and fans
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-coral-100 text-coral-600 flex-shrink-0 flex items-center justify-center">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Music NFTs</h3>
                    <p className="text-muted-foreground">
                      Create unique digital collectibles from your music that fans can own and trade
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-coral-100 text-coral-600 flex-shrink-0 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Fan Investment</h3>
                    <p className="text-muted-foreground">
                      Let fans invest in your success by purchasing royalty tokens
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-coral-100 text-coral-600 flex-shrink-0 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Smart Contracts</h3>
                    <p className="text-muted-foreground">
                      Automated royalty splits and payments through blockchain smart contracts
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-8 bg-coral-500 hover:bg-coral-600 text-white"
                size="lg"
                onClick={() => router.push('/signup')}
              >
                Join the Revolution
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <Image 
                src="/web3-music-illustration.png" 
                alt="Web3 Music Ecosystem"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-coral-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Music Career?</h2>
            <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
              Join thousands of artists who are taking control of their music and earnings with SONAR
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-coral-600 hover:bg-white/90"
              onClick={handleLaunchApp}
            >
              Launch App Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-10 w-10 mr-2">
                <Image 
                  src="/sonar-icon.png" 
                  alt="SONAR" 
                  width={40} 
                  height={40}
                />
              </div>
              <span className="text-2xl font-bold sonar-logo-text">SONAR</span>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground">About</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Support</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2023 SONAR. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">Terms of Service</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  )
} 