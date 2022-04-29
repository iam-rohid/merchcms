import React from "react";
import * as DropdownPrimitives from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { DropdownMenuType } from "src/types/dropdown-menu.type";
import DropdownContent from "./dropdown-content";

export type DropdownProps = DropdownPrimitives.DropdownMenuProps & {
  children: ReactNode;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  minWidth?: number;
  maxWidth?: number;
  items: DropdownMenuType;
};

const Dropdown = ({
  children,
  align,
  alignOffset,
  side,
  sideOffset,
  className,
  minWidth,
  maxWidth,
  items,
  ...props
}: DropdownProps) => {
  return (
    <DropdownPrimitives.Root {...props}>
      <DropdownPrimitives.Trigger asChild>
        {children}
      </DropdownPrimitives.Trigger>
      <DropdownContent
        menu={items}
        className={className}
        minWidth={minWidth}
        maxWidth={maxWidth}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      />
    </DropdownPrimitives.Root>
  );
};

export default Dropdown;
