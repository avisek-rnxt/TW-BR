"use client"

import React, { useState, useCallback, useEffect } from "react"
import { Building2, Users, Bell, RefreshCw, CheckCircle2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { requestUpdate } from "@/app/actions/request-update"

const stats = [
  {
    icon: Building2,
    label: "New GCC Centres Added",
    value: 5,
    detail: "Earlier 63 → Now 68 Total Centres",
  },
  {
    icon: Users,
    label: "New Contacts Added",
    value: 82,
    detail: "Earlier 364 → Now 446 Total Contacts",
  },
]

export function StatsBanner() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return
      const user = session.user
      setUserEmail(user.email ?? null)
      supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setUserName([data.first_name, data.last_name].filter(Boolean).join(" "))
          }
        })
    })
  }, [])

  const handleRequestUpdate = useCallback(async () => {
    if (sending || sent) return
    setSending(true)
    const result = await requestUpdate(
      userName || "Unknown User",
      userEmail || "unknown"
    )
    setSending(false)
    if (result.success) {
      setSent(true)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
    }
  }, [sending, sent, userName, userEmail])

  return (
    <div className="relative border-b border-border/60 bg-primary/5">
      <div className="flex items-center py-1.5 px-4 gap-4">
        <div className="flex items-center gap-1.5 shrink-0">
          <Bell className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">Updates</span>
        </div>
        <div className="h-4 w-px bg-border/60 shrink-0" />
        <div className="flex flex-1 items-center gap-6">
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="h-3 w-px bg-border/40 shrink-0" />}
              <div className="inline-flex shrink-0 items-center gap-2 text-sm">
                <stat.icon className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-primary">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="text-xs text-muted-foreground/70">
                  ({stat.detail})
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {showSuccess && (
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-right-2 duration-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Request sent successfully
            </div>
          )}
          <button
            onClick={handleRequestUpdate}
            disabled={sending || sent}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
              sent
                ? "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95"
            } disabled:cursor-not-allowed`}
          >
            {sent ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Sent
              </>
            ) : sending ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="h-3 w-3" />
                Request Updates
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
