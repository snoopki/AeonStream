import React from "react";
import { Card, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserCard({ id, name, imgURL, onClick = function () {} }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/streamingPage/${id}/home`);
  };

  return (
    <Card
      key={id}
      style={{ cursor: "pointer" }}
      sx={{
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        marginBottom: "3px",
      }}
    >
      <Button onClick={handleClick} style={{ cursor: "pointer" }} fullWidth>
        <CardMedia
          component="img"
          image={imgURL}
          title={name}
          sx={{ width: "150px", height: "150px", objectFit: "fill" }}
          onClick={onClick}
        />
      </Button>
      <Typography variant="h6" align="center" color="secondary">
        {name}
      </Typography>
    </Card>
  );
}

export default UserCard;
