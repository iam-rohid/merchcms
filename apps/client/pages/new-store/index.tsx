import Button from "components/button";
import Container from "components/container";
import SEO from "components/SEO";
import AppLayout from "components/layouts/app-layout";
import React from "react";
import { CustomNextPage } from "src/types/next.type";

const NewStorePage: CustomNextPage = () => {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 pt-8 pb-24 border-b border-gray-200 dark:border-gray-700">
        <Container>
          <h1 className="text-3xl font-semibold mb-4">
            Let's build a merch store
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            repudiandae magnam consequuntur. Commodi natus esse expedita,
            architecto corporis laborum dolorum.
          </p>
        </Container>
      </div>
      <Container maxWidth="2xl" className="-translate-y-16">
        <form className="bg-gray-50 dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-2xl space-y-8">
          <div className="space-y-4">
            <label htmlFor="store-name-input">
              <h2 className="text-xl mb-2">Store Name</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Add a name for your store.
              </p>
            </label>
            <input
              id="store-name-input"
              type="text"
              placeholder="My Store"
              className="w-full h-10 px-4 bg-gray-50 dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="store-id-input">
              <h2 className="text-xl mb-2">Store Id</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Store id will be used to identify your store on the dashboard,
                in the URL (E.g.: <code>merchcms.com/storeid</code>) and as a
                sub-domain for your store URL (E.g.:{" "}
                <code>storeid.merchcms.com</code>).
              </p>
            </label>
            <input
              id="store-id-input"
              type="text"
              placeholder="my-store123"
              className="w-full h-10 px-4 bg-gray-50 dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500 flex-1"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="description-input">
              <h2 className="text-xl mb-2">Store Description</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Add a short description about your store.
              </p>
            </label>
            <textarea
              id="description-input"
              placeholder="Your store description..."
              className="w-full h-24 p-4 bg-gray-50 dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500 flex-1"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Create Store
          </Button>
        </form>
      </Container>
    </>
  );
};

export default NewStorePage;

NewStorePage.getLayout = (page) => (
  <>
    <SEO title="Create a new store" />
    <AppLayout stickyHeader>{page}</AppLayout>
  </>
);
