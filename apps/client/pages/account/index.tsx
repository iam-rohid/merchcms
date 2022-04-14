import React, { ReactElement, useCallback, useEffect, useState } from "react";
import MenuList from "components/menu-list";
import { accountSettingsMenu } from "data/account-settings-menu";
import { userDashboardMenu } from "data/user-dashboard-menu";
import AppLayout from "layouts/app-layout";
import DashboardLayout from "layouts/dashbaord-layout";
import SettingsLayout from "layouts/settings-layout";
import { CustomNextPage } from "types";
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
    return <MenuList menu={accountSettingsMenu} />;
  }

  return <GeneralPage />;
};

export default SettingsPage;

SettingsPage.getLayout = (page: ReactElement) => {
  return (
    <AppLayout>
      <DashboardLayout menu={userDashboardMenu} active="settings">
        <SettingsLayout menu={accountSettingsMenu} active="general">
          {page}
        </SettingsLayout>
      </DashboardLayout>
    </AppLayout>
  );
};
