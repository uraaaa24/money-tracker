import { Card } from '@/components/ui/card'
import { formatDate } from '@/utils/date'

import type { RecentTransaction } from '../types/dashboard'

type RecentTransactionsProps = {
  transactions: RecentTransaction[]
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  if (transactions.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">最近の取引</h3>
        <p className="text-gray-500 text-center py-8">取引がありません</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">最近の取引</h3>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="font-medium text-sm">{transaction.category_name}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(new Date(transaction.date))}
                {transaction.memo && ` • ${transaction.memo}`}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}¥
                {transaction.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}