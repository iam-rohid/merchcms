import { ThemeOptions } from "@mui/material";

export const buttonComponents: ThemeOptions["components"] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {},
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        "& .MuiButton-startIcon, & .MuiButton-endIcon": {
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        },
      }),
      sizeLarge: ({ theme }) => ({
        borderRadius: theme.spacing(2),
        fontSize: theme.spacing(4),
        fontWeight: 600,
        lineHeight: theme.spacing(6.5),
        padding: theme.spacing(3, 5),
        "& .MuiSvgIcon-root": {
          width: theme.spacing(6),
          height: theme.spacing(6),
        },
        "& .MuiButton-startIcon": {
          left: theme.spacing(5),
        },
        "& .MuiButton-endIcon": {
          right: theme.spacing(5),
        },
      }),
      sizeMedium: ({ theme }) => ({
        borderRadius: theme.spacing(1.75),
        fontSize: theme.spacing(3.5),
        fontWeight: 500,
        lineHeight: theme.spacing(5),
        padding: theme.spacing(2.5, 4),
        "& .MuiSvgIcon-root": {
          width: theme.spacing(5),
          height: theme.spacing(5),
        },
        "& .MuiButton-startIcon": {
          left: theme.spacing(4),
        },
        "& .MuiButton-endIcon": {
          right: theme.spacing(4),
        },
      }),
      sizeSmall: ({ theme }) => ({
        borderRadius: theme.spacing(1.5),
        fontSize: theme.spacing(3),
        fontWeight: 500,
        lineHeight: theme.spacing(4.5),
        padding: theme.spacing(2, 3),
        "& .MuiSvgIcon-root": {
          width: theme.spacing(4),
          height: theme.spacing(4),
        },
        "& .MuiButton-startIcon": {
          left: theme.spacing(3),
        },
        "& .MuiButton-endIcon": {
          right: theme.spacing(3),
        },
      }),
      startIcon: ({ theme }) => ({}),
    },
  },
};
