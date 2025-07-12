import { CreditCard, ChartLine } from "lucide-react";

/**
 * サイドバーに表示するナビゲーションアイテム
 */
export const navItems = [
  { label: "Dashboard", icon: <ChartLine size={18} />, href: "/" },
  { label: "Transactions", icon: <CreditCard size={18} />, href: "/transactions" }
]
