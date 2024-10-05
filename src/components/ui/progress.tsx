"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, value, orientation = "horizontal", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-full bg-black",
      orientation === "horizontal" ? "w-full h-4" : "h-auto w-4",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "flex-1 w-full h-full transition-all bg-white",
        orientation === "horizontal"
          ? "h-full"
          : "w-full origin-bottom"
      )}
      style={{
        transform: orientation === "horizontal"
          ? `translateX(-${100 - (value || 0)}%)`
          : `scaleY(${(value || 0) / 100})`
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }