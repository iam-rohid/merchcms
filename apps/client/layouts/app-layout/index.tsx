import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../../components/container";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14">
        <Container className="h-full flex gap-6 items-center">
          <ul className="flex flex-row gap-2 items-center">
            <li>
              <Link href={`/`}>
                <a className="text-lg font-semibold">MerchCMS</a>
              </Link>
            </li>
            {/* <li className="text-gray-400 dark:text-gray-600">/</li>
            <li>
              <Link href={`/`}>
                <a className="text-lg font-semibold">my-store</a>
              </Link>
            </li> */}
          </ul>
          <ul className="flex-1 w-full flex items-center justify-end gap-4">
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
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
              <Image
                src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80`}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
        </Container>
      </header>
      <main className="min-h-[calc(100vh-56px)]">{children}</main>
      <footer
        className={`bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 h-32 w-full`}
      ></footer>
    </>
  );
};

export default AppLayout;
