import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
}

const Container = ({
  className,
  maxWidth = "6xl",
  ...props
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        "w-full mx-auto px-4",
        {
          "max-w-xs": maxWidth === "xs",
          "max-w-sm": maxWidth === "sm",
          "max-w-md": maxWidth === "md",
          "max-w-lg": maxWidth === "lg",
          "max-w-xl": maxWidth === "xl",
          "max-w-2xl": maxWidth === "2xl",
          "max-w-3xl": maxWidth === "3xl",
          "max-w-4xl": maxWidth === "4xl",
          "max-w-5xl": maxWidth === "5xl",
          "max-w-6xl": maxWidth === "6xl",
          "max-w-7xl": maxWidth === "7xl",
          "max-w-full": maxWidth === "full",
        },
        className
      )}
      {...props}
    />
  );
};
export default Container;
