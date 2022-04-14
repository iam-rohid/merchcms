import { Menu } from "types";
import { appDashboardPath } from "./app-dashboard-menu";

export const appSettingsPath = `${appDashboardPath}/settings`;

export const appSettingsMenu: Menu = [
  {
    id: "general",
    label: "General",
    href: `${appSettingsPath}/general`,
  },
  {
    id: "security",
    label: "Security",
    href: `${appSettingsPath}/security`,
  },
  {
    id: "notifications",
    label: "Notifications",
    href: `${appSettingsPath}/notifications`,
  },
  {
    id: "billing",
    label: "Billing",
    href: `${appSettingsPath}/billing`,
  },
  {
    id: "invoices",
    label: "Invoices",
    href: `${appSettingsPath}/invoices`,
  },
];
