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
import { useParams, useNavigate } from "react-router-dom";
import users from "../users";

function AppBarComponent() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchOpen(!isSearchOpen);
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
  const { id } = useParams();

  const user = users.find((user) => user.id.toString() === id);

  const handleLinkClick = (route) => {
    if (route === "search" && searchInput.trim() !== "") {
      navigate(`/streamingPage/${id}/search/${searchInput}`);
    } else if (route !== "search") {
      navigate(`/streamingPage/${id}/${route}`);
    }
  };

  return (
    <AppBar
      position="absolute"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography color="primary" variant="h4" sx={{ mr: 5 }}>
              Streaming Watch
            </Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleLinkClick("movies")}
                >
                  Movies
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleLinkClick("tvShows")}
                >
                  TV Show
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleLinkClick("faq")}
                >
                  FAQ
                </Button>
              </Grid>
              <Grid item sx={{ flexGrow: 1 }}>
                <Button
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleLinkClick("contact")}
                >
                  Contact Us
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            {isSearchOpen && (
              <TextField
                label="Search"
                variant="outlined"
                sx={{ mr: 1.5 }}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            )}
            {isSearchOpen && (
              <Button
                color="secondary"
                sx={{ fontWeight: "bold" }}
                onClick={() => handleLinkClick("search")}
              >
                Search
              </Button>
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
              <Avatar
                alt={user.name}
                src={user.imgURL}
                onClick={handleDropdownClick}
                sx={{
                  cursor: "pointer",
                  width: 52,
                  height: 52,
                  overflow: "hidden",
                  mr: 3,
                }}
              />
            )}
            <Menu
              anchorEl={avatarAnchorEl}
              open={isDropdownOpen}
              onClose={closeDropdown}
            >
              <MenuItem onClick={closeDropdown}>Logout</MenuItem>
              <MenuItem onClick={closeDropdown}>Close</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
