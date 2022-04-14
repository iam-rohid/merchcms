import { Menu } from "../types";

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
        href: "/dashboard",
      },
      {
        id: "create-new-store",
        label: "New Store",
        href: "/new",
      },
      {
        id: "settings",
        label: "Settings",
        href: "/dashboard/settings",
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
