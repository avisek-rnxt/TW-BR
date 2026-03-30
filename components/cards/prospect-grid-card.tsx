import { memo } from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RecentlyUpdatedIndicator } from "@/components/ui/recently-updated-indicator"
import type { Prospect } from "@/lib/types"

interface ProspectGridCardProps {
  prospect: Prospect
  isRecentlyUpdated?: boolean
  onClick: () => void
}

export const ProspectGridCard = memo(({ prospect, isRecentlyUpdated = false, onClick }: ProspectGridCardProps) => {
  const fullName =
    prospect.prospect_full_name ||
    [prospect.prospect_first_name, prospect.prospect_last_name].filter(Boolean).join(" ")
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
  const location = [prospect.prospect_city, prospect.prospect_country].filter(Boolean).join(", ")

  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col gap-4 h-full">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">{initials || "?"}</span>
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h3
                className="min-w-0 flex-1 truncate text-base font-semibold leading-snug text-foreground"
                title={fullName || "Prospect"}
              >
                {fullName || "Prospect"}
              </h3>
              {isRecentlyUpdated ? (
                <RecentlyUpdatedIndicator title="This prospect has unread recent updates" />
              ) : null}
            </div>
            <p
              className="text-sm text-muted-foreground mt-1 truncate"
              title={location || prospect.prospect_country || "-"}
            >
              {location || prospect.prospect_country || "-"}
            </p>
            {prospect.company_name_moved_to ? (
              <Badge variant="outline" className="mt-1.5 text-[10px] h-5 px-1.5 bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-400 dark:border-amber-400/30 dark:bg-amber-400/10 truncate max-w-full" title={`Moved to ${prospect.company_name_moved_to}`}>
                Moved to {prospect.company_name_moved_to}
              </Badge>
            ) : null}
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="text-muted-foreground">Job Title</span>
            <span
              className="font-medium text-foreground text-right truncate max-w-[160px]"
              title={prospect.prospect_title || "-"}
            >
              {prospect.prospect_title || "-"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="text-muted-foreground">Department</span>
            <span
              className="font-medium text-foreground text-right truncate max-w-[160px]"
              title={prospect.prospect_department || "-"}
            >
              {prospect.prospect_department || "-"}
            </span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClick}
          className="w-full justify-between bg-foreground text-background border-foreground hover:bg-foreground/90 hover:text-background"
        >
          View Details
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        </div>
      </CardContent>
    </Card>
  )
})

ProspectGridCard.displayName = "ProspectGridCard"
