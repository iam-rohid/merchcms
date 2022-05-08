import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "src/types";

export type NavigationColumnProps = {
  menu: Menu;
  active: string;
};

const NavigationColumn = ({ menu, active }: NavigationColumnProps) => {
  const { query } = useRouter();
  return (
    <Box as="nav" w="full">
      <List my={4}>
        {menu.map((item) => {
          const isActive = item.id === active;
          return (
            <ListItem key={item.id}>
              <Link
                href={{
                  pathname: item.href,
                  query,
                }}
                passHref
              >
                <Button isFullWidth as="a" variant="ghost" isActive={isActive}>
                  <Text w="full" isTruncated textAlign="left">
                    {item.label}
                  </Text>
                </Button>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default NavigationColumn;
