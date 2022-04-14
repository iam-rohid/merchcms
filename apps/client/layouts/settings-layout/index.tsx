import classNames from "classnames";
import Link from "next/link";
import React, { HTMLAttributes, ReactNode } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import Container from "../../components/container";
import NavigationColumn from "../../components/navigation-column";
import { Menu } from "../../types";

export type SettingsLayoutProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  active: string;
  menu: Menu;
  backLink?: string;
  backLabel?: string;
};

const SettingsLayout = ({
  children,
  active,
  menu,
  backLabel,
  backLink,
  className,
  ...props
}: SettingsLayoutProps) => {
  return (
    <Container className={classNames("px-0", className)} {...props}>
      <div className="relative min-h-screen">
        <div className="absolute w-64 left-0 top-0 py-8 h-full border-r border-gray-200 md:block hidden">
          <div className="bg-white absolute right-0 top-0 h-full w-screen -z-20" />
          <NavigationColumn menu={menu} active={active} />
        </div>
        <div className="md:ml-64 p-4 md:p-8">
          {backLink && (
            <Link href={backLink}>
              <a className="md:hidden font-medium mb-4 flex items-center gap-2">
                <MdArrowBackIosNew className="text-xl" />
                {backLabel || "Back"}
              </a>
            </Link>
          )}
          {children}
        </div>
      </div>
    </Container>
  );
};

export default SettingsLayout;
