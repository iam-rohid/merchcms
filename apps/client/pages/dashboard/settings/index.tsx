import React, { ReactElement, useCallback, useEffect, useState } from "react";
import FullScreenMenu from "../../../components/full-screen-menu";
import { accountSettingsMenu } from "../../../data/account-settings-menu";
import AppLayout from "../../../layouts/app-layout";
import DashboardLayout from "../../../layouts/dashbaord-layout";
import SettingsLayout from "../../../layouts/settings-layout";
import { CustomNextPage } from "../../../types";
import OverviewPage from "./overview";

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
    return <FullScreenMenu menu={accountSettingsMenu} />;
  }

  return <OverviewPage />;
};

export default SettingsPage;

SettingsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout active="settings">
        <div className="md:hidden">{page}</div>
        <SettingsLayout
          className="hidden md:block"
          menu={accountSettingsMenu}
          active="overview"
        >
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
