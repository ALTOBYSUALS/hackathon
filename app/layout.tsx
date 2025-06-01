import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"
import { ResponsiveLayout } from "@/components/responsive-layout"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MUSIC BASE - Neodistro Platform",
  description: "The future of music distribution with Web3 technology. Tokenize your music, enable fan investment, and receive transparent royalties on Polkadot.",
  generator: "MUSIC BASE",
  keywords: ["music distribution", "Web3", "Polkadot", "NFT", "royalties", "blockchain", "music streaming"],
  authors: [{ name: "MUSIC BASE Team" }],
  creator: "MUSIC BASE",
  publisher: "MUSIC BASE",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/coral-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/coral-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "MUSIC BASE - Neodistro Platform",
    description: "The future of music distribution with Web3 technology",
    url: "https://music-base.vercel.app",
    siteName: "MUSIC BASE",
    images: [
      {
        url: "/coral-logo.png",
        width: 1200,
        height: 630,
        alt: "MUSIC BASE Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSIC BASE - Neodistro Platform",
    description: "The future of music distribution with Web3 technology",
    images: ["/coral-logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/coral-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/coral-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f47560" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <OnboardingProvider>
            <ResponsiveLayout>{children}</ResponsiveLayout>
            <Toaster />
          </OnboardingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
