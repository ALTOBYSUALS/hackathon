"use client"

import { useState } from "react"
import { useOnboarding } from "@/components/onboarding/onboarding-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { Moon, Sun, RefreshCw, Bell, Shield, User, HelpCircle } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const { theme, setTheme } = useTheme()
  const onboardingContext = useOnboarding()
  const { startOnboarding } = onboardingContext

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="help">Help & Support</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-brand-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your account information and profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile settings would go here */}
              <p className="text-muted-foreground">Profile settings content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-brand-primary" />
                Onboarding
              </CardTitle>
              <CardDescription>Revisit the onboarding process to learn about key features.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                If you'd like to go through the onboarding process again, you can restart it at any time.
              </p>
              <Button onClick={startOnboarding}>Restart Onboarding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-brand-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-brand-primary" />
                )}
                Theme
              </CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </Label>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Notification settings would go here */}
              <p className="text-muted-foreground">Notification settings content</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and privacy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Security settings would go here */}
              <p className="text-muted-foreground">Security settings content</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-primary" />
                Help & Support
              </CardTitle>
              <CardDescription>Get help with using the platform and contact support.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Help content would go here */}
              <p className="text-muted-foreground">Help and support content</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
