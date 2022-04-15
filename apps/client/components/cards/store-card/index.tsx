import classNames from "classnames";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { Store } from "types";

export type StoreCardProps = HTMLAttributes<HTMLAnchorElement> & {
  store: Store;
  gridView?: boolean;
};

const StoreCard = ({
  store,
  gridView = true,
  className,
  ...props
}: StoreCardProps) => {
  return (
    <Link href={`/${store.id}`}>
      <a
        className={classNames(
          "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 items-center flex flex-col gap-4 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer hover:z-[1] focus:z-[1]",
          className
        )}
        {...props}
      >
        <div
          className={classNames("flex gap-4 w-full", {
            "flex-col md:flex-row items-start md:items-center": gridView,
          })}
        >
          <div
            className={classNames(
              "rounded-full bg-gray-900 text-gray-50 text-lg font-semibold items-center justify-center flex",
              {
                "w-12 md:w-14 h-12 md:h-14": gridView,
                "w-12 h-12": !gridView,
              }
            )}
          >
            {store.name[0]}
          </div>
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            <h3 className="truncate font-medium">{store.name}</h3>
            <p className="truncate text-gray-500 dark:text-gray-400">
              {store.id}.merchcms.com
            </p>
          </div>
        </div>
        {gridView && (
          <p className="truncate w-full text-gray-500 dark:text-gray-400">
            {store.description}
          </p>
        )}
      </a>
    </Link>
  );
};

export default StoreCard;
