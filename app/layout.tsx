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
  title: "MUSIC BASE - Music Distribution Dashboard",
  description: "A comprehensive dashboard for music distribution and analytics",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
