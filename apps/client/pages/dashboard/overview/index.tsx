import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { MdAdd, MdGridView, MdList, MdSearch } from "react-icons/md";
import StoreCard from "components/cards/store-card";
import Container from "components/container";
import { CustomNextPage, Store } from "types";
import AppDashboardLayout from "layouts/common-layouts/app-dashboard-layout";
import Select from "components/select";
import Button from "components/button";
import Link from "next/link";
import SEO from "components/SEO";

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
    <Container className="space-y-4 md:space-y-8 my-8">
      <section id="search" className="flex gap-4 h-12">
        <div className="relative flex-1 h-full">
          <label
            htmlFor="search-input"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-gray-500"
          >
            <MdSearch />
          </label>
          <input
            id="search-input"
            type="text"
            className="w-full h-full px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-10 placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:border-gray-400 dark:focus:border-gray-500"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Link href="/new-store" passHref>
          <Button as="a" leftIcon={<MdAdd />} size="large">
            New Store
          </Button>
        </Link>
      </section>
      <section>
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
                  "h-10 w-10 flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:z-[1] focus:z-[1]",
                  {
                    "text-gray-900 dark:text-gray-50": gridView,
                    "text-gray-400 dark:text-gray-500": !gridView,
                  }
                )}
                onClick={() => setGridView(true)}
              >
                <MdGridView className="text-xl" />
              </button>
              <button
                className={classNames(
                  "h-10 w-10 flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:z-[1] focus:z-[1]",
                  {
                    "text-gray-900 dark:text-gray-50": !gridView,
                    "text-gray-400 dark:text-gray-500": gridView,
                  }
                )}
                onClick={() => setGridView(false)}
              >
                <MdList className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="stores">
        <div
          className={classNames("grid", {
            "grid-cols-2 md:grid-cols-3 sm:space-y-0 gap-4 md:gap-8": gridView,
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
  <>
    <SEO title="Overview" />
    <AppDashboardLayout children={page} id="overview" />
  </>
);
