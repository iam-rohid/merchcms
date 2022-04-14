import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={classNames("max-w-5xl w-full mx-auto px-4", className)}
      {...props}
    />
  );
};
export default Container;
