import React from "react";
import * as SelectPrimitives from "@radix-ui/react-select";
import { MdArrowDropDown, MdCheck } from "react-icons/md";
import classNames from "classnames";

export type SelectProps = SelectPrimitives.SelectProps & {
  options: { id: string; label: string }[];
  className?: string;
};

const Select = ({ options, className, ...props }: SelectProps) => {
  return (
    <SelectPrimitives.Root {...props}>
      <SelectPrimitives.Trigger
        className={classNames(
          "h-10 bg-white dark:bg-gray-900 dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-4 flex items-center gap-2 text-sm",
          className
        )}
      >
        <SelectPrimitives.Value />
        <SelectPrimitives.Icon>
          <MdArrowDropDown className="text-xl" />
        </SelectPrimitives.Icon>
      </SelectPrimitives.Trigger>
      <SelectPrimitives.Content className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl py-2">
        <SelectPrimitives.Viewport>
          {options.map((option) => (
            <SelectPrimitives.Item
              key={option.id}
              value={option.id}
              className="flex items-center gap-2 pr-4 pl-8 h-10 w-full hover:bg-gray-100 dark:hover:bg-gray-700 outline-none focus:bg-gray-100 dark:focus:bg-gray-700 relative cursor-pointer select-none"
            >
              <SelectPrimitives.ItemText className="flex-1 w-full truncate">
                {option.label}
              </SelectPrimitives.ItemText>
              <SelectPrimitives.ItemIndicator className="absolute left-2 top-1/2 -translate-y-1/2">
                <MdCheck />
              </SelectPrimitives.ItemIndicator>
            </SelectPrimitives.Item>
          ))}
        </SelectPrimitives.Viewport>
      </SelectPrimitives.Content>
    </SelectPrimitives.Root>
  );
};

export default Select;
