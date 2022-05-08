import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import NavigationColumn from "components/navigation-column";
import { Menu } from "src/types";
import { useRouter } from "next/router";
import { Box, Button, Container, Hide, Icon, Show } from "@chakra-ui/react";
import { ReactNode } from "react";

export type SettingsLayoutProps = {
  children: ReactNode;
  active: string;
  menu: Menu;
  backLink?: string;
  backLabel?: string;
};

const SettingsLayout = ({
  children,
  active,
  menu,
  backLabel,
  backLink,
}: SettingsLayoutProps) => {
  const { query } = useRouter();
  return (
    <Container maxW="container.lg" position="relative" display="flex" gap={4}>
      <Hide below="md">
        <Box>
          <Box width={"260px"} position="sticky" top={"64px"}>
            <NavigationColumn menu={menu} active={active} />
          </Box>
        </Box>
      </Hide>
      <Box flex={1}>
        {backLink && (
          <Show below="md">
            <Link
              href={{
                pathname: backLink,
                query,
              }}
              passHref
            >
              <Button
                as="a"
                variant="ghost"
                leftIcon={<Icon as={MdArrowBackIosNew} fontSize={20} />}
                my={4}
              >
                {backLabel || "Back"}
              </Button>
            </Link>
          </Show>
        )}
        {children}
      </Box>
    </Container>
  );
};

export default SettingsLayout;
