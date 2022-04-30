import {
  darken,
  lighten,
  PaletteColor,
  PaletteColorOptions,
  PaletteMode,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    facebook?: PaletteColor;
    google?: PaletteColor;
    twitter?: PaletteColor;
  }
  interface PaletteOptions {
    facebook?: PaletteColorOptions;
    google?: PaletteColorOptions;
    twitter?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    facebook: true;
    google: true;
    twitter: true;
  }
}

export const getPalette = (mode: PaletteMode) => ({
  mode,
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    main: "#6366f1",
    light: "#818cf8",
    dark: "#4f46e5",
  },
  facebook: {
    main: "#3395F5",
    light: lighten("#3395F5", 0.1),
    dark: darken("#3395F5", 0.1),
    contrastText: "#fff",
  },
  twitter: {
    main: "#359BF0",
    light: lighten("#359BF0", 0.1),
    dark: darken("#359BF0", 0.1),
    contrastText: "#fff",
  },
  google: {
    main: "#EA4536",
    light: lighten("#EA4536", 0.1),
    dark: darken("#EA4536", 0.1),
    contrastText: "#fff",
  },
});
