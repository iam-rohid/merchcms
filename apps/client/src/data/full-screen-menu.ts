import { Menu } from "src/types";
import { appDashboardPath } from "./app-dashboard-menu";
import { appSettingsPath } from "./app-settings-menu";

export const fullScreenMenu: {
  id: string;
  title?: string;
  menu: Menu;
}[] = [
  {
    id: "main",
    menu: [
      {
        id: "overview",
        label: "Dashboard",
        href: appDashboardPath,
      },
      {
        id: "create-new-store",
        label: "New Store",
        href: "/new-store",
      },
      {
        id: "settings",
        label: "Settings",
        href: appSettingsPath,
      },
      {
        id: "logout",
        label: "Logout",
        href: "/logout",
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    menu: [
      {
        id: "support",
        label: "Support",
        href: "/support",
      },
      {
        id: "documentation",
        label: "Documentation",
        href: "/docs",
      },
      {
        id: "feedback",
        label: "Feedback",
        href: "/feedback",
      },
    ],
  },
];
