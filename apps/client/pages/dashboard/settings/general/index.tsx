import { CustomNextPage } from "src/types";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import Button from "components/button";
import Image from "next/image";
import { MdCopyAll } from "react-icons/md";
import SEO from "components/SEO";

const GeneralPage: CustomNextPage = () => {
  return (
    <div className="space-y-4 md:space-y-8">
      <section
        id="username"
        className="w-full bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 md:p-8"
      >
        <form className="space-y-4">
          <div className="space-y-4">
            <label htmlFor="username-input">
              <h2 className="text-xl mb-2">Your Username</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                This is your URL namespace within MerchCMS
              </p>
            </label>
            <input
              id="username-input"
              type="text"
              placeholder="johndoe123"
              className="w-full h-10 px-4 bg-gray-50  dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Save
          </Button>
        </form>
      </section>
      <section
        id="name"
        className="w-full bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 md:p-8"
      >
        <form className="space-y-4">
          <div className="space-y-4">
            <label htmlFor="name-input">
              <h2 className="text-xl mb-2">Your Name</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Please enter your full name or a display name you are
                comportable with.
              </p>
            </label>
            <input
              id="name-input"
              type="text"
              placeholder="John Doe"
              className="w-full h-10 px-4 bg-gray-50  dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Save
          </Button>
        </form>
      </section>
      <section
        id="email"
        className="w-full bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 md:p-8"
      >
        <form className="space-y-4">
          <div className="space-y-4">
            <label htmlFor="email-input">
              <h2 className="text-xl mb-2">Your Email</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Please enter the email address you want to use to log in with
                MerchCMS.
              </p>
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="john@example.com"
              className="w-full h-10 px-4 bg-gray-50  dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Save
          </Button>
        </form>
      </section>
      <section
        id="avatar"
        className="w-full bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 md:p-8"
      >
        <form className="flex gap-4">
          <div className="flex-1">
            <h2 className="text-xl mb-2">Your Avatar</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              This is your avatar. <br />
              Click on the avatar to upload a custom one from your files.
            </p>
          </div>
          <div>
            <label htmlFor="avatar-picker">
              <div className="w-32 h-32 rounded-full bg-gray-100 relative overflow-hidden cursor-pointer group">
                <Image
                  src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80`}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute z-[1] w-full h-full inset-0 group-hover:bg-black/20 transition-colors duration-150"></div>
              </div>
            </label>
            <input
              id="avatar-picker"
              type="file"
              className="invisible w-0 h-0 fixed"
            />
          </div>
        </form>
      </section>

      <section
        id="userid"
        className="w-full bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 md:p-8"
      >
        <form className="space-y-4">
          <div className="space-y-4">
            <label htmlFor="userid-input">
              <h2 className="text-xl mb-2">Your UserId</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                This is your userid. It is used to identify you within MerchCMS.
              </p>
            </label>
            <div className="flex">
              <input
                id="userid-input"
                type="text"
                placeholder="asdfjlasjdlfjoi02323nlwk3"
                disabled
                className="w-full h-10 px-4 bg-gray-100 dark:bg-gray-700 outline-none border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500 flex-1"
              />
              <button
                type="button"
                className="h-10 w-10 flex items-center justify-center text-2xl border border-gray-200 dark:border-gray-700"
              >
                <MdCopyAll />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Delete Account */}
      <section
        id="delete-account"
        className="w-full bg-gray-50 border border-red-500 dark:bg-gray-800 dark:border-red-500 p-4 md:p-8 space-y-4"
      >
        <div>
          <h2 className="text-xl mb-2">Delete Your Account</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Permanently delete your personal account and all of it’s content
            from MerchCMS. This acction is not reversible, so please continue
            with caution.
          </p>
        </div>
        <Button type="submit" className="ml-auto" colorScheme="danger">
          Delete Account
        </Button>
      </section>
    </div>
  );
};

export default GeneralPage;

GeneralPage.getLayout = (page) => (
  <>
    <SEO title="General Settings" />
    <AppSettingsLayout children={page} id="general" />
  </>
);
