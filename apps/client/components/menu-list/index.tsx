import classNames from "classnames";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Menu } from "types";

export interface FullScreenMenuProps extends HTMLAttributes<HTMLDivElement> {
  menu: Menu;
  onItemClick?: (item: string) => void;
}

const MenuList = ({
  className,
  menu,
  onItemClick,
  ...props
}: FullScreenMenuProps) => {
  return (
    <nav
      className={classNames("w-full grid -space-y-[1px]", className)}
      {...props}
    >
      {menu.map((item) => {
        return (
          <Link key={item.id} href={item.href} passHref>
            <a
              className={classNames(
                "w-full flex items-center justify-start text-left p-4 bg-white border border-gray-200 hover:z-[2] hover:border-gray-400"
              )}
              onClick={() => {
                if (onItemClick) {
                  onItemClick(item.id);
                }
              }}
            >
              <p className="flex-1 truncate">{item.label}</p>
              <MdArrowForwardIos />
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

export default MenuList;
