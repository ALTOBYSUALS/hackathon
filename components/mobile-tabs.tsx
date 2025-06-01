"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface MobileTabsProps {
  tabs: Tab[]
  defaultTabId?: string
  onChange?: (tabId: string) => void
  className?: string
}

export function MobileTabs({ tabs, defaultTabId, onChange, className }: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (onChange) onChange(tabId)
  }

  return (
    <div className={cn("relative border-b", className)}>
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex items-center justify-center px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              "relative min-w-[80px] flex-1",
              activeTab === tab.id ? "text-primary" : "text-muted-foreground",
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
