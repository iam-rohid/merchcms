import MenuList from "components/menu-list";
import SEO from "components/SEO";
import { storeSettingsMenu } from "src/data/store-settings-menu";
import StoreSettingsLayout from "components/layouts/common-layouts/store-settings-layout";
import React, { useCallback, useEffect, useState } from "react";
import { CustomNextPage } from "src/types/next.type";
import GeneralPage from "./general";

const SettingsPage: CustomNextPage = () => {
  const isMobile = useCallback(
    () => () =>
      (typeof window !== "undefined" && window.innerWidth < 768) || false,
    []
  );

  const [mobile, setMobile] = useState(isMobile());
  const onWindwoResize = useCallback(() => {
    setMobile(isMobile());
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", onWindwoResize);
    return () => {
      window.removeEventListener("resize", onWindwoResize);
    };
  }, [onWindwoResize]);

  if (mobile) {
    return <MenuList menu={storeSettingsMenu} />;
  }

  return <GeneralPage />;
};

export default SettingsPage;

SettingsPage.getLayout = (page) => (
  <>
    <SEO title="Store Settings" />
    <StoreSettingsLayout showBackLink={false} children={page} id="general" />
  </>
);
