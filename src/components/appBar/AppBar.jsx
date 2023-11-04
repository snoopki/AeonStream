import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import users from "../../users";
import * as useLocalStorage from "../../action/services/useLocalStorage";
import { calculateSimilarity } from "../../constant/calculateSimilarity";
import { searchMoviesByName, searchTvShowsByName } from "../../action/fetch";
import { EAppBar, EAvatar, EButton, ESearchButton, ETextField } from "./style";

function AppBarComponent() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handleSearchClick = () => setSearchOpen(!isSearchOpen);
  const num = 8;

  const handleDropdownClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
    setDropdownOpen(true);
  };

  const closeDropdown = (event) => {
    setDropdownOpen(false);
    if (event.currentTarget.innerText === "Logout") {
      navigate("/");
    }
  };
  useEffect(() => {
    const storedUserId = useLocalStorage.readFromLocalStorage("userName");
    if (storedUserId) {
      const foundUser = users.find(
        (user) => user.id.toString() === storedUserId
      );
      setUser(foundUser);
    }
  }, []);
  const handleLinkClick = (route) => {
    switch (route) {
      case "search":
        if (searchInput.trim()) {
          navigate(`/streamingPage/search/${searchInput}`);
        }
        break;
      case "movies":
      case "tvShows":
        navigate(`/streamingPage/GenresPage`);

        break;
      default:
        navigate(`/streamingPage/${route}`);

        break;
    }
    useLocalStorage.saveToLocalStorage("localStoragePage", route);
  };

  useEffect(() => {
    Promise.all([
      searchMoviesByName(searchInput, num),
      searchTvShowsByName(searchInput, num),
    ])
      .then(([movieResults, tvResults]) => {
        const mergedResults = [...movieResults, ...tvResults];
        mergedResults.sort((itemA, itemB) => {
          const similarityA = calculateSimilarity(
            itemA.title || itemA.name,
            searchInput
          );
          const similarityB = calculateSimilarity(
            itemB.title || itemB.name,
            searchInput
          );

          return similarityB - similarityA;
        });
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchInput]);

  return (
    <EAppBar position="absolute">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography color="primary" variant="h4" sx={{ mr: 5 }}>
              Aeon Stream
            </Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item>
                <EButton
                  color="secondary"
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </EButton>
              </Grid>
              <Grid item>
                <EButton
                  color="secondary"
                  onClick={() => handleLinkClick("movies")}
                >
                  Movies
                </EButton>
              </Grid>
              <Grid item>
                <EButton
                  color="secondary"
                  onClick={() => handleLinkClick("tvShows")}
                >
                  TV Show
                </EButton>
              </Grid>

              <Grid item sx={{ flexGrow: 1 }}>
                <EButton
                  color="secondary"
                  onClick={() => handleLinkClick("contact")}
                >
                  Contact Us
                </EButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            {isSearchOpen && (
              <ETextField
                label="Search"
                variant="outlined"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            )}
            {isSearchOpen && (
              <ESearchButton
                color="secondary"
                onClick={() => handleLinkClick("search")}
              >
                Search
              </ESearchButton>
            )}
          </Grid>
          <Grid item>
            <IconButton
              color="secondary"
              aria-label="search"
              onClick={handleSearchClick}
            >
              {isSearchOpen ? <CancelIcon /> : <SearchIcon />}
            </IconButton>
          </Grid>
          <Grid item sx={{ mr: 1, ml: 2 }}>
            {user && (
              <EAvatar
                alt={user.name}
                src={user.imgURL}
                onClick={handleDropdownClick}
              />
            )}

            <Menu
              anchorEl={avatarAnchorEl}
              open={isDropdownOpen}
              onClose={closeDropdown}
              disableScrollLock={true}
            >
              <MenuItem onClick={closeDropdown}>Logout</MenuItem>
              <MenuItem onClick={closeDropdown}>Close</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </EAppBar>
  );
}

export default AppBarComponent;
