import { Menu } from "types";

export const userDashboardMenu: Menu = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
  },
  {
    id: "integrations",
    label: "Integrations",
    href: "/dashboard/integrations",
  },
  { id: "activity", label: "Activity", href: "/dashboard/activity" },
  { id: "settings", label: "Settings", href: "/account" },
];
