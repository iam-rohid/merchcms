import { ThemeOptions } from "@mui/material";

export const typography: ThemeOptions["typography"] = (palette) => ({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  allVariants: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
});
