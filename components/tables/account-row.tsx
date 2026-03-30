import { memo } from "react"
import { CircleCheck, Download } from "lucide-react"
import { TableRow, TableCell } from "@/components/ui/table"
import type { Account } from "@/lib/types"
import { CompanyLogo } from "@/components/ui/company-logo"
import { RecentlyUpdatedIndicator } from "@/components/ui/recently-updated-indicator"

interface AccountRowProps {
  account: Account
  isRecentlyUpdated?: boolean
  hasContacts?: boolean
  onClick: () => void
}

export const AccountRow = memo(({ account, isRecentlyUpdated = false, hasContacts = false, onClick }: AccountRowProps) => {
  const location = [account.account_hq_city, account.account_hq_country]
    .filter(Boolean)
    .join(", ")
  const isNasscomVerified = account.account_nasscom_status?.toLowerCase() === "yes"
  const hasReport = !!account.account_report_link
  const isMyList = account.account_source === "My List"
  const isBambooReports = account.account_source === "Bamboo Reports List"
  const accountName = account.account_global_legal_name || "account"

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50 transition-colors focus-visible:bg-muted/70"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick()
        }
      }}
      tabIndex={0}
      aria-label={`View account details for ${accountName}`}
    >
      <TableCell className="font-medium max-w-[280px]">
        <div className="flex items-center gap-3">
          <CompanyLogo
            domain={account.account_hq_website ?? undefined}
            companyName={accountName}
            size="sm"
            theme="auto"
          />
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <div className="min-w-0 flex-1 truncate" title={accountName}>
                {accountName}
              </div>
              {isRecentlyUpdated ? (
                <RecentlyUpdatedIndicator title="This account has unread recent updates" />
              ) : null}
            </div>
            {(isNasscomVerified || hasReport || isMyList || isBambooReports || hasContacts) && (
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {isNasscomVerified && (
                <div
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-[#C03430]/15 text-[#C03430]"
                  title="NASSCOM listed"
                >
                  <CircleCheck className="h-3 w-3 animate-pulse" aria-hidden="true" />
                  NASSCOM
                </div>
                )}
                {isMyList && (
                <div
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-[#FC798F]/15 text-[#FC798F]"
                  title="Source: My List"
                >
                  My List
                </div>
                )}
                {isBambooReports && (
                <div
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-[#F17C1D]/15 text-[#F17C1D]"
                  title="Source: BR Net New List"
                >
                  BR Net New List
                </div>
                )}
                {hasContacts && (
                <div
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-gray-500/15 text-gray-700 dark:text-gray-300"
                  title="Has contacts"
                >
                  Contacts
                </div>
                )}
                {hasReport && (
                <div
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold bg-blue-500/15 text-blue-700 dark:text-blue-300"
                  title="Report available"
                >
                  <Download className="h-3 w-3" aria-hidden="true" />
                  Report
                </div>
                )}
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="max-w-[220px]">
        <div className="truncate" title={account.account_hq_industry || "N/A"}>
          {account.account_hq_industry || "N/A"}
        </div>
      </TableCell>
      <TableCell className="max-w-[140px]">
        <div className="truncate" title={account.account_hq_revenue_range || "N/A"}>
          {account.account_hq_revenue_range || "N/A"}
        </div>
      </TableCell>
      <TableCell className="max-w-[200px]">
        <div className="truncate" title={account.account_center_employees_range || "N/A"}>
          {account.account_center_employees_range || "N/A"}
        </div>
      </TableCell>
    </TableRow>
  )
})
AccountRow.displayName = "AccountRow"
