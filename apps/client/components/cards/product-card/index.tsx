import { Product } from "src/types/product.type";
import Image from "next/image";
import Link from "next/link";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

export type ProductCardProps = {
  product: Product;
  gridView?: boolean;
};
const ProductCard = ({ gridView = true, product }: ProductCardProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.600");
  return (
    <Link href={`/my-store-1/${product.id}`} passHref>
      <Flex
        as="a"
        border="1px solid"
        borderColor={borderColor}
        borderRadius={8}
        _hover={{
          borderColor: hoverBorderColor,
        }}
        overflow="hidden"
        flexDir={gridView ? "column" : "row"}
      >
        <AspectRatio
          w={gridView ? "auto" : "120px"}
          overflow="hidden"
          position="relative"
          ratio={1}
        >
          <Image
            src={product.coverImage}
            alt="Product Cover Phtoo"
            layout="fill"
            objectFit="cover"
          />
        </AspectRatio>
        <Box flex={1} p={4} overflow="hidden">
          <Heading as="h3" size="sm" isTruncated>
            {product.name}
          </Heading>
          <Text isTruncated>{product.description}</Text>
          <Text fontSize={20}>${product.price}</Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default ProductCard;
