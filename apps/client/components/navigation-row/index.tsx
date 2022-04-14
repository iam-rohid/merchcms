import classNames from "classnames";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { Menu } from "../../types";
import Container from "../container";

interface NavigationRowProps extends HTMLAttributes<HTMLDivElement> {
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
  return (
    <nav
      className={classNames(
        "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 -mt-3 h-12 w-full",
        { "sticky top-0 left-0 right-0 z-20": sticky },
        className
      )}
      {...props}
    >
      <Container className="h-full flex items-center gap-6">
        <ul className="flex flex-row gap-6 h-full items-center">
          {menu.map((item) => {
            const routeMatch = item.href === active;
            return (
              <li className="h-full" key={item.href}>
                <Link href={item.href}>
                  <a
                    className={classNames(
                      "h-full flex items-center justify-center border-b",
                      {
                        "border-gray-900 text-gray-900": routeMatch,
                        "border-white text-gray-600 hover:text-gray-900":
                          !routeMatch,
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
