import Link from "next/link";
import { Menu } from "src/types";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export type NavigationRowProps = {
  menu: Menu;
  active: string;
};

const NavigationRow = ({ menu, active }: NavigationRowProps) => {
  const { query } = useRouter();
  const { colorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      top={0}
      h={12}
      bgColor={backgroundColor}
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      zIndex="50"
    >
      <Container as="nav" maxW="container.lg" h="full" overflowX="auto">
        <List h="full" display="flex" flexDir="row" alignItems="center" gap={2}>
          {menu.map((item) => (
            <ListItem key={item.href}>
              <Link
                href={{
                  pathname: item.href,
                  query,
                }}
                passHref
              >
                <Button
                  as="a"
                  variant="ghost"
                  isActive={active === item.id}
                  size="sm"
                >
                  {item.label}
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default NavigationRow;
