"use client"

import React from "react"
import { Building2, Users } from "lucide-react"

const stats = [
  {
    icon: Building2,
    label: "New GCC Centres Added",
    value: 2,
    detail: "Earlier 63 → Now 65 Total Centres",
  },
  {
    icon: Users,
    label: "New Contacts Added",
    value: 82,
    detail: "Earlier 364 → Now 446 Total Contacts",
  },
]

export function StatsBanner() {
  return (
    <div className="relative overflow-hidden border-b border-border/60 bg-primary/5">
      <div className="flex animate-scroll whitespace-nowrap py-1.5">
        {/* Duplicate items for seamless loop */}
        {[...stats, ...stats, ...stats].map((stat, i) => (
          <div
            key={i}
            className="mx-8 inline-flex shrink-0 items-center gap-2 text-sm"
          >
            <stat.icon className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-primary">{stat.value}</span>
            <span className="text-muted-foreground">{stat.label}</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-xs text-muted-foreground/70">
              ({stat.detail})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
