import { Menu } from "types";

export const appDashboardPath = "/dashboard";

export const userDashboardMenu: Menu = [
  {
    id: "overview",
    label: "Overview",
    href: `${appDashboardPath}`,
  },
  { id: "activity", label: "Activity", href: `${appDashboardPath}/activity` },

  { id: "settings", label: "Settings", href: `${appDashboardPath}/settings` },
];
