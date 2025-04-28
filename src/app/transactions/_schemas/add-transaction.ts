import { z } from "zod"

/**
 * フォームフィールド名
 */
export const TransactionFormNames = {
  date: "date",
  amount: "amount",
  category: "category",
  note: "note",
} as const

/**
 * バリデーションスキーマ
 */
export const transactionFormSchema = z.object({
  [TransactionFormNames.date]: z.date({
    required_error: "日付を入力してください",
    invalid_type_error: "日付が不正です",
  }),
  [TransactionFormNames.amount]: z.string()
    .refine((value) => Number(value) > 0, {
      message: "金額は0より大きい値を入力してください",
    }),
  [TransactionFormNames.category]: z
    .string()
    .min(2, { message: "カテゴリ名が短すぎます" })
    .max(50),
  [TransactionFormNames.note]: z.string().optional(),
})

/**
 * フォーム型
 */
export type TransactionFormInferType = z.infer<typeof transactionFormSchema>

/**
 * 初期値
 */
export const transactionDefaultValues: TransactionFormInferType = {
  [TransactionFormNames.date]: new Date(),
  [TransactionFormNames.amount]: "",
  [TransactionFormNames.category]: "",
  [TransactionFormNames.note]: undefined,
}
