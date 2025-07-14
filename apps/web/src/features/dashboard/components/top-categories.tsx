import { Card } from '@/components/ui/card'

import type { CategorySummary } from '../types/dashboard'

type TopCategoriesProps = {
  categories: CategorySummary[]
}

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  if (categories.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">支出カテゴリ</h3>
        <p className="text-gray-500 text-center py-8">支出がありません</p>
      </Card>
    )
  }

  const maxAmount = Math.max(...categories.map(cat => cat.amount))

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">支出カテゴリ（今月）</h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{category.category_name}</span>
              <span className="text-sm text-gray-600">
                ¥{category.amount.toLocaleString()} ({category.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(category.amount / maxAmount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}