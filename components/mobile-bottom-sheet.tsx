"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

interface MobileBottomSheetProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  height?: string | number
  className?: string
  showHandle?: boolean
}

export function MobileBottomSheet({
  children,
  isOpen,
  onClose,
  height = "50vh",
  className,
  showHandle = true,
}: MobileBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle drag to dismiss
  const handleDragEnd = (e: MouseEvent, info: PanInfo) => {
    if (info.velocity.y > 500 || info.offset.y > 100) {
      onClose()
    }
    setIsDragging(false)
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className={cn(
              "fixed bottom-0 left-0 right-0 bg-background rounded-t-xl overflow-hidden",
              "flex flex-col shadow-lg",
              isDragging ? "cursor-grabbing" : "cursor-grab",
              className,
            )}
            style={{ height, touchAction: "none" }}
          >
            {showHandle && (
              <div className="w-full flex justify-center pt-2 pb-1">
                <div className="w-10 h-1 bg-muted rounded-full" />
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
