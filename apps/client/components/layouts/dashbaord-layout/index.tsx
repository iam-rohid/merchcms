import { ReactNode } from "react";
import NavigationRow from "components/navigation-row";
import { Menu } from "src/types";
import { Box } from "@chakra-ui/react";

export type DashboardLayoutProps = {
  children: ReactNode;
  stickyNav?: boolean;
  active: string;
  menu: Menu;
};

const DashboardLayout = ({ children, active, menu }: DashboardLayoutProps) => {
  return (
    <>
      <Box position="sticky" top={0} zIndex="120" mt={-1}>
        <NavigationRow menu={menu} active={active} />
      </Box>
      <main className="min-h-[calc(100vh-3.5rem-3rem+0.75rem)]">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
