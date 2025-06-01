"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, HelpCircle, MessageSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      id: "uploads",
      name: "Uploads",
      icon: <HelpCircle className="h-5 w-5" />,
      faqs: [
        {
          question: "What file formats do you accept for audio uploads?",
          answer:
            "We accept WAV and FLAC files with a minimum of 16-bit, 44.1kHz quality. For the best results, we recommend 24-bit, 48kHz WAV files.",
        },
        {
          question: "What are the requirements for cover art?",
          answer:
            "Cover art should be a square image with a minimum resolution of 3000x3000 pixels. We accept JPG and PNG formats. The image should not contain explicit content, logos, or text that could violate copyright.",
        },
        {
          question: "How long does it take for my music to appear on streaming platforms?",
          answer:
            "After submission, your music typically takes 1-3 business days for our review process. Once approved, it takes approximately 2-7 days to appear on major platforms like Spotify and Apple Music, and up to 30 days for some smaller platforms.",
        },
        {
          question: "Can I edit my release after submission?",
          answer:
            "You can edit certain metadata before your release is approved. Once your release is live, you can only make limited changes. Major changes may require taking down the release and resubmitting it.",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments",
      icon: <HelpCircle className="h-5 w-5" />,
      faqs: [
        {
          question: "How often will I get paid?",
          answer:
            "We process payments monthly. Earnings are typically paid out 45-60 days after the end of the month in which they were earned, depending on when we receive reports from the platforms.",
        },
        {
          question: "What payment methods do you support?",
          answer:
            "We support direct bank transfers (ACH) in most countries and PayPal globally. Bank transfers have lower fees but may take 2-3 business days to process. PayPal transfers are usually instant but may have higher fees.",
        },
        {
          question: "Is there a minimum payout threshold?",
          answer:
            "Yes, the default minimum payout threshold is $50. You can adjust this in your account settings to a higher amount if preferred.",
        },
        {
          question: "Why haven't I received my payment yet?",
          answer:
            "Payments can be delayed for several reasons: incomplete tax information, incorrect payment details, or if you haven't reached the minimum payout threshold. Check your account dashboard for any alerts or notifications.",
        },
      ],
    },
    {
      id: "stores",
      name: "Stores & Platforms",
      icon: <HelpCircle className="h-5 w-5" />,
      faqs: [
        {
          question: "Which streaming platforms do you distribute to?",
          answer:
            "We distribute to all major platforms including Spotify, Apple Music, Amazon Music, YouTube Music, Tidal, Deezer, Pandora, and over 150 other platforms and stores worldwide.",
        },
        {
          question: "Can I select specific platforms for my release?",
          answer:
            "Yes, during the upload process you can select which platforms you want your music to be distributed to. You can choose all platforms or select specific ones.",
        },
        {
          question: "How do I get my music on TikTok?",
          answer:
            "TikTok distribution is included in our standard distribution package. Simply select TikTok as one of your distribution platforms during the upload process.",
        },
        {
          question: "Can I remove my music from a specific platform?",
          answer:
            "Yes, you can request to remove your music from specific platforms while keeping it on others. Go to your release page, select 'Edit Distribution', and update your platform selections.",
        },
      ],
    },
    {
      id: "royalties",
      name: "Royalties & Splits",
      icon: <HelpCircle className="h-5 w-5" />,
      faqs: [
        {
          question: "How do royalty splits work?",
          answer:
            "Royalty splits allow you to share earnings from your music with collaborators. You can assign percentage splits to each contributor, and our system will automatically distribute the earnings according to these percentages.",
        },
        {
          question: "Can I change royalty splits after a release is live?",
          answer:
            "Yes, you can update royalty splits at any time. Changes will apply to future earnings only and won't affect payments that have already been processed.",
        },
        {
          question: "Do collaborators need an account on your platform?",
          answer:
            "Yes, collaborators need to create an account to receive their share of the royalties. They'll receive an email invitation when you add them to a split.",
        },
        {
          question: "What happens if a collaborator doesn't claim their royalties?",
          answer:
            "Unclaimed royalties are held in our system for up to 3 years. If a collaborator doesn't create an account and set up payment information within that time, the funds may be redistributed to the other rights holders.",
        },
      ],
    },
  ]

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories.flatMap((category) =>
        category.faqs
          .filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((faq) => ({ ...faq, category: category.name })),
      )
    : []

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Help & Support</h1>
      </div>
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">How can we help you?</h2>
            <p className="text-muted-foreground">Search our knowledge base or browse common topics below</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Search Results ({filteredFAQs.length})</h3>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`search-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div>
                          {faq.question}
                          <p className="text-xs text-muted-foreground mt-1">Category: {faq.category}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p>No results found. Try a different search term or browse the categories below.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {!searchQuery && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {faqCategories.map((category) => (
                  <Card key={category.id} className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-2">
                      {category.icon}
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.faqs.length} articles</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm">
                        {category.faqs.slice(0, 2).map((faq, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="truncate">{faq.question}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-0 text-sm text-muted-foreground hover:text-foreground"
                      >
                        View all articles
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Tabs defaultValue="uploads" className="space-y-4">
                <TabsList className="grid grid-cols-4">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="space-y-4">
                    <h3 className="text-lg font-medium">{category.name} FAQ</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}

          <div className="mt-8 rounded-lg border bg-muted/50 p-6 text-center">
            <h3 className="text-lg font-medium">Still need help?</h3>
            <p className="mt-2 text-muted-foreground">
              Our support team is available to assist you with any questions or issues.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/help/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
