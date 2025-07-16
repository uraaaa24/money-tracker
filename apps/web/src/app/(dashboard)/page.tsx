'use client'

import AppLayout from '@/components/layouts/app-layout'
import { Skeleton } from '@/components/ui/skeleton'
import { RecentTransactions } from '@/features/dashboard/components/recent-transactions'
import { SummaryCard } from '@/features/dashboard/components/summary-card'
import { TopCategories } from '@/features/dashboard/components/top-categories'
import { useGetDashboardSummary } from '@/features/dashboard/hooks/use-dashboard'
import { Activity, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { summary, isLoading, error } = useGetDashboardSummary()

  if (error) {
    return (
      <AppLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">データの取得に失敗しました</p>
        </div>
      </AppLayout>
    )
  }

  if (isLoading || !summary) {
    return (
      <AppLayout title="Dashboard">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['income', 'expense', 'balance', 'count'].map((key) => (
              <Skeleton key={key} className="h-32 bg-gray-200" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 bg-gray-200" />
            <Skeleton className="h-80 bg-gray-200" />
          </div>
        </div>
      </AppLayout>
    )
  }

  const { current_month, previous_month, top_expense_categories, recent_transactions } = summary

  // 前月比計算
  const incomeChange = current_month.total_income - previous_month.total_income
  const expenseChange = current_month.total_expense - previous_month.total_expense

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="今月の収入"
            value={`¥${current_month.total_income.toLocaleString()}`}
            change={{
              amount: `¥${Math.abs(incomeChange).toLocaleString()}`,
              isPositive: incomeChange >= 0,
            }}
            icon={<TrendingUp className="h-4 w-4" />}
          />

          <SummaryCard
            title="今月の支出"
            value={`¥${current_month.total_expense.toLocaleString()}`}
            change={{
              amount: `¥${Math.abs(expenseChange).toLocaleString()}`,
              isPositive: expenseChange <= 0, // 支出は減少が良い
            }}
            icon={<TrendingDown className="h-4 w-4" />}
          />

          <SummaryCard
            title="今月の収支"
            value={`¥${current_month.net_amount.toLocaleString()}`}
            change={{
              amount: `¥${Math.abs(current_month.net_amount - previous_month.net_amount).toLocaleString()}`,
              isPositive: (current_month.net_amount - previous_month.net_amount) >= 0,
            }}
            icon={<DollarSign className="h-4 w-4" />}
          />

          <SummaryCard
            title="今月の取引数"
            value={`${current_month.transaction_count}件`}
            icon={<Activity className="h-4 w-4" />}
          />
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions transactions={recent_transactions} />
          <TopCategories categories={top_expense_categories} />
        </div>
      </div>
    </AppLayout>
  )
}
