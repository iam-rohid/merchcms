import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuTriggerItem,
  Item,
  Root,
} from "@radix-ui/react-dropdown-menu";
import { DropdownItemType } from "types/dropdown-menu.type";
import DropdownContent from "./dropdown-content";
import { MdChevronRight } from "react-icons/md";
import classNames from "classnames";

const DropdownItem = ({ item }: { item: DropdownItemType }) => {
  if (item.submenu) {
    return (
      <Root>
        <DropdownMenuTriggerItem
          onClick={item.onClick}
          disabled={item.disabled || !item.onClick}
          className={classNames(
            "relative outline-none flex items-center gap-4 px-4 h-10",
            {
              "bg-transparent dark:bg-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed pointer-events-none":
                item.disabled,
              "hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-400 focus:text-gray-900 dark:focus:text-gray-50 cursor-pointer":
                !item.disabled && item.onClick,
            }
          )}
        >
          <span className="flex-1 truncate">{item.label}</span>
          <MdChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl" />
          {item.rightElement}
        </DropdownMenuTriggerItem>
        <DropdownContent alignOffset={-10} menu={item.submenu} />
      </Root>
    );
  }
  return (
    <Item
      onClick={item.onClick}
      disabled={item.disabled || !item.onClick}
      className={classNames(
        "relative outline-none flex items-center gap-4 px-4 h-10",
        {
          "bg-transparent dark:bg-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed pointer-events-none":
            item.disabled,
          "hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-400 focus:text-gray-900 dark:focus:text-gray-50 cursor-pointer":
            !item.disabled && item.onClick,
        }
      )}
    >
      <span className="text-2xl">{item.icon}</span>
      <span className="flex-1 truncate">{item.label}</span>
      {item.rightElement}
    </Item>
  );
};

export default DropdownItem;
