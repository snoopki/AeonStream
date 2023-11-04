import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { genreMapMovie } from "../../constant/genreMapMovies";
import { genreMapTvShow } from "../../constant/genreMapTvShows";
import {
  ECardContent,
  EDialog,
  EIconButton,
  ETypography,
  ETypographyBigSpace,
} from "./style";

const mapGenreIdsToNames = (genreIds, genreMap) => {
  const genreNames = genreIds.map((id) => {
    const genreName = Object.keys(genreMap).find((key) => genreMap[key] === id);
    return genreName;
  });
  return genreNames.join(", ");
};

function ModalDetails({ item, onClose }) {
  const movieGenres = mapGenreIdsToNames(item.genre_ids, genreMapMovie);
  const tvShowGenres = mapGenreIdsToNames(item.genre_ids, genreMapTvShow);
  const genres = item.title ? movieGenres : tvShowGenres;

  return (
    <EDialog open={true} fullScreen>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Card sx={{ height: "100vh" }}>
              <CardMedia
                component="img"
                height="100%"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title ? item.title : item.name}
              />
            </Card>
          </Grid>
          <Grid item md={6}>
            <ECardContent>
              <Typography variant="h3" color="primary">
                {item.title ? item.title : item.name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Genres: {genres}{" "}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Vote Average: {item.vote_average}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Release Date:{" "}
                {item.first_air_date ? item.first_air_date : item.release_date}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                Overview:
              </Typography>
              <Typography variant="body2">{item.overview}</Typography>
            </ECardContent>
          </Grid>
        </Grid>
        <EIconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </EIconButton>
      </DialogContent>
    </EDialog>
  );
}

ModalDetails.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDetails;
