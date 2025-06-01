"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, FileText, Lock, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Account</h1>
      </div>
      <div className="flex-1 p-6">
        <Tabs defaultValue="profile" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="subscription">
              <Badge className="mr-2 h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="tax">
              <FileText className="mr-2 h-4 w-4" />
              Tax Information
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and artist information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-picture">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/diverse-group-profile.png"
                        width={100}
                        height={100}
                        alt="Profile picture"
                        className="rounded-full object-cover"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="artist-name">Artist/Label Name</Label>
                    <Input id="artist-name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself and your music"
                      defaultValue="Electronic music producer and DJ based in Los Angeles. Creating atmospheric soundscapes since 2015."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" type="url" placeholder="https://yourwebsite.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription and billing information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlimited releases, advanced analytics, and priority support
                      </p>
                    </div>
                    <Badge className="w-fit">Active</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Billing Cycle</p>
                      <p className="font-medium">Monthly</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Billing Date</p>
                      <p className="font-medium">June 15, 2023</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium">$19.99/month</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Upgrade Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Pro Annual</h4>
                      <p className="text-sm text-muted-foreground">Save 20% with annual billing</p>
                      <p className="mt-2 text-lg font-bold">$191.90/year</p>
                      <p className="text-xs text-muted-foreground">$15.99/month, billed annually</p>
                      <Button className="mt-4 w-full" variant="outline">
                        Switch to Annual
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Label Plan</h4>
                      <p className="text-sm text-muted-foreground">For labels with multiple artists</p>
                      <p className="mt-2 text-lg font-bold">$49.99/month</p>
                      <p className="text-xs text-muted-foreground">Manage up to 10 artist accounts</p>
                      <Button className="mt-4 w-full" variant="outline">
                        Upgrade to Label
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                      <div>Date</div>
                      <div>Description</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm">
                      <div>May 15, 2023</div>
                      <div>Pro Plan - Monthly</div>
                      <div>$19.99</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm">
                      <div>Apr 15, 2023</div>
                      <div>Pro Plan - Monthly</div>
                      <div>$19.99</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm">
                      <div>Mar 15, 2023</div>
                      <div>Pro Plan - Monthly</div>
                      <div>$19.99</div>
                      <div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-red-600">
                  Cancel Subscription
                </Button>
                <Button>Download Invoices</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Information</CardTitle>
                <CardDescription>Provide your tax information to ensure proper reporting and payments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax-country">Country of Tax Residence</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="tax-country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-id-type">Tax ID Type</Label>
                    <Select defaultValue="ssn">
                      <SelectTrigger id="tax-id-type">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ssn">Social Security Number (SSN)</SelectItem>
                        <SelectItem value="ein">Employer Identification Number (EIN)</SelectItem>
                        <SelectItem value="itin">Individual Taxpayer Identification Number (ITIN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID Number</Label>
                    <Input id="tax-id" type="password" placeholder="XXX-XX-XXXX" />
                    <p className="text-xs text-muted-foreground">Your tax ID is encrypted and securely stored.</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tax Forms</Label>
                    <p className="text-sm text-muted-foreground">
                      Based on your information, you need to complete the following tax forms:
                    </p>
                  </div>

                  <div className="space-y-2 border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">W-9 Form</h3>
                        <p className="text-sm text-muted-foreground">
                          Request for Taxpayer Identification Number and Certification
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Tax Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Add and manage your payment methods for receiving royalties.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Default Payment Method</Label>
                  <RadioGroup defaultValue="bank" className="flex flex-col space-y-3">
                    <div className="flex items-start space-x-3 border rounded-md p-4">
                      <RadioGroupItem value="bank" id="bank" className="mt-1" />
                      <div className="space-y-1">
                        <Label htmlFor="bank" className="font-medium">
                          Bank Account (ACH)
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Direct deposit to your bank account. Available in most countries.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 border rounded-md p-4">
                      <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                      <div className="space-y-1">
                        <Label htmlFor="paypal" className="font-medium">
                          PayPal
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive payments to your PayPal account. Fast and convenient.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Holder Name</Label>
                      <Input id="account-name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-type">Account Type</Label>
                      <Select>
                        <SelectTrigger id="account-type">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routing-number">Routing Number</Label>
                      <Input id="routing-number" placeholder="123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input id="account-number" placeholder="1234567890" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">PayPal Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-email">PayPal Email</Label>
                    <Input id="paypal-email" type="email" placeholder="your-email@example.com" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Payment Methods</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    These are the devices that are currently logged into your account.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border rounded-md p-4">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">
                          Chrome on Windows • Los Angeles, USA • IP: 192.168.1.1
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex justify-between items-center border rounded-md p-4">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">
                          iPhone 13 • Los Angeles, USA • Last active: 2 hours ago
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="text-red-600">
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
