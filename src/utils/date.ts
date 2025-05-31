/**
 * 選択した Date を「ローカルの正午」に丸めて返す  
 */
export const toLocalNoon = (date: Date): Date => {
  const d = new Date(date)
  d.setHours(12, 0, 0, 0)
  return d
}

/**
 * 日付を日本語のフォーマットで文字列に変換する
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date)
}
