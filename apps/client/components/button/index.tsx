import classNames from "classnames";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { ReactNode } from "react";

export interface ButtonProps<T extends ElementType> {
  as?: T;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline" | "ghost";
  colorScheme?: "primary" | "secondary" | "success" | "danger" | "warning";
  truncate?: boolean;
  iconsOnTheEdge?: boolean;
}

const Button = <T extends ElementType = "button">({
  as,
  leftIcon,
  rightIcon,
  size = "medium",
  variant = "solid",
  colorScheme = "primary",
  className,
  children,
  truncate,
  iconsOnTheEdge,
  ...props
}: ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = as || "button";
  return (
    <Component
      className={classNames(
        "cursor-pointer select-none flex items-center justify-center overflow-hidden ring-1 relative outline-none",
        {
          "bg-primary-500 dark:bg-primary-400": colorScheme === "primary",
          "text-gray-50 dark:text-gray-900":
            colorScheme === "primary" && variant === "solid",
          "dark:text-gray-50 text-gray-900":
            colorScheme === "primary" && variant === "outline",
          "bg-red-500 dark:bg-red-500 border-red-500 dark:border-red-500":
            colorScheme === "danger",
          "text-gray-50 dark:text-gray-50":
            colorScheme === "danger" && variant === "solid",
          "dark:text-red-500 text-red-500":
            colorScheme === "danger" && variant === "outline",
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
            "absolute left-4 top-1/2 -translate-y-1/2": iconsOnTheEdge,
          })}
        >
          {leftIcon}
        </span>
      )}
      <span
        className={classNames("whitespace-nowrap", {
          truncate: truncate,
          "pl-8": iconsOnTheEdge,
          "pr-8": iconsOnTheEdge,
        })}
      >
        {children}
      </span>
      {rightIcon && (
        <span
          className={classNames({
            "text-lg": size === "small",
            "text-xl": size === "medium",
            "text-2xl": size === "large",
            "absolute right-4 top-1/2 -translate-y-1/2": iconsOnTheEdge,
          })}
        >
          {rightIcon}
        </span>
      )}
    </Component>
  );
};

export default Button;
