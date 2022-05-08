import React, { useCallback, useEffect, useState } from "react";
import MenuList from "components/menu-list";
import { appSettingsMenu } from "src/data/app-settings-menu";
import { CustomNextPage } from "src/types";
import GeneralPage from "./general";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import SEO from "components/SEO";
import { Hide, Show, useMediaQuery } from "@chakra-ui/react";

const SettingsPage: CustomNextPage = () => {
  return (
    <>
      <Hide below="md">
        <GeneralPage />
      </Hide>
      <Show below="md">
        <MenuList menu={appSettingsMenu} />
      </Show>
    </>
  );
};

export default SettingsPage;

SettingsPage.getLayout = (page) => (
  <>
    <SEO title="Settings" />
    <AppSettingsLayout showBackLink={false} children={page} id="general" />
  </>
);
