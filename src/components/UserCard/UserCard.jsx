import React from "react";
import { Card, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as useLocalStorage from "../../action/services/useLocalStorage";
import { ECard, ECardMedia } from "./style";

function UserCard({ id, name, imgURL, onClick = function () {} }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/streamingPage/home`);
    useLocalStorage.saveToLocalStorage("userName", id);
  };

  return (
    <ECard key={id} style={{ cursor: "pointer" }}>
      <Button onClick={handleClick} style={{ cursor: "pointer" }} fullWidth>
        <ECardMedia
          component="img"
          image={imgURL}
          title={name}
          onClick={onClick}
        />
      </Button>
      <Typography variant="h6" align="center" color="secondary">
        {name}
      </Typography>
    </ECard>
  );
}

export default UserCard;
