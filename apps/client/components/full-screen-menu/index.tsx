import classNames from "classnames";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Menu } from "../../types";

export interface FullScreenMenuProps extends HTMLAttributes<HTMLDivElement> {
  menu: Menu;
}

const FullScreenMenu = ({ className, menu, ...props }: FullScreenMenuProps) => {
  return (
    <nav className={classNames("w-full space-y-1", className)} {...props}>
      {menu.map((item) => {
        return (
          <Link key={item.id} href={item.href} passHref>
            <a
              className={classNames(
                "w-full flex items-center justify-start text-left py-4 px-8 bg-white"
              )}
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

export default FullScreenMenu;
