import React from "react";
import { useRoutes, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import StreamingPage from "./pages/StreamingPage";
import GenresPage from "./pages/GenresPage";
import SearchPage from "./pages/SearchPage";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { theme } from "./context/theme";

function App() {
  const Element = () => {
    return useRoutes([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/streamingPage/home",
        element: <StreamingPage />,
      },
      {
        path: "/streamingPage/GenresPage",
        element: <GenresPage />,
      },

      {
        path: "/streamingPage/search/:searchInput",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Element />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
