import classNames from "classnames";
import React, {
  DetailedHTMLProps,
  FC,
  forwardRef,
  HTMLAttributes,
} from "react";

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

// eslint-disable-next-line react/display-name
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={classNames("max-w-6xl w-full mx-auto px-4", className)}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Container;
