import { Menu } from "types";

export const storeDashboardPath = "/[storeId]";

export const storeDashboardMenu: Menu = [
  {
    id: "overview",
    label: "Overview",
    href: `${storeDashboardPath}`,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: `${storeDashboardPath}/analytics`,
  },
  {
    id: "transactions",
    label: "Transactions",
    href: `${storeDashboardPath}/transactions`,
  },
  { id: "settings", label: "Settings", href: `${storeDashboardPath}/settings` },
];
