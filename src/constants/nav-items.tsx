import { CreditCard, LayoutDashboard } from "lucide-react";

/**
 * サイドバーに表示するナビゲーションアイテム
 */
export const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/" },
  { label: "Transactions", icon: <CreditCard size={18} />, href: "/transactions" }
]
