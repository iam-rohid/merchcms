import React, { HTMLAttributes, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "components/container";
import classNames from "classnames";
import { MdClose, MdMenu } from "react-icons/md";
import { fullScreenMenu } from "data/full-screen-menu";
import MenuList from "components/menu-list";

export type AppHeaderProps = HTMLAttributes<HTMLDivElement> & {
  sticky?: boolean;
  paths?: string[];
};

const AppHeader = ({ sticky, className, paths, ...props }: AppHeaderProps) => {
  const [menuOpenOnMobile, setMenuOpenOnMobile] = useState(false);

  const handleMenuOpenChange = useCallback((open: boolean) => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    setMenuOpenOnMobile(open);
  }, []);

  const onWindowResize = useCallback(() => {
    if (window.innerWidth > 768 && menuOpenOnMobile) {
      handleMenuOpenChange(false);
    }
  }, [menuOpenOnMobile, handleMenuOpenChange]);

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);

  return (
    <header
      className={classNames(
        "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14",
        { "sticky top-0 left-0 right-0 z-20": sticky },
        className
      )}
      {...props}
    >
      <Container className="h-full flex items-center">
        <ul className="flex flex-row gap-2 items-center flex-1">
          <li>
            <Link href={`/`}>
              <a className="text-lg font-semibold">MerchCMS</a>
            </Link>
          </li>
          {paths &&
            paths.map((path, i) => (
              <li key={i}>
                <span className="mr-2 text-gray-400 text-lg">/</span>
                <Link href={`/${path}`}>
                  <a className="text-lg font-semibold">{path}</a>
                </Link>
              </li>
            ))}
        </ul>
        <div className="h-full justify-end gap-6 hidden md:flex">
          <ul className="w-full flex items-center justify-end gap-4">
            <li>
              <Link href={`/`}>
                <a className="text-gray-600 hover:text-gray-900">Feedback</a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a className="text-gray-600 hover:text-gray-900">Support</a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a className="text-gray-600 hover:text-gray-900">Docs</a>
              </Link>
            </li>
          </ul>
          <button>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
              <Image
                src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80`}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center md:hidden"
          onClick={() => handleMenuOpenChange(true)}
        >
          <MdMenu className="text-3xl" />
        </button>
      </Container>
      {menuOpenOnMobile && (
        <FullScreenMenu onClose={() => handleMenuOpenChange(false)} />
      )}
    </header>
  );
};

export default AppHeader;

type FullScreenMenuProps = {
  onClose: () => void;
};
const FullScreenMenu = ({ onClose }: FullScreenMenuProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-30 overflow-y-scroll bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14 sticky top-0 left-0 right-0 z-20">
        <Container className="h-full flex items-center">
          <ul className="flex flex-row gap-2 items-center flex-1">
            <li>
              <Link href={`/`}>
                <a className="text-lg font-semibold" onClick={onClose}>
                  MerchCMS
                </a>
              </Link>
            </li>
            {/* <li className="text-gray-400 dark:text-gray-600">/</li>
            <li>
              <Link href={`/`}>
                <a className="text-lg font-semibold">my-store</a>
              </Link>
            </li> */}
          </ul>
          <button
            className="w-8 h-8 flex items-center justify-center md:hidden"
            onClick={onClose}
          >
            <MdClose className="text-3xl" />
          </button>
        </Container>
      </header>
      <Container className="py-4 space-y-4">
        {fullScreenMenu.map((section) => (
          <section key={section.id}>
            {section.title && (
              <h3 className="font-medium text-lg mb-2">{section.title}</h3>
            )}
            <MenuList menu={section.menu} onItemClick={onClose} />
          </section>
        ))}
      </Container>
    </div>
  );
};
