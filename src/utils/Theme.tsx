import { alpha, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

import type {} from "@mui/x-data-grid/themeAugmentation";
import { jaJPGrid } from "locales/jaJP";
// import { isPrd } from "utils/utils";

export const toolBarHeight = "38px";

declare module "@mui/material/styles" {
  interface Palette {
    baseSecondary: Palette["primary"];
    male: Palette["primary"];
    female: Palette["primary"];
    disable: Palette["primary"];
    block: Palette["primary"];
  }

  interface PaletteOptions {
    baseSecondary?: PaletteOptions["primary"];
    male?: PaletteOptions["primary"];
    female?: PaletteOptions["primary"];
    disable?: PaletteOptions["primary"];
    block?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    baseSecondary: true;
    male: true;
    female: true;
    disable: true;
  }
}

const isPrd = true;

export const customPalette = createTheme({
  palette: {
    primary: {
      main: isPrd ? "#0097AC" : "#4d7c0f",
      light: isPrd ? "#36CCDA" : "#84cc16",
      contrastText: "#FFF",
    },
    secondary: {
      dark: "#db405d",
      main: "#e3687f",
      light: "#EED1D3",
      contrastText: "#FFF",
    },
    baseSecondary: {
      main: "#25242C",
      contrastText: "#FFF",
    },
    background: {
      default: grey[100],
    },
    block: {
      main: grey[500],
      light: grey[200],
    },
    text: {
      primary: "#42404b",
      secondary: "#7B7776",
    },
    error: {
      main: "#d32f2f",
      light: "#EE8397",
    },
    success: {
      main: "#4cc951",
    },
    male: {
      main: "#384799",
      contrastText: "#FFF",
    },
    female: {
      main: "#FCCF00",
      contrastText: "#42404b",
    },
    disable: {
      dark: grey[300],
      main: alpha(grey[300], 0.8),
      light: alpha(grey[300], 0.6),
    },
  },
});

export const theme = createTheme({
  palette: customPalette.palette,
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "small",
      },
      styleOverrides: {
        root: {
          fontSize: 12,
        },
        outlined: {
          backgroundColor: customPalette.palette.common.white,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: customPalette.palette.common.white,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: "inherit",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.7rem",
          padding: "4px 8px",
          marginTop: "4px !important",
          lineHeight: "inherit",
          fontWeight: "inherit",
          backgroundColor: customPalette.palette.warning.dark,
        },
        arrow: {
          color: customPalette.palette.warning.dark,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        fullWidth: true,
        popupIcon: <></>,
        handleHomeEndKeys: false,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: "small",
        fullWidth: true,
        autoComplete: "off",
        startAdornment: <></>,
        endAdornment: <></>,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
        fullWidth: true,
        autoComplete: "off",
      },
      styleOverrides: {
        root: {
          backgroundColor: customPalette.palette.common.white,
          "& .Mui-disabled": {
            color: customPalette.palette.text.secondary,
            WebkitTextFillColor: `${customPalette.palette.text.primary} !important`,
            "& .MuiOutlinedInput-notchedOutline": {
              backgroundColor: "rgba(0, 0, 0, 0.08) !important",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          paddingTop: "6px",
          paddingBottom: "4px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: customPalette.palette.error.main,
          fontWeight: 900,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: `${toolBarHeight} !important`,
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        columnSpacing: 1,
        rowSpacing: 1,
        alignContent: "flex-start",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
        maxWidth: "md",
      },
    },
    MuiDataGrid: {
      defaultProps: {
        autoHeight: true,
        disableColumnMenu: false,
        density: "compact",
        headerHeight: 50,
        showCellRightBorder: true,
        rowHeight: 35,
        localeText: jaJPGrid,
      },
      styleOverrides: {
        root: {
          borderRadius: 1,
          overflow: "hidden",
          border: "none",
          paddingTop: 0,
        },
        columnHeader: {
          "& .MuiDataGrid-sortIcon": {
            color: customPalette.palette.common.white,
          },
          "& .MuiDataGrid-menuIcon": {
            display: "none",
          },
        },
        main: {
          border: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: customPalette.palette.common.white,
        },
        row: {
          backgroundColor: customPalette.palette.common.white,
          "&.Mui-selected": {
            backgroundColor: customPalette.palette.primary.light,
            color: customPalette.palette.common.white,
            "&:hover": {
              backgroundColor: customPalette.palette.primary.light,
              color: customPalette.palette.common.white,
            },
          },
          "&:hover, &.Mui-hovered": {
            backgroundColor: alpha(customPalette.palette.primary.light, 0.2),
            cursor: "pointer",
          },
        },
        columnHeaders: {
          backgroundColor: "#25242C",
          color: customPalette.palette.common.white,
          fontSize: "0.7rem",
        },
        footerContainer: {
          backgroundColor: "inherit",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
        spacing: 1,
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: "1px 14px",
        },
        action: {
          padding: "3px 0 0 16px",
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Noto Sans JP"', "sans-serif"].join(","),
    fontSize: 16,
    h1: { fontSize: 60, fontWeight: 700 },
    h2: { fontSize: 48, fontWeight: 700 },
    h3: { fontSize: 42, fontWeight: 700 },
    h4: { fontSize: 23, fontWeight: 700 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
    subtitle1: { fontSize: 16, fontWeight: 700 },
    subtitle2: { fontSize: 15 },
    caption: { fontSize: 11 },
    body1: { fontSize: 13.5 },
    body2: { fontSize: 12.5 },
    button: { textTransform: "none" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1260,
      xl: 1680,
    },
  },
});
