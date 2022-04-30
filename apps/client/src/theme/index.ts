import { createTheme, PaletteMode } from "@mui/material";
import { components } from "./components";
import { getPalette } from "./palette";
import { typography } from "./typography";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: getPalette(mode),
    spacing: 4,
    typography,
    components,
    shape: {
      borderRadius: 4,
    },
  });
