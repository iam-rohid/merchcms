import MenuList from "components/menu-list";
import { storeSettingsMenu } from "data/store-settings-menu";
import StoreSettingsLayout from "layouts/common-layouts/store-settings-layout";
import React, { useCallback, useEffect, useState } from "react";
import { CustomNextPage } from "types/next.type";
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
  <StoreSettingsLayout showBackLink={false} children={page} id="general" />
);
