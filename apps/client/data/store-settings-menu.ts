import { Menu } from "types";
import { storeDashboardPath } from "./store-dashboard-menu";

export const storeSettingsPath = `${storeDashboardPath}/settings`;

export const storeSettingsMenu: Menu = [
  {
    id: "general",
    label: "General",
    href: `${storeSettingsPath}/general`,
  },
  {
    id: "domains",
    label: "Domains",
    href: `${storeSettingsPath}/domains`,
  },
  {
    id: "security",
    label: "Security",
    href: `${storeSettingsPath}/security`,
  },
  {
    id: "advanced",
    label: "Advanced",
    href: `${storeSettingsPath}/advanced`,
  },
];
