import React, { useCallback, useEffect, useState } from "react";
import MenuList from "components/menu-list";
import { appSettingsMenu } from "src/data/app-settings-menu";
import { CustomNextPage } from "src/types";
import GeneralPage from "./general";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import SEO from "components/SEO";

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
    return <MenuList menu={appSettingsMenu} />;
  }

  return <GeneralPage />;
};

export default SettingsPage;

SettingsPage.getLayout = (page) => (
  <>
    <SEO title="Settings" />
    <AppSettingsLayout showBackLink={false} children={page} id="general" />
  </>
);
