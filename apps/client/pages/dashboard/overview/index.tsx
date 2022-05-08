import React, { useMemo, useState } from "react";
import { MdAdd, MdGridView, MdList, MdSearch } from "react-icons/md";
import StoreCard from "components/cards/store-card";
import { CustomNextPage, Store } from "src/types";
import AppDashboardLayout from "components/layouts/common-layouts/app-dashboard-layout";
import SEO from "components/SEO";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  Icon,
  IconButton,
  Input,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

const stores: Store[] = [
  {
    id: "my-store-1",
    name: "Store 1",
    description: "This is my store description",
  },
  {
    id: "my-store-2",
    name: "Store 2",
    description: "This is my store description",
  },
  {
    id: "my-store-3",
    name: "Store 3",
    description: "This is my store description",
  },
];
const filterOptions = [
  {
    id: "all",
    label: "All Stores",
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
const OverviewPage: CustomNextPage = () => {
  const [gridView, setGridView] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState(filterOptions[0].id);
  const [orderBy, setOrderBy] = useState(orderOptions[0].id);
  const { colorMode } = useColorMode();

  const filteredStoreList = useMemo(
    () =>
      searchText
        ? stores.filter(
            (store) =>
              store.name.toLowerCase().includes(searchText.toLowerCase()) ||
              store.id.toLowerCase().includes(searchText.toLowerCase()) ||
              store.description.toLowerCase().includes(searchText.toLowerCase())
          )
        : stores,
    [searchText]
  );

  return (
    <>
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

      <Box as="section" id="stores" my={8}>
        <Container maxW="container.lg">
          <Grid
            gridTemplateColumns={
              gridView ? ["1fr", "1fr 1fr", "1fr 1fr 1fr"] : "1fr"
            }
            gap={4}
          >
            {filteredStoreList.map((store) => (
              <StoreCard key={store.id} store={store} gridView={gridView} />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OverviewPage;

OverviewPage.getLayout = (page) => (
  <>
    <SEO title="Overview" />
    <AppDashboardLayout children={page} id="overview" />
  </>
);
