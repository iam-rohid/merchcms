import classNames from "classnames";
import Button from "components/button";
import Container from "components/container";
import Link from "next/link";
import React from "react";

export type HomeHeaderProps = {
  stikyHeader?: boolean;
};

const HomeHeader = ({ stikyHeader }: HomeHeaderProps) => {
  return (
    <nav
      className={classNames("bg-gray-50 dark:bg-gray-900", {
        "sticky top-0 left-0 right-0 z-20": stikyHeader,
      })}
    >
      <Container className="h-14 flex items-center gap-4">
        <Link href={`/`}>
          <a className="text-lg font-semibold">MerchCMS</a>
        </Link>
        <div className="flex-1 flex items-center gap-4 justify-end">
          <ul className="w-full flex items-center justify-end gap-4">
            <li>
              <Link href={`/`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Feedback
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Support
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  Docs
                </a>
              </Link>
            </li>

            <li>
              <Link href={`/login`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <Button as="span" variant="outline" size="small">
                    Log In
                  </Button>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/signup`}>
                <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <Button as="span" size="small">
                    Sign Up
                  </Button>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default HomeHeader;
