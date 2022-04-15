import classNames from "classnames";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { FC } from "react";
import { ReactNode } from "react";
import { HTMLAttributes } from "react";

export interface ButtonProps<T extends ElementType> {
  as?: T;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline" | "ghost";
  colorScheme?: "primary" | "secondary" | "success" | "danger" | "warning";
  truncate?: boolean;
}

function Button<T extends ElementType = "button">({
  as,
  leftIcon,
  rightIcon,
  size = "medium",
  variant = "solid",
  colorScheme = "primary",
  className,
  children,
  truncate,
  ...props
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as || "button";
  return (
    <Component
      className={classNames(
        "cursor-pointer select-none flex items-center justify-center overflow-hidden border",
        {
          "bg-gray-900 dark:bg-gray-50 border-gray-900 dark:border-gray-50":
            colorScheme === "primary",
          "text-gray-50 dark:text-gray-900":
            colorScheme === "primary" && variant === "solid",
          "dark:text-gray-50 text-gray-900":
            colorScheme === "primary" && variant === "outline",
        },
        {
          "bg-opacity-100 dark:bg-opacity-100": variant === "solid",
          "bg-opacity-0 dark:bg-opacity-0": variant === "outline",
        },
        {
          "px-3 gap-1.5 h-8 text-sm font-normal": size === "small",
          "px-4 gap-2 h-10 font-medium": size === "medium",
          "px-5 gap-3 h-12 text-lg font-medium": size === "large",
        },
        className
      )}
      {...props}
    >
      {leftIcon && (
        <span
          className={classNames({
            "text-lg": size === "small",
            "text-xl": size === "medium",
            "text-2xl": size === "large",
          })}
        >
          {leftIcon}
        </span>
      )}
      <span className={classNames("whitespace-nowrap", { truncate: truncate })}>
        {children}
      </span>
      {rightIcon && (
        <span
          className={classNames({
            "text-lg": size === "small",
            "text-xl": size === "medium",
            "text-2xl": size === "large",
          })}
        >
          {rightIcon}
        </span>
      )}
    </Component>
  );
}

export default Button;
