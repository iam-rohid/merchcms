import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "components/container";
import classNames from "classnames";
import {
  MdAdd,
  MdClose,
  MdComputer,
  MdDarkMode,
  MdDashboard,
  MdLightMode,
  MdLogout,
  MdMenu,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { fullScreenMenu } from "data/full-screen-menu";
import MenuList from "components/menu-list";
import Dropdown from "components/drop-down";
import { DropdownMenuType } from "types/dropdown-menu.type";
import { useRouter } from "next/router";
import { appDashboardPath, userDashboardMenu } from "data/app-dashboard-menu";
import { appSettingsPath } from "data/app-settings-menu";
import Select from "components/select";
import { ColorScheme, useColorScheme } from "hooks/color-scheme";

export type AppHeaderProps = HTMLAttributes<HTMLDivElement> & {
  sticky?: boolean;
  paths?: string[];
};

const themeOptions = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

const AppHeader = ({ sticky, className, paths, ...props }: AppHeaderProps) => {
  const router = useRouter();
  const [menuOpenOnMobile, setMenuOpenOnMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { colorScheme, toggleTheme } = useColorScheme();
  const dropdownMenuItems = useMemo<DropdownMenuType>(
    () => [
      {
        type: "item",
        label: "Dashbaord",
        icon: <MdDashboard />,
        onClick: () => router.push(appDashboardPath),
      },
      {
        type: "separator",
      },
      {
        type: "item",
        label: "New Store",
        icon: <MdAdd />,
        onClick: () => router.push("/new-store"),
      },
      {
        type: "item",
        label: "Settings",
        icon: <MdSettings />,
        onClick: () => router.push(appSettingsPath),
      },
      {
        type: "separator",
      },
      {
        type: "item",
        label: "Theme",
        icon:
          colorScheme === ColorScheme.LIGHT ? (
            <MdLightMode />
          ) : colorScheme === ColorScheme.DARK ? (
            <MdDarkMode />
          ) : (
            <MdComputer />
          ),
        rightElement: (
          <Select
            className="h-8"
            options={themeOptions}
            value={colorScheme}
            onValueChange={(value) => {
              if (value === "system") {
                toggleTheme(ColorScheme.SYSTEM);
              } else if (value === "light") {
                toggleTheme(ColorScheme.LIGHT);
              } else if (value === "dark") {
                toggleTheme(ColorScheme.DARK);
              }
            }}
          />
        ),
      },
      {
        type: "separator",
      },
      {
        type: "item",
        label: "Search",
        icon: <MdSearch />,
      },
      {
        type: "separator",
      },
      {
        type: "item",
        label: "Logout",
        icon: <MdLogout />,
        onClick: () => router.push("/logout"),
      },
    ],
    [router, colorScheme]
  );

  const handleMenuOpenChange = useCallback((open: boolean) => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    setMenuOpenOnMobile(open);
  }, []);

  const onWindowResize = useCallback(() => {
    if (window.innerWidth > 768 && menuOpenOnMobile) {
      handleMenuOpenChange(false);
    }
    if (window.innerWidth < 768 && userDropdownOpen) {
      setUserDropdownOpen(false);
    }
  }, [menuOpenOnMobile, handleMenuOpenChange, userDropdownOpen]);

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);

  return (
    <header
      className={classNames(
        "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14",
        { "sticky top-0 left-0 right-0 z-20": sticky },
        className
      )}
      {...props}
    >
      <Container className="h-full flex items-center">
        <ul className="flex flex-row gap-2 items-center flex-1">
          <li>
            <Link href={`/`}>
              <a className="text-lg font-semibold">MerchCMS</a>
            </Link>
          </li>
          {paths &&
            paths.map((path, i) => (
              <li key={i}>
                <span className="mr-2 text-gray-400 text-lg">/</span>
                <Link href={i > 0 ? `/${paths[i - 1]}/${path}` : `/${path}`}>
                  <a className="text-lg font-semibold">
                    {i < paths.length - 1 ? `${path.slice(0, 2)}...` : path}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <div className="h-full justify-end items-center gap-6 hidden md:flex">
          <ul className="w-full flex items-center justify-end gap-4">
            <li>
              <Link href={`/`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Feedback
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Support
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Docs
                </a>
              </Link>
            </li>
          </ul>
          <Dropdown
            items={dropdownMenuItems}
            side="bottom"
            align="end"
            minWidth={220}
            open={userDropdownOpen}
            onOpenChange={setUserDropdownOpen}
          >
            <button>
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80`}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </button>
          </Dropdown>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center md:hidden"
          onClick={() => handleMenuOpenChange(true)}
        >
          <MdMenu className="text-3xl" />
        </button>
      </Container>
      {menuOpenOnMobile && (
        <FullScreenMenu
          paths={paths}
          onClose={() => handleMenuOpenChange(false)}
        />
      )}
    </header>
  );
};

export default AppHeader;

type FullScreenMenuProps = {
  onClose: () => void;
  paths?: string[];
};
const FullScreenMenu = ({ onClose, paths }: FullScreenMenuProps) => {
  const { colorScheme, toggleTheme } = useColorScheme();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-30 overflow-y-scroll bg-gray-100 dark:bg-gray-900">
      <header className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 sticky top-0 left-0 right-0 z-20">
        <Container className="h-full flex items-center">
          <ul className="flex flex-row gap-2 items-center flex-1">
            <li>
              <Link href={`/`}>
                <a className="text-lg font-semibold" onClick={onClose}>
                  MerchCMS
                </a>
              </Link>
            </li>

            {paths &&
              paths.map((path, i) => (
                <li key={i}>
                  <span className="mr-2 text-gray-400 text-lg">/</span>
                  <Link href={`/${path}`}>
                    <a className="text-lg font-semibold" onClick={onClose}>
                      {path}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
          <button
            className="w-8 h-8 flex items-center justify-center md:hidden"
            onClick={onClose}
          >
            <MdClose className="text-3xl" />
          </button>
        </Container>
      </header>
      <Container className="py-4 space-y-8">
        {fullScreenMenu.map((section) => (
          <section key={section.id}>
            {section.title && (
              <h3 className="font-medium text-lg mb-2">{section.title}</h3>
            )}
            <MenuList menu={section.menu} onItemClick={onClose} />
          </section>
        ))}
        <section>
          <h3 className="font-medium text-lg mb-2">Quick Settings</h3>
          <div className="flex justify-between items-center h-12">
            <span>Change Theme</span>
            <Select
              options={themeOptions}
              value={colorScheme}
              onValueChange={(value) => {
                if (value === "system") {
                  toggleTheme(ColorScheme.SYSTEM);
                } else if (value === "light") {
                  toggleTheme(ColorScheme.LIGHT);
                } else if (value === "dark") {
                  toggleTheme(ColorScheme.DARK);
                }
              }}
            />
          </div>
        </section>
      </Container>
    </div>
  );
};
