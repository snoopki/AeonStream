import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ModalDetails from "./ModalDetailes";

const cardTextStyle = {
  backgroundColor: "rgba(24, 20, 20, 0.7)",
  color: "#fff",
  padding: "8px",
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
};

function Carousel({ getFunction, title, genreId, apiFetched }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsData, setItemsData] = useState([]);

  const itemsPerPage = 8;
  const dynamicNumberOfItems = 32;

  useEffect(() => {
    if (getFunction) {
      const items =
        genreId !== null
          ? getFunction(dynamicNumberOfItems, genreId)
          : getFunction(dynamicNumberOfItems);
      const parsedItems = items.map((jsonString) => JSON.parse(jsonString));
      setItemsData(parsedItems);
    } else if (apiFetched) {
      setItemsData(apiFetched);
    }
  }, [getFunction, apiFetched, genreId]);
  const totalObjects = itemsData.length;
  const totalPages = Math.ceil(totalObjects / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalObjects);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseOverview = () => {
    setSelectedItem(null);
  };

  return (
    <Box>
      <Paper elevation={3}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {itemsData.slice(startIndex, endIndex).map((item) => (
            <Grid item key={item.id} md={1.5}>
              <Card
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                }}
                onClick={() => handleCardClick(item)}
              >
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="100%"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
                <CardContent sx={cardTextStyle}>
                  <Typography>{item.title ? item.title : item.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginTop: "16px", display: "flex", alignItems: "center" }}>
          <IconButton onClick={handlePrevClick} color="primary">
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <IconButton onClick={handleNextClick} color="primary">
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Paper>
      {selectedItem && (
        <ModalDetails item={selectedItem} onClose={handleCloseOverview} />
      )}
    </Box>
  );
}

export default Carousel;
