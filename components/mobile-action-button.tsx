"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color?: string
}

interface MobileActionButtonProps {
  items: ActionItem[]
  className?: string
}

export function MobileActionButton({ items, className }: MobileActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className={cn("fixed bottom-20 right-4 z-40", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-2 items-end"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                <div className="bg-card shadow-lg rounded-md py-1 px-3 text-sm">{item.label}</div>
                <Button
                  size="icon"
                  className={cn("h-10 w-10 rounded-full shadow-lg", item.color)}
                  onClick={() => {
                    item.onClick()
                    setIsOpen(false)
                  }}
                >
                  {item.icon}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-coral-500 to-coral-600"
        onClick={toggleOpen}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </Button>
    </div>
  )
}
