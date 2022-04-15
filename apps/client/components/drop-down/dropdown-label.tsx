import { DropdownMenuLabelProps, Label } from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import React from "react";
import { DropdownLabelType } from "types/dropdown-menu.type";

export type DropdownLabelProps = DropdownMenuLabelProps & {
  item: DropdownLabelType;
};
const DropdownLabel = ({ item, className, ...props }: DropdownLabelProps) => {
  return (
    <Label
      className={classNames(
        "px-4 text-xs text-gray-400 dark:text-gray-500 mb-0.5 mt-1",
        className
      )}
      {...props}
    >
      {item.label}
    </Label>
  );
};

export default DropdownLabel;
