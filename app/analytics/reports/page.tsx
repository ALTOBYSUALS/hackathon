"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download, CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

const reportTemplates = [
  {
    id: "monthly-summary",
    name: "Monthly Performance Summary",
    description: "Comprehensive overview of streams, revenue, and audience metrics",
    type: "Performance",
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
    status: "Ready",
  },
  {
    id: "audience-insights",
    name: "Audience Demographics Report",
    description: "Detailed breakdown of listener demographics and geographic data",
    type: "Audience",
    frequency: "Quarterly",
    lastGenerated: "2024-01-01",
    status: "Ready",
  },
  {
    id: "revenue-analysis",
    name: "Revenue & Royalty Analysis",
    description: "Financial performance across all platforms and revenue streams",
    type: "Financial",
    frequency: "Monthly",
    lastGenerated: "2024-01-10",
    status: "Processing",
  },
  {
    id: "platform-comparison",
    name: "Platform Performance Comparison",
    description: "Side-by-side analysis of performance across streaming platforms",
    type: "Comparative",
    frequency: "Weekly",
    lastGenerated: "2024-01-12",
    status: "Ready",
  },
  {
    id: "track-performance",
    name: "Individual Track Analysis",
    description: "Deep dive into each track's performance metrics and trends",
    type: "Track Analysis",
    frequency: "Bi-weekly",
    lastGenerated: "2024-01-08",
    status: "Ready",
  },
]

const recentReports = [
  {
    name: "December 2023 Performance Report",
    type: "Monthly Summary",
    generatedDate: "2024-01-02",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    name: "Q4 2023 Audience Insights",
    type: "Audience Report",
    generatedDate: "2024-01-01",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    name: "Platform Comparison - Week 52",
    type: "Platform Analysis",
    generatedDate: "2023-12-30",
    size: "1.2 MB",
    format: "Excel",
  },
  {
    name: "Revenue Analysis - December",
    type: "Financial Report",
    generatedDate: "2023-12-28",
    size: "3.1 MB",
    format: "PDF",
  },
]

export default function AnalyticsReportsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Reports</h1>
          <p className="text-muted-foreground">Generate and download comprehensive analytics reports</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <Badge variant={template.status === "Ready" ? "default" : "secondary"}>{template.status}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-medium">{template.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Generated:</span>
                    <span className="font-medium">{template.lastGenerated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" disabled={template.status === "Processing"}>
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Report</CardTitle>
              <CardDescription>Build a personalized report with specific metrics and date ranges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>

                  <div>
                    <Label>Date Range</Label>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <Label>Report Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Include Metrics</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="streams" defaultChecked />
                        <Label htmlFor="streams">Streaming Data</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="revenue" defaultChecked />
                        <Label htmlFor="revenue">Revenue & Royalties</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audience" defaultChecked />
                        <Label htmlFor="audience">Audience Demographics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="performance" />
                        <Label htmlFor="performance">Track Performance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="geographic" />
                        <Label htmlFor="geographic">Geographic Data</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="platforms" />
                        <Label htmlFor="platforms">Platform Breakdown</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Custom Report
                </Button>
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Download and manage your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>Generated {report.generatedDate}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.format}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
