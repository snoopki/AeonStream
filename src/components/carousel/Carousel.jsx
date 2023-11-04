import React, { useState, useEffect, useMemo } from "react";
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
import ModalDetails from "../ModalDetailes/ModalDetailes";
import { ECard } from "./style";

function Carousel({ getFunction, title, genreId, getTitelsFromApi }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsData, setItemsData] = useState([]);

  const itemsPerPage = 8;
  const dynamicNumberOfItems = 32;

  useEffect(() => {
    if (getFunction) {
      const LocalStorageItems = !genreId
        ? getFunction(dynamicNumberOfItems)
        : getFunction(dynamicNumberOfItems, genreId);
      setItemsData(LocalStorageItems);
    } else if (getTitelsFromApi) {
      setItemsData(getTitelsFromApi);
    }
  }, [getFunction, getTitelsFromApi, genreId]);

  const totalPages = useMemo(() => Math.ceil(itemsData.length / itemsPerPage));

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage);
  const endIndex = useMemo(() =>
    Math.min(startIndex + itemsPerPage, itemsData.length)
  );

  const handlePageChange = (newPage) => {
    switch (true) {
      case newPage < 1:
        setCurrentPage(totalPages);
        break;
      case newPage > totalPages:
        setCurrentPage(1);
        break;
      default:
        setCurrentPage(newPage);
    }
  };

  const handleCardClick = (item) => setSelectedItem(item);

  const handleCloseOverview = () => setSelectedItem(null);

  return (
    <Box>
      <Paper elevation={3}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {itemsData.slice(startIndex, endIndex).map((item) => (
            <Grid item md={1.5}>
              <ECard key={item.id} onClick={() => handleCardClick(item)}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="100%"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
                <CardContent>
                  <Typography>{item.title ? item.title : item.name}</Typography>
                </CardContent>
              </ECard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginTop: "16px", display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => handlePageChange(currentPage - 1)}
            color="primary"
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <IconButton
            onClick={() => handlePageChange(currentPage + 1)}
            color="primary"
          >
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
