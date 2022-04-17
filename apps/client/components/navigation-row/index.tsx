import classNames from "classnames";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { Menu } from "types";
import Container from "components/container";
import { useRouter } from "next/router";

export interface NavigationRowProps extends HTMLAttributes<HTMLDivElement> {
  menu: Menu;
  active: string;
  sticky?: boolean;
}

const NavigationRow = ({
  menu,
  className,
  active,
  sticky,
  ...props
}: NavigationRowProps) => {
  const { query } = useRouter();
  return (
    <nav
      className={classNames(
        "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-12 w-full overflow-x-auto",
        {
          "sticky top-0 left-0 right-0 z-20": sticky,
        },
        className
      )}
      {...props}
    >
      <Container className="h-full flex items-center gap-6 px-0">
        <ul className="flex flex-row gap-6 h-full items-center px-4">
          {menu.map((item) => {
            const isActive = item.id === active;

            return (
              <li className="h-full" key={item.href}>
                <Link
                  href={{
                    pathname: item.href,
                    query,
                  }}
                >
                  <a
                    className={classNames(
                      "h-full flex items-center justify-center border-b",
                      {
                        "border-gray-900 text-gray-900 dark:text-gray-50 dark:border-gray-50":
                          isActive,
                        "border-white text-gray-500 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-50":
                          !isActive,
                      }
                    )}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
};

export default NavigationRow;
