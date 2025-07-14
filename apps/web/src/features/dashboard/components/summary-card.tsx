import { Card } from '@/components/ui/card'

type SummaryCardProps = {
  title: string
  value: string
  change?: {
    amount: string
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export const SummaryCard = ({ title, value, change, icon }: SummaryCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-gray-500 mt-1">
            <span
              className={`${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              } font-medium`}
            >
              {change.isPositive ? '+' : ''}{change.amount}
            </span>{' '}
            先月比
          </p>
        )}
      </div>
    </Card>
  )
}