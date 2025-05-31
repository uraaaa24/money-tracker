import { z } from "zod"

import { TransactionTypes } from "../types/transaction"


/**
 * フォームフィールド名
 */
export const TransactionFormNames = {
  type: "type",
  date: "date",
  memo: "memo",
  amount: "amount",
  categoryId: "categoryId",
} as const

/**
 * バリデーションスキーマ
 */
export const transactionFormSchema = z.object({
  [TransactionFormNames.type]: z
    .enum([TransactionTypes.EXPENSE, TransactionTypes.INCOME], {
      required_error: "取引種別を選択してください",
      invalid_type_error: "取引種別が不正です",
    }),
  [TransactionFormNames.date]: z.date({
    required_error: "日付を入力してください",
    invalid_type_error: "日付が不正です",
  }),
  [TransactionFormNames.memo]: z
    .string()
    .optional(),
  [TransactionFormNames.amount]: z.string()
    .refine((value) => Number(value) > 0, {
      message: "金額は0より大きい値を入力してください",
    }),
  [TransactionFormNames.categoryId]: z.string()
})

/**
 * フォーム型
 */
export type TransactionFormInferType = z.infer<typeof transactionFormSchema>

/**
 * 初期値
 */
export const transactionDefaultValues: TransactionFormInferType = {
  [TransactionFormNames.type]: TransactionTypes.EXPENSE,
  [TransactionFormNames.date]: new Date(),
  [TransactionFormNames.memo]: "",
  [TransactionFormNames.amount]: "",
  [TransactionFormNames.categoryId]: ""
}
