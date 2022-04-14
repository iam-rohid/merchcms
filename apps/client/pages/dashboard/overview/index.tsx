import classNames from "classnames";
import React, { ReactElement, useMemo, useState } from "react";
import {
  MdAdd,
  MdArrowDropDown,
  MdGridView,
  MdList,
  MdSearch,
} from "react-icons/md";
import StoreCard from "../../../components/cards/store-card";
import Container from "../../../components/container";
import { userDashboardMenu } from "../../../data/user-dashboard-menu";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import { Store } from "../../../types";

const stores: Store[] = [
  {
    id: "store-1",
    name: "Store 1",
    description: "This is my store description",
  },
  {
    id: "store-2",
    name: "Store 2",
    description: "This is my store description",
  },
  {
    id: "store-3",
    name: "Store 3",
    description: "This is my store description",
  },
  {
    id: "store-4",
    name: "Store 4",
    description: "This is my store description",
  },
  {
    id: "store-5",
    name: "Store 5",
    description: "This is my store description",
  },
];

const OverviewPage = () => {
  const [gridView, setGridView] = useState(true);
  const [searchText, setSearchText] = useState("");

  const filteredStoreList = useMemo(
    () =>
      searchText
        ? stores.filter(
            (store) =>
              store.name.toLowerCase().includes(searchText.toLowerCase()) ||
              store.id.toLowerCase().includes(searchText.toLowerCase()) ||
              store.description.toLowerCase().includes(searchText.toLowerCase())
          )
        : stores,
    [searchText]
  );

  return (
    <Container className="space-y-8 my-8">
      <section id="search" className="flex gap-4 h-12">
        <div className="relative flex-1 h-full">
          <label
            htmlFor="search-input"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-gray-600"
          >
            <MdSearch />
          </label>
          <input
            id="search-input"
            type="text"
            className="w-full h-full px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-10 placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button className="h-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-6 flex items-center gap-2">
          <MdAdd className="text-2xl" />
          New Store
        </button>
      </section>
      <section id="stores" className="space-y-8">
        <div className="flex gap-4 justify-between items-center">
          <button className="h-10 bg-white dark:bg-gray-900 dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-4 flex items-center gap-2 text-sm">
            All Stores
            <MdArrowDropDown className="text-xl" />
          </button>
          <div className="flex-1"></div>
          <button className="h-10 bg-white dark:bg-gray-900 dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-4 flex items-center gap-2 text-sm">
            Date Created
            <MdArrowDropDown className="text-xl" />
          </button>
          <div className="flex -space-x-[1px]">
            <button
              className={classNames(
                "h-10 w-10 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:z-[1] focus:z-[1]",
                {
                  "text-gray-900 dark:text-white": gridView,
                  "text-gray-400 dark:text-gray-600": !gridView,
                }
              )}
              onClick={() => setGridView(true)}
            >
              <MdGridView className="text-xl" />
            </button>
            <button
              className={classNames(
                "h-10 w-10 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:z-[1] focus:z-[1]",
                {
                  "text-gray-900 dark:text-white": !gridView,
                  "text-gray-400 dark:text-gray-600": gridView,
                }
              )}
              onClick={() => setGridView(false)}
            >
              <MdList className="text-xl" />
            </button>
          </div>
        </div>
        <div
          className={classNames("grid", {
            "sm:grid-cols-2 lg:grid-cols-3 -space-y-[1px] sm:space-y-0 sm:gap-4 lg:gap-8":
              gridView,
            "-space-y-[1px]": !gridView,
          })}
        >
          {filteredStoreList.map((store) => (
            <StoreCard key={store.id} store={store} gridView={gridView} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default OverviewPage;

OverviewPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="overview">
        {page}
      </DashboardLayout>
    </AppLayout>
  );
};
