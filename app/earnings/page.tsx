"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Download, Wallet } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
  Cell,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

export default function EarningsPage() {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Earnings</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/earnings/royalty-splits">Configure Royalty Splits</Link>
          </Button>
          <Button size="sm">Request Payout</Button>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium">Earnings Report</h2>
            <p className="text-sm text-muted-foreground">View your earnings across all platforms and territories</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-[300px]">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) => range && setDate(range as { from: Date; to: Date })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings (Fiat)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,563.82</div>
              <p className="text-xs text-muted-foreground">For selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings (Crypto)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125.45 DOT</div>
              <p className="text-xs text-muted-foreground">≈ $156.81</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2M</div>
              <p className="text-xs text-muted-foreground">For selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Per Stream</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.0030</div>
              <p className="text-xs text-muted-foreground">For selected period</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">Earnings Summary</TabsTrigger>
            <TabsTrigger value="platforms">Breakdown by Platform</TabsTrigger>
            <TabsTrigger value="territories">Breakdown by Territory</TabsTrigger>
            <TabsTrigger value="payouts">Balance & Payouts</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Evolution</CardTitle>
                <CardDescription>Monthly earnings for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <EarningsChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="platforms" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Earnings breakdown by platform</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <PlatformChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Platform Details</CardTitle>
                  <CardDescription>Detailed earnings by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Platform</TableHead>
                        <TableHead>Streams</TableHead>
                        <TableHead className="text-right">Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Spotify</TableCell>
                        <TableCell>3.2M</TableCell>
                        <TableCell className="text-right">$9,600.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apple Music</TableCell>
                        <TableCell>2.1M</TableCell>
                        <TableCell className="text-right">$7,350.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Amazon Music</TableCell>
                        <TableCell>1.4M</TableCell>
                        <TableCell className="text-right">$4,200.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>YouTube Music</TableCell>
                        <TableCell>0.8M</TableCell>
                        <TableCell className="text-right">$2,000.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tidal</TableCell>
                        <TableCell>0.4M</TableCell>
                        <TableCell className="text-right">$1,200.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Others</TableCell>
                        <TableCell>0.3M</TableCell>
                        <TableCell className="text-right">$213.82</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="territories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Territories</CardTitle>
                <CardDescription>Earnings breakdown by country</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Streams</TableHead>
                      <TableHead className="text-right">Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>United States</TableCell>
                      <TableCell>3.5M</TableCell>
                      <TableCell className="text-right">$10,500.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>United Kingdom</TableCell>
                      <TableCell>1.2M</TableCell>
                      <TableCell className="text-right">$3,600.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Germany</TableCell>
                      <TableCell>0.8M</TableCell>
                      <TableCell className="text-right">$2,400.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Canada</TableCell>
                      <TableCell>0.7M</TableCell>
                      <TableCell className="text-right">$2,100.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Australia</TableCell>
                      <TableCell>0.5M</TableCell>
                      <TableCell className="text-right">$1,500.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>France</TableCell>
                      <TableCell>0.4M</TableCell>
                      <TableCell className="text-right">$1,200.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Brazil</TableCell>
                      <TableCell>0.3M</TableCell>
                      <TableCell className="text-right">$900.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Japan</TableCell>
                      <TableCell>0.3M</TableCell>
                      <TableCell className="text-right">$900.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mexico</TableCell>
                      <TableCell>0.2M</TableCell>
                      <TableCell className="text-right">$600.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>0.3M</TableCell>
                      <TableCell className="text-right">$863.82</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payouts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Available Balance</CardTitle>
                  <CardDescription>Current balance available for payout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Fiat Balance (USD)</span>
                      <span className="text-xl font-bold">$1,245.67</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">DOT Balance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">45.32 DOT</span>
                        <Badge variant="outline" className="text-xs">
                          ≈ $56.65
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">USDC Balance (on Polkadot)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">75.00 USDC</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="bg-brand hover:bg-brand-dark text-white">Request Fiat Payout</Button>
                    <Button className="bg-brand hover:bg-brand-dark text-white">
                      <Wallet className="mr-2 h-4 w-4" />
                      Withdraw to Polkadot Wallet
                    </Button>
                  </div>

                  <div className="rounded-md border p-3 bg-muted/20">
                    <h4 className="text-sm font-medium mb-1">Payout Thresholds</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Fiat: Minimum $50 (Fee: $2)</li>
                      <li>• DOT: Minimum 5 DOT (Fee: 0.01 DOT)</li>
                      <li>• USDC: Minimum 10 USDC (Fee: 0.5 USDC)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Manage your payout methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Fiat Payment Methods</h3>
                    <div className="rounded-md border p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          P
                        </div>
                        <div>
                          <p className="text-sm font-medium">PayPal</p>
                          <p className="text-xs text-muted-foreground">artist@example.com</p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Payment Method
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Crypto Wallets</h3>
                    <div className="rounded-md border p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-brand/10 rounded-full flex items-center justify-center text-brand">
                          <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Polkadot Wallet</p>
                          <p className="text-xs font-mono text-muted-foreground">15oF4...uHb2</p>
                        </div>
                      </div>
                      <Badge>Connected</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <Link href="/web3">Manage Polkadot Wallet</Link>
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Royalty Splits</h3>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/earnings/royalty-splits">Configure Off-Chain Splits</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/web3/royalties">Manage On-Chain Splits</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>Recent payouts to your accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{new Date("2023-12-15").toLocaleDateString()}</TableCell>
                      <TableCell>$750.00</TableCell>
                      <TableCell>Fiat</TableCell>
                      <TableCell>PayPal</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-right">PAY-123456789</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{new Date("2024-01-20").toLocaleDateString()}</TableCell>
                      <TableCell>25.5 DOT</TableCell>
                      <TableCell>Crypto</TableCell>
                      <TableCell>Polkadot Wallet</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href="https://polkadot.subscan.io/extrinsic/123456"
                          target="_blank"
                          className="text-brand hover:underline flex items-center justify-end"
                        >
                          0x123...789
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{new Date("2024-02-10").toLocaleDateString()}</TableCell>
                      <TableCell>$500.00</TableCell>
                      <TableCell>Fiat</TableCell>
                      <TableCell>Bank Transfer</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-right">BNK-987654321</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{new Date("2024-03-05").toLocaleDateString()}</TableCell>
                      <TableCell>50.0 USDC</TableCell>
                      <TableCell>Crypto</TableCell>
                      <TableCell>Polkadot Wallet</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href="https://polkadot.subscan.io/extrinsic/456789"
                          target="_blank"
                          className="text-brand hover:underline flex items-center justify-end"
                        >
                          0x456...abc
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EarningsChart() {
  const data = [
    { month: "Jan", earnings: 1500 },
    { month: "Feb", earnings: 1800 },
    { month: "Mar", earnings: 2200 },
    { month: "Apr", earnings: 2000 },
    { month: "May", earnings: 2400 },
    { month: "Jun", earnings: 2100 },
    { month: "Jul", earnings: 2300 },
    { month: "Aug", earnings: 2500 },
    { month: "Sep", earnings: 2700 },
    { month: "Oct", earnings: 2900 },
    { month: "Nov", earnings: 3100 },
    { month: "Dec", earnings: 3500 },
  ]

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
              <span className="font-bold text-muted-foreground">{label}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Earnings</span>
              <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="url(#colorEarnings)" strokeWidth={2} />
        <defs>
          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}

function PlatformChart() {
  const data = [
    { name: "Spotify", value: 9600 },
    { name: "Apple Music", value: 7350 },
    { name: "Amazon Music", value: 4200 },
    { name: "YouTube Music", value: 2000 },
    { name: "Tidal", value: 1200 },
    { name: "Others", value: 213.82 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A4DE6C", "#8884D8"]

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm font-bold">${payload[0].value?.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{((payload[0].value / 24563.82) * 100).toFixed(1)}% of total</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
        <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={100} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

import { ExternalLink } from "lucide-react"
