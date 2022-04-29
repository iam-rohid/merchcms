import {
  Content,
  DropdownMenuContentProps,
} from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import React from "react";
import { DropdownMenuType } from "src/types/dropdown-menu.type";
import DropdownItem from "./dropdown-item";
import DropdownLabel from "./dropdown-label";
import DropdownSeparator from "./dropdown-separator";

export type DropdownContentProps = DropdownMenuContentProps & {
  menu: DropdownMenuType;
  minWidth?: number;
  maxWidth?: number;
};

const DropdownContent = ({
  menu,
  className,
  minWidth = 180,
  maxWidth = 320,
  ...props
}: DropdownContentProps) => {
  return (
    <Content
      className={classNames(
        "bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl py-2",
        className
      )}
      style={{
        minWidth,
        maxWidth,
      }}
      {...props}
    >
      {menu.map((item, i) => {
        if (item.type === "separator") {
          return <DropdownSeparator key={i} />;
        }
        if (item.type === "item") {
          return <DropdownItem key={i} item={item} />;
        }
        if (item.type === "label") {
          return <DropdownLabel key={i} item={item} />;
        }
      })}
    </Content>
  );
};

export default DropdownContent;
