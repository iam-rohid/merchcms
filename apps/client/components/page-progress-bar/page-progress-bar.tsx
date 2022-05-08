import { Progress } from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";

const PageProgressBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  Router.events.on("routeChangeError", () => setIsLoading(false));
  return isLoading ? (
    <Progress
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={9999}
      size="xs"
      isIndeterminate
    />
  ) : null;
};

export default PageProgressBar;
