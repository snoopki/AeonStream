import React, { useEffect, useState } from "react";
import {
  useRoutes,
  Navigate,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import StreamingPage from "./pages/StreamingPage";
import MoviesPage from "./pages/MoviesPage";
import TvShowsPage from "./pages/TvShowsPage";
import SearchPage from "./pages/SearchPage";

import { useTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./context/theme";

function App() {
  const Element = () => {
    return useRoutes([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/streamingPage/:id/home",
        element: <StreamingPage />,
      },
      {
        path: "/streamingPage/:id/movies",
        element: <MoviesPage />,
      },
      {
        path: "/streamingPage/:id/tvShows",
        element: <TvShowsPage />,
      },
      {
        path: "/streamingPage/:id/search/:searchInput",
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
