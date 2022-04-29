import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";
import { Menu } from "src/types";

export interface NavigationColumnProps extends HTMLAttributes<HTMLDivElement> {
  menu: Menu;
  active: string;
  sticky?: boolean;
}

const NavigationColumn = ({
  menu,
  active,
  sticky = true,
  className,
  ...props
}: NavigationColumnProps) => {
  const { query } = useRouter();
  return (
    <nav
      className={classNames(
        "w-full",
        {
          "sticky top-20 left-0 right-0": sticky,
        },
        className
      )}
      {...props}
    >
      {menu.map((item) => {
        const isActive = item.id === active;

        return (
          <Link
            key={item.id}
            href={{
              pathname: item.href,
              query,
            }}
            passHref
          >
            <a
              className={classNames(
                "w-full h-10 flex items-center justify-start text-left px-4 border-r",
                {
                  "text-gray-900 border-gray-900 dark:text-gray-50 dark:border-gray-50":
                    isActive,
                  "text-gray-500 hover:text-gray-900 border-white dark:text-gray-400 dark:hover:text-gray-50 dark:border-gray-800":
                    !isActive,
                }
              )}
            >
              <p className="flex-1 truncate">{item.label}</p>
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationColumn;
