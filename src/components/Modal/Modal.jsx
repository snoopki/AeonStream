import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import users from "../../users";
import { EButton, EIconButton } from "./style";

function Modal({ onClose }) {
  const [newUserName, setNewUserName] = useState("");
  const image =
    "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp";
  const truncatedName =
    newUserName.length > 10 ? `${newUserName.slice(0, 10)}...` : newUserName;

  const handleAddButtonClick = () => {
    const newUserId = users[users.length - 1].id + 1;

    const newUser = {
      id: newUserId,
      name: truncatedName,
      imgURL: image,
    };

    users.push(newUser);

    onClose();
  };

  return (
    <Dialog open={true} fullScreen sx={{ backgroundColor: "#000" }}>
      <DialogTitle variant="h3" align="center" sx={{ marginTop: "200px" }}>
        Add New User
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Card sx={{ maxWidth: 120 }}>
                <CardMedia
                  component="img"
                  alt="User"
                  height="120"
                  image="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp"
                />
              </Card>
            </Grid>
            <Grid item>
              <TextField
                type="text"
                placeholder="Name"
                value={newUserName}
                onChange={(event) => setNewUserName(event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid>
              <EButton
                item
                onClick={handleAddButtonClick}
                variant="contained"
                color="primary"
              >
                Add user
              </EButton>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <EIconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </EIconButton>
    </Dialog>
  );
}

export default Modal;
