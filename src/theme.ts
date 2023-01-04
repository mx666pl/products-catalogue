import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: "#f6fafd",
    },
    primary: {
      main: "#FF5900",
    },
    secondary: {
      main: "#00AF7A",
    },
    warning: {
      main: "#ffca28",
    },
    info: {
      main: "#42a5f5",
    },
    success: {
      main: "#66bb6a",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
