import React from "react";
import { genreMapMovie } from "../constant/genreMapMovies";
import { genreMapTvShow } from "../constant/genreMapTvShows";

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

const mapGenreIdsToNames = (genreIds, genreMap) => {
  const genreNames = genreIds.map((id) => {
    const genreName = Object.keys(genreMap).find((key) => genreMap[key] === id);
    return genreName;
  });
  return genreNames.join(", ");
};

function ModalDetailes({ item, onClose }) {
  const movieGenres = mapGenreIdsToNames(item.genre_ids, genreMapMovie);
  const tvShowGenres = mapGenreIdsToNames(item.genre_ids, genreMapTvShow);

  return (
    <Dialog
      open={true}
      fullScreen
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Card sx={{ height: "100vh" }}>
              <CardMedia
                component="img"
                height="100%"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              />
            </Card>
          </Grid>
          <Grid item md={6}>
            <CardContent sx={{ color: "#fff" }}>
              <Typography variant="h3">
                {item.title ? item.title : item.name}
              </Typography>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Overview:
              </Typography>
              <Typography>{item.overview}</Typography>

              <Grid container spacing={1} sx={{ marginTop: 2 }}>
                <Grid item>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    Genres: {item.title ? movieGenres : tvShowGenres}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    Vote Average: {item.vote_average}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    Release Date:{" "}
                    {item.first_air_date
                      ? item.first_air_date
                      : item.release_date}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: "absolute", top: 8, right: 35 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}

export default ModalDetailes;
