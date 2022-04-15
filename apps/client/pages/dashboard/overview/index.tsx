import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { MdAdd, MdGridView, MdList, MdSearch } from "react-icons/md";
import StoreCard from "components/cards/store-card";
import Container from "components/container";
import { CustomNextPage, Store } from "types";
import AppDashboardLayout from "layouts/common-layouts/app-dashboard-layout";
import Select from "components/select";

const stores: Store[] = [
  {
    id: "my-store-1",
    name: "Store 1",
    description: "This is my store description",
  },
  {
    id: "my-store-2",
    name: "Store 2",
    description: "This is my store description",
  },
  {
    id: "my-store-3",
    name: "Store 3",
    description: "This is my store description",
  },
];
const filterOptions = [
  {
    id: "all",
    label: "All Stores",
  },
  {
    id: "public",
    label: "Public",
  },
  {
    id: "private",
    label: "Private",
  },
];
const orderOptions = [
  {
    id: "date-created",
    label: "Date Created",
  },
  {
    id: "date-updated",
    label: "Date Updated",
  },
  {
    id: "a-z",
    label: "A-Z",
  },
  {
    id: "z-a",
    label: "Z-A",
  },
];
const OverviewPage: CustomNextPage = () => {
  const [gridView, setGridView] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState(filterOptions[0].id);
  const [orderBy, setOrderBy] = useState(orderOptions[0].id);

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
          <Select
            options={filterOptions}
            value={filterBy}
            onValueChange={setFilterBy}
          />
          <div className="flex-1 flex justify-end items-center gap-4">
            <Select
              options={orderOptions}
              value={orderBy}
              onValueChange={setOrderBy}
            />
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

OverviewPage.getLayout = (page) => (
  <AppDashboardLayout children={page} id="overview" />
);
