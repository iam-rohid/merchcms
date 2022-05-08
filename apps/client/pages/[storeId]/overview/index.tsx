import classNames from "classnames";
import SEO from "components/SEO";
import StoreDashboardLayout from "components/layouts/common-layouts/store-dashboard-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useState } from "react";
import { MdAdd, MdGridView, MdList, MdSearch } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { CustomNextPage } from "src/types/next.type";
import { Product } from "src/types/product.type";
import {
  Box,
  Button,
  Container,
  Icon,
  Input,
  useColorMode,
  Select,
  IconButton,
  ButtonGroup,
  Flex,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Text,
} from "@chakra-ui/react";
import ProductCard from "components/cards/product-card";

const products: Product[] = [
  {
    id: "my-product-1",
    name: "Product 1",
    description: "This is my product description",
    price: 100,
    coverImage:
      "https://images.unsplash.com/photo-1527718641255-324f8e2d0421?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
  },
  {
    id: "my-product-2",
    name: "Product 2",
    description: "This is my product description",
    price: 380,
    coverImage:
      "https://images.unsplash.com/photo-1523647341782-d761bce0004c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "my-product-3",
    name: "Product 3",
    description: "This is my product description",
    price: 299,
    coverImage:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
  },
];
const filterOptions = [
  {
    id: "all",
    label: "All Products",
  },
  {
    id: "public",
    label: "Public",
  },
  {
    id: "private",
    label: "Private",
  },
];
const orderOptions = [
  {
    id: "date-created",
    label: "Date Created",
  },
  {
    id: "date-updated",
    label: "Date Updated",
  },
  {
    id: "a-z",
    label: "A-Z",
  },
  {
    id: "z-a",
    label: "Z-A",
  },
];

const StoreOverviewPage: CustomNextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [gridView, setGridView] = useState(true);
  const [filterBy, setFilterBy] = useState(filterOptions[0].id);
  const [orderBy, setOrderBy] = useState(orderOptions[0].id);
  const { colorMode } = useColorMode();
  const {
    query: { storeId },
  } = useRouter();

  const filteredProducts = useMemo(
    () =>
      searchText
        ? products.filter(
            (prod) =>
              prod.name.toLowerCase().includes(searchText.toLowerCase()) ||
              prod.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              prod.id === searchText
          )
        : products,
    [searchText, filterBy, orderBy]
  );

  return (
    <>
      <Box
        as="section"
        id="landing"
        py={8}
        borderBottom="1px solid"
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      >
        <Container maxW="container.lg">
          <Flex>
            <Box flex={1}>
              <Heading as="h1" size="md">
                {storeId}
              </Heading>
              <Text>{storeId}.merchcms.com</Text>
            </Box>
            <Link href={`#`} passHref>
              <Button
                as="a"
                rightIcon={<Icon as={FiExternalLink} fontSize={20} />}
              >
                Visit
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>
      <Box as="section" id="stats" my={8}>
        <Container maxW="container.lg">
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr 1fr"]} gap={4}>
            <Stat
              border="1px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
              borderRadius="lg"
              p={4}
            >
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat
              border="1px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
              borderRadius="lg"
              p={4}
            >
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat
              border="1px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
              borderRadius="lg"
              p={4}
            >
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </Grid>
        </Container>
      </Box>
      <Box as="section" id="search" my={8}>
        <Container maxW="container.lg" display="flex" gap={4}>
          <Box position="relative" flex={1}>
            <Input
              id="search-input"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              pl={8}
            />
            <Icon
              as={MdSearch}
              fontSize={20}
              position="absolute"
              left={2}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              pointerEvents="none"
              color={colorMode === "dark" ? "gray.400" : "gray.500"}
            />
          </Box>
          <Link href="/new-store">
            <Button
              as="a"
              variant="solid"
              colorScheme="blue"
              leftIcon={<Icon as={MdAdd} fontSize={20} />}
            >
              New Store
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" my={8}>
        <Container
          maxW="container.lg"
          display="flex"
          gap={4}
          alignItems="center"
        >
          <Select
            w="fit-content"
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
            }}
          >
            {filterOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>

          <Flex
            flex={1}
            w="full"
            alignItems="center"
            justifyContent="flex-end"
            gap={4}
          >
            <Select
              w="fit-content"
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value);
              }}
            >
              {orderOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
            <ButtonGroup isAttached variant="outline">
              <IconButton
                aria-label="Grid view"
                onClick={() => setGridView(true)}
                icon={<Icon as={MdGridView} fontSize={20} />}
                isActive={gridView}
              />
              <IconButton
                aria-label="Grid view"
                onClick={() => setGridView(false)}
                icon={<Icon as={MdList} fontSize={20} />}
                isActive={!gridView}
              />
            </ButtonGroup>
          </Flex>
        </Container>
      </Box>

      <Box as="section" id="products" my={8}>
        <Container maxW="container.lg">
          <Grid
            templateColumns={
              gridView
                ? ["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]
                : "1fr"
            }
            gap={4}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                gridView={gridView}
                product={product}
                key={product.id}
              />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default StoreOverviewPage;

StoreOverviewPage.getLayout = (page) => (
  <>
    <SEO title="Store Overview" />
    <StoreDashboardLayout children={page} id="overview" />
  </>
);
