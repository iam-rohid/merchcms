import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { Store } from "src/types";

export type StoreCardProps = {
  store: Store;
  gridView?: boolean;
};

const StoreCard = ({ store, gridView = true }: StoreCardProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.600");
  return (
    <Link href={`/${store.id}`} passHref>
      <Box
        as="a"
        p={4}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={6}
        _hover={{
          borderColor: hoverBorderColor,
        }}
        overflow="hidden"
      >
        <Flex flexDir={gridView ? "column" : "row"} gap={4}>
          <Avatar name={store.name} />
          <Box>
            <Heading as="h3" size="sm" isTruncated>
              {store.name}
            </Heading>
            <Text isTruncated>{store.id}.merchcms.com</Text>
          </Box>
        </Flex>
        {gridView && <Text mt={2}>{store.description}</Text>}
      </Box>
    </Link>
  );
};

export default StoreCard;
