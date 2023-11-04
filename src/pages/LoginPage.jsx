import React, { useState } from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import UserCard from "../components/UserCard/UserCard";
import Modal from "../components/Modal/Modal";
import users from "../users";

function Login() {
  const userCards = users.map((user) => (
    <Grid item key={user.id}>
      <UserCard {...user} />
    </Grid>
  ));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main>
        <div>
          <Container maxWidth="sm" sx={{ marginTop: "150px" }}>
            <Typography variant="h3" align="center" gutterBottom>
              Welcome to my streaming website!
            </Typography>
          </Container>
          <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
            <Typography
              variant="h5"
              align="center"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Please select your user:
            </Typography>
          </Container>
        </div>
        <Container sx={{ marginTop: "50px" }}>
          <Grid container spacing={4} justifyContent="center">
            {userCards}
          </Grid>
        </Container>
      </main>

      <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="third"
          size="large"
          onClick={handleModalOpen}
        >
          add user
        </Button>
      </Grid>

      {isModalOpen && <Modal onClose={handleModalClose} />}
    </>
  );
}

export default Login;
