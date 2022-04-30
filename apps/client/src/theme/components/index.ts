import { ThemeOptions } from "@mui/material";
import { buttonComponents } from "./button";

export const components: ThemeOptions["components"] = {
  MuiContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(6),
          paddingRight: theme.spacing(6),
        },
        [theme.breakpoints.up("md")]: {
          paddingLeft: theme.spacing(6),
          paddingRight: theme.spacing(6),
        },
        [theme.breakpoints.up("lg")]: {
          paddingLeft: theme.spacing(8),
          paddingRight: theme.spacing(8),
        },
        [theme.breakpoints.up("xl")]: {
          paddingLeft: theme.spacing(8),
          paddingRight: theme.spacing(8),
        },
      }),
    },
  },
  ...buttonComponents,
  MuiTextField: {
    defaultProps: {
      // variant: "standard",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiInput-root": {
          marginTop: 0,
          backgroundColor: theme.palette.grey[100],

          "&::placeholder": {
            color: theme.palette.primary.main,
          },

          "&.Mui-focused": {},
          "&::after, &::before": {
            display: "none",
          },
        },
        "& .MuiInputLabel-root": {
          position: "static",
          transform: "none",
          color: theme.palette.grey[600],
          "&.Mui-focused": {
            color: theme.palette.grey[600],
          },
        },
      }),
    },
  },
};
