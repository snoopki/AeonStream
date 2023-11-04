import React from "react";
import { Typography, Container, Link } from "@mui/material";
import AppBarComponent from "../components/appBar/AppBar";

function ContactUsPage() {
  return (
    <div>
      <AppBarComponent />
      <Container maxWidth="sm" sx={{ mt: 12, textAlign: "center" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h5" gutterBottom>
          My name is Omri Asher
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can contact me via email at:{" "}
          <Link
            href="mailto:omriash4@gmail.com"
            color="primary"
            underline="hover"
          >
            omriash4@gmail.com
          </Link>
        </Typography>
        <Typography variant="body1" color="secondary">
          As well as by phone at:{" "}
          <Typography component="span" color="primary">
            055-6655474
          </Typography>
        </Typography>
      </Container>
    </div>
  );
}

export default ContactUsPage;
