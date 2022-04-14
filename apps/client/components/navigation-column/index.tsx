import classNames from "classnames";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { Menu } from "types";

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
          <Link key={item.id} href={item.href} passHref>
            <a
              className={classNames(
                "w-full h-10 flex items-center justify-start text-left px-4 border-r",
                {
                  "text-gray-900 border-gray-900": isActive,
                  "text-gray-600 hover:text-gray-900 border-white": !isActive,
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
