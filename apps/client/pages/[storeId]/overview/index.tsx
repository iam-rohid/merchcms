import classNames from "classnames";
import ProductCard from "components/cards/product-card";
import Container from "components/container";
import Select from "components/select";
import StoreDashboardLayout from "layouts/common-layouts/store-dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdAdd, MdGridView, MdList, MdSearch, MdShop } from "react-icons/md";
import { CustomNextPage } from "types/next.type";
import { Product } from "types/product.type";

const products: Product[] = [
  {
    id: "my-product-1",
    name: "Product 1",
    description: "This is my product description",
    price: 100,
    coverImage:
      "https://images.unsplash.com/photo-1527718641255-324f8e2d0421?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
  },
  {
    id: "my-product-2",
    name: "Product 2",
    description: "This is my product description",
    price: 380,
    coverImage:
      "https://images.unsplash.com/photo-1523647341782-d761bce0004c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "my-product-3",
    name: "Product 3",
    description: "This is my product description",
    price: 299,
    coverImage:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
  },
];
const filterOptions = [
  {
    id: "all",
    label: "All Products",
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

const StoreOverviewPage: CustomNextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [gridView, setGridView] = useState(true);
  const [filterBy, setFilterBy] = useState(filterOptions[0].id);
  const [orderBy, setOrderBy] = useState(orderOptions[0].id);
  const {
    query: { storeId },
  } = useRouter();

  return (
    <>
      <div className="w-full py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Container className="flex gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">My Store</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {storeId}.merchcms.com
            </p>
          </div>
          <Link href={`/`}>
            <a
              target="_blank"
              className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-6 flex items-center gap-2 h-12"
            >
              Visit Store
            </a>
          </Link>
        </Container>
      </div>
      <Container className="space-y-4 md:space-y-8 my-4 md:my-8">
        <section id="stack" className="grid md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
            <MdShop className="text-4xl" />
            <div>
              <p className="font-semibold">234</p>
              <p className="text-gray-500 dark:text-gray-400">
                Products Ordered
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
            <MdShop className="text-4xl" />
            <div>
              <p className="font-semibold">234</p>
              <p className="text-gray-500 dark:text-gray-400">
                Products Ordered
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
            <MdShop className="text-4xl" />
            <div>
              <p className="font-semibold">234</p>
              <p className="text-gray-500 dark:text-gray-400">
                Products Ordered
              </p>
            </div>
          </div>
        </section>
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
              className="w-full h-full px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-10 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button className="h-full bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 border border-gray-200 dark:border-gray-700 px-6 flex items-center gap-2">
            <MdAdd className="text-2xl" />
            New Product
          </button>
        </section>
        <section id="filter">
          <div className="flex gap-4 justify-between items-center">
            <Select
              value={filterBy}
              onValueChange={setFilterBy}
              options={filterOptions}
            />
            <div className="flex-1 flex gap-4 justify-end items-center">
              <Select
                value={orderBy}
                onValueChange={setOrderBy}
                options={orderOptions}
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
              "grid-cols-2 md:grid-cols-3 gap-4 md:gap-8": gridView,
              "-space-y-[1px]": !gridView,
            })}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                gridView={gridView}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
};

export default StoreOverviewPage;

StoreOverviewPage.getLayout = (page) => (
  <StoreDashboardLayout children={page} id="overview" />
);
