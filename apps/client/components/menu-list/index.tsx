import { Box, Button, Icon, List, ListItem, Text } from "@chakra-ui/react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdArrowForwardIos } from "react-icons/md";
import { Menu } from "src/types";

export type FullScreenMenuProps = {
  menu: Menu;
  onItemClick?: (item: string) => void;
};

const MenuList = ({ menu, onItemClick }: FullScreenMenuProps) => {
  const { query } = useRouter();
  return (
    <Box as="nav">
      <List my={4}>
        {menu.map((item) => {
          return (
            <ListItem key={item.id}>
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
                  onClick={() => {
                    if (onItemClick) {
                      onItemClick(item.id);
                    }
                  }}
                  isFullWidth
                  rightIcon={<Icon as={MdArrowForwardIos} fontSize={20} />}
                >
                  <Text w="full" flex="1" isTruncated textAlign="left">
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

export default MenuList;
