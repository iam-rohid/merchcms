import React, { HTMLAttributes, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  useColorMode,
  MenuList,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Switch,
  FormControl,
  FormLabel,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { fullScreenMenu } from "src/data/full-screen-menu";

export type AppHeaderProps = HTMLAttributes<HTMLDivElement> & {
  sticky?: boolean;
  paths?: string[];
};

const AppHeader = ({ sticky, className, paths, ...props }: AppHeaderProps) => {
  const [menuOpenOnMobile, setMenuOpenOnMobile] = useState(false);
  const backgroundColor = useColorModeValue("white", "gray.800");
  const { colorMode } = useColorMode();
  const onWindowResize = useCallback(() => {
    if (window.innerWidth > 768 && menuOpenOnMobile) {
      setMenuOpenOnMobile(false);
    }
  }, [menuOpenOnMobile, setMenuOpenOnMobile]);

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);

  return (
    <>
      <Box
        as="header"
        bg="white"
        position={sticky ? "sticky" : "static"}
        bgColor={backgroundColor}
        zIndex="100"
        borderBottom="1px solid"
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      >
        <Container maxWidth="container.lg">
          <Flex as="nav" alignItems="center" gap={8} height={14}>
            <Breadcrumb flex={1}>
              <BreadcrumbItem>
                <Button as="a" variant="link" href="/dashboard">
                  MerchCMS
                </Button>
              </BreadcrumbItem>
              {paths &&
                paths.map((path, i) => (
                  <BreadcrumbItem>
                    <Link
                      href={i > 0 ? `/${paths[i - 1]}/${path}` : `/${path}`}
                      passHref
                    >
                      <Button as="a" variant="link">
                        {i < paths.length - 2
                          ? `${path?.slice(0, 2)}...`
                          : path}
                      </Button>
                    </Link>
                  </BreadcrumbItem>
                ))}
            </Breadcrumb>

            <List
              display={["none", "none", "flex"]}
              alignItems="center"
              justifyContent="flex-end"
              gap={6}
            >
              <ListItem>
                <Link href={`/`} passHref>
                  <Button
                    variant="link"
                    as="a"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Feedback
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link href={`/`} passHref>
                  <Button
                    variant="link"
                    as="a"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Support
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link href={`/`} passHref>
                  <Button
                    variant="link"
                    as="a"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Docs
                  </Button>
                </Link>
              </ListItem>

              <ListItem>
                <Menu placement="bottom-end">
                  <MenuButton>
                    <Avatar src="" size="sm" />
                  </MenuButton>

                  <MenuList zIndex={200}>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
              </ListItem>
            </List>

            <List
              display={["flex", "flex", "none"]}
              alignItems="center"
              justifyContent="flex-end"
              gap={6}
            >
              <ListItem>
                <IconButton
                  aria-label="Menu Button"
                  icon={<MdMenu fontSize="1.5rem" />}
                  variant="ghost"
                  onClick={() => setMenuOpenOnMobile(true)}
                />
              </ListItem>
            </List>
          </Flex>
        </Container>
      </Box>
      <DrawerWindow
        isOpen={menuOpenOnMobile}
        paths={paths}
        onClose={() => setMenuOpenOnMobile(false)}
      />
    </>
  );
};

export default AppHeader;

type DrawwerWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  paths?: string[];
};
const DrawerWindow = ({ onClose, paths, isOpen }: DrawwerWindowProps) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display="flex" h={14} alignItems="center" gap={6} px={4}>
          <Breadcrumb flex={1}>
            <BreadcrumbItem>
              <Button as="a" variant="link" href="/dashboard">
                MerchCMS
              </Button>
            </BreadcrumbItem>
            {paths &&
              paths.map((path, i) => (
                <BreadcrumbItem>
                  <Link
                    href={i > 0 ? `/${paths[i - 1]}/${path}` : `/${path}`}
                    passHref
                  >
                    <Button as="a" variant="link">
                      {i < paths.length - 2 ? `${path?.slice(0, 2)}...` : path}
                    </Button>
                  </Link>
                </BreadcrumbItem>
              ))}
          </Breadcrumb>

          <IconButton
            aria-label="Menu Close Button"
            icon={<MdClose fontSize="1.5rem" />}
            onClick={onClose}
            variant="ghost"
          />
        </DrawerHeader>
        <DrawerBody px={4}>
          {fullScreenMenu.map((section) => (
            <Box as="nav" id={section.id} key={section.id} mb={6}>
              {section.title && (
                <Heading as="h3" size="sm" mb={3} px={4}>
                  {section.title}
                </Heading>
              )}
              <List>
                {section.menu.map((item) => (
                  <ListItem key={item.id}>
                    <Link href={item.href} passHref>
                      <Button as="a" isFullWidth variant="ghost">
                        <Text textAlign="left" w="full" whiteSpace="nowrap">
                          {item.label}
                        </Text>
                      </Button>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
          <Box as="section">
            <Heading as="h3" size="sm" mb={3} px={4}>
              Quick Settings
            </Heading>
            <Stack direction="column" spacing={2}>
              <FormControl display="flex" alignItems="center" px={4} py={2}>
                <FormLabel htmlFor="email-alerts" mb="0" flex={1}>
                  Toggle Dark Mode
                </FormLabel>
                <Switch
                  id="email-alerts"
                  isChecked={colorMode === "dark"}
                  onChange={toggleColorMode}
                />
              </FormControl>
            </Stack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
