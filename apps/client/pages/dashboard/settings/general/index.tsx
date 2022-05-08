import { CustomNextPage } from "src/types";
import AppSettingsLayout from "components/layouts/common-layouts/app-settings-layout";
import Image from "next/image";
import { MdCopyAll } from "react-icons/md";
import SEO from "components/SEO";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
  Button,
  Avatar,
  VisuallyHidden,
} from "@chakra-ui/react";

const GeneralPage: CustomNextPage = () => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { colorMode } = useColorMode();
  return (
    <>
      <Box
        as="section"
        id="change-username"
        my={8}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={8}
      >
        <form className="space-y-4">
          <Box p={4}>
            <Heading as="h3" size="md" mb={4}>
              Your Username
            </Heading>
            <FormControl>
              <FormLabel htmlFor="username-input">
                This is your URL namespace within MerchCMS
              </FormLabel>
              <Input id="username-input" type="text" placeholder="johndoe123" />
            </FormControl>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            gap={4}
            p={4}
            bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
          >
            <Text flex={1}></Text>
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </Flex>
        </form>
      </Box>

      <Box
        as="section"
        id="change-name"
        my={8}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={8}
      >
        <form className="space-y-4">
          <Box p={4}>
            <Heading as="h3" size="md" mb={4}>
              Your Name
            </Heading>
            <FormControl>
              <FormLabel htmlFor="name-input">
                Please enter your full name or a display name you are
                comportable with.
              </FormLabel>
              <Input id="name-input" type="text" placeholder="John doe" />
            </FormControl>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            gap={4}
            p={4}
            bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
          >
            <Text flex={1}></Text>
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </Flex>
        </form>
      </Box>

      <Box
        as="section"
        id="change-email"
        my={8}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={8}
      >
        <form className="space-y-4">
          <Box p={4}>
            <Heading as="h3" size="md" mb={4}>
              Your Email
            </Heading>
            <FormControl>
              <FormLabel htmlFor="name-input">
                Please enter the email address you want to use to log in with
                MerchCMS.
              </FormLabel>
              <Input
                id="name-input"
                type="email"
                placeholder="johndoe@example.com"
              />
            </FormControl>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            gap={4}
            p={4}
            bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
          >
            <Text flex={1}></Text>
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </Flex>
        </form>
      </Box>

      <Box
        as="section"
        id="change-avatar"
        my={8}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={8}
      >
        <form className="space-y-4">
          <Flex gap={8} p={4}>
            <Box flex={1}>
              <Heading as="h3" size="md" mb={4}>
                Your Avatar
              </Heading>
              <FormControl>
                <FormLabel htmlFor="avatar-input">
                  This is your avatar. <br />
                  Click on the avatar to upload a custom one from your files.
                </FormLabel>
                <VisuallyHidden>
                  <Input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    placeholder="johndoe@example.com"
                  />
                </VisuallyHidden>
              </FormControl>
            </Box>
            <label htmlFor="avatar-input">
              <Avatar size="xl" />
            </label>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            gap={4}
            p={4}
            bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
          >
            <Text flex={1}></Text>
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </Flex>
        </form>
      </Box>

      <Box
        as="section"
        id="user-id"
        my={8}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={8}
      >
        <form className="space-y-4">
          <Box p={4}>
            <Heading as="h3" size="md" mb={4}>
              Your UserId
            </Heading>
            <FormControl>
              <FormLabel htmlFor="userid-input">
                This is your userid. It is used to identify you within MerchCMS.
              </FormLabel>
              <Input
                id="userid-input"
                type="text"
                value={"asdfjlasjdlfjoi02323nlwk3"}
                disabled
              />
            </FormControl>
          </Box>
        </form>
      </Box>

      <Box
        as="section"
        id="delete-account"
        my={8}
        border="1px solid"
        borderColor={colorMode === "light" ? "red.500" : "red.300"}
        borderRadius={8}
        overflow="hidden"
      >
        <form className="space-y-4">
          <Box p={4}>
            <Heading as="h3" size="md" mb={4}>
              Delete Your Account
            </Heading>
            <FormControl>
              <Text>
                Permanently delete your personal account and all of it’s content
                from MerchCMS. This acction is not reversible, so please
                continue with caution.
              </Text>
            </FormControl>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            gap={4}
            p={4}
            bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
          >
            <Text flex={1}></Text>
            <Button type="submit" colorScheme="red">
              Delete Account
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default GeneralPage;

GeneralPage.getLayout = (page) => (
  <>
    <SEO title="General Settings" />
    <AppSettingsLayout children={page} id="general" />
  </>
);
