import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#daba46",
      light: "rgb(225, 199, 107)",
      dark: "rgb(152, 130, 49)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#fff",
    },
    third: {
      main: "rgb(152, 130, 49)",
    },
    forth: {
      main: "rgb(72, 58, 198)",
    },
    background: {
      paper: "rgba(0,0,0,0.4)",
      default: "rgba(18,18,18,0.9)",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(6,5,14,0.52)",
    },
  },
  typography: {
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "10rem",
      fontWeight: 600,
      lineHeight: 2.08,
    },
    h3: {
      fontWeight: 300,
      lineHeight: 0.93,
      letterSpacing: "0.03em",
      fontSize: "3.3rem",
    },
    h2: {
      fontSize: "5.9rem",
      fontWeight: 500,
      lineHeight: 1.46,
      letterSpacing: "0.06em",
    },
    h4: {
      fontWeight: 200,
      lineHeight: 0.81,
    },
  },
};
export const theme = createTheme(themeOptions);
