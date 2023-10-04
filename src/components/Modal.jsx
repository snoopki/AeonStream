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
import users from "../users";

function Modal({ onClose }) {
  const [newUserName, setNewUserName] = useState("");

  const handleAddButtonClick = () => {
    const newUserId = users[users.length - 1].id + 1;

    const newUser = {
      id: newUserId,
      name: newUserName,
      imgURL:
        "https://avatars.akamai.steamstatic.com/28e765fbb2612a9541dd162f73317f2f23a26346_full.jpg",
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
                  image="https://avatars.akamai.steamstatic.com/28e765fbb2612a9541dd162f73317f2f23a26346_full.jpg"
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
              <Button
                item
                sx={{ marginLeft: 2, height: 60, mt: 2, fontWeight: "bold" }}
                onClick={handleAddButtonClick}
                variant="contained"
                color="primary"
              >
                Add user
              </Button>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
        sx={{ position: "absolute", top: 8, right: 15 }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default Modal;
