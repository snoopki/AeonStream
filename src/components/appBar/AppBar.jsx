import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Box,
  MenuItem,
  TextField,
  Grid,
  Modal,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import users from "../../users";
import * as useLocalStorage from "../../action/services/useLocalStorage";
import { calculateSimilarity } from "../../constant/calculateSimilarity";
import { searchMoviesByName, searchTvShowsByName } from "../../action/fetch";
import { EAppBar, EAvatar, EButton, ESearchButton, ETextField } from "./style";
import ModalDetails from "../ModalDetailes/ModalDetailes";

function AppBarComponent() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [user, setUser] = useState(null);
  const num = 8;

  const handleSearchClick = () => {
    setSearchOpen(!isSearchOpen);
    setMenuDropdownOpen(false);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuDropdownOpen(true);
  };

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

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;

    setSearchInput(inputValue);
    Promise.all([
      searchMoviesByName(inputValue, num),
      searchTvShowsByName(inputValue, num),
    ])
      .then(([movieResults, tvResults]) => {
        const mergedResults = [...movieResults, ...tvResults];
        mergedResults.sort((itemA, itemB) => {
          const similarityA = calculateSimilarity(
            itemA.title || itemA.name,
            inputValue
          );
          const similarityB = calculateSimilarity(
            itemB.title || itemB.name,
            inputValue
          );

          return similarityB - similarityA;
        });

        const filteredItems = mergedResults.filter((item) => {
          const titleOrName = item.title || item.name;
          return titleOrName.toLowerCase().includes(inputValue.toLowerCase());
        });
        setFilteredResults(filteredItems);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
                  TV Shows
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
          <Grid item sx={{ display: "flex", alignItems: "center", mr: 1 }}>
            {isSearchOpen && (
              <Box sx={{ mr: 1 }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchInput}
                  onChange={(event) => {
                    handleSearchInputChange(event);
                    handleMenuOpen(event);
                  }}
                />
                {searchInput.length > 0 && (
                  <Menu
                    disableAutoFocus={true}
                    autoFocus={false}
                    disableAutoFocusItem={true}
                    disableScrollLock={true}
                    anchorEl={menuAnchorEl}
                    open={isMenuDropdownOpen}
                    onClose={() => setMenuDropdownOpen(false)}
                    sx={{
                      position: "absolute",
                    }}
                  >
                    {filteredResults.map((item) => (
                      <MenuItem
                        key={item.id}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        {item.title || item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
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

          <Grid>
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
              sx={{
                position: "absolute",
              }}
            >
              <MenuItem onClick={closeDropdown}>Logout</MenuItem>
              <MenuItem onClick={closeDropdown}>Close</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Paper>
            <ModalDetails item={selectedItem} onClose={handleCloseModal} />
          </Paper>
        </Modal>
      </Toolbar>
    </EAppBar>
  );
}

export default AppBarComponent;
