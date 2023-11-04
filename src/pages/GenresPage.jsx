import React from "react";
import { Container, Grid } from "@mui/material";
import Carousel from "../components/carousel/Carousel";
import { genreMapMovie } from "../constant/genreMapMovies";
import { genreMapTvShow } from "../constant/genreMapTvShows";
import * as GetFromStorage from "../action/services/useFuncOfStorage";
import AppBarComponent from "../components/appBar/AppBar";
import ImageBackground from "../components/ImageBackground/ImageBackground";

const MoviesPage = () => {
  const localStoragePage = localStorage.getItem("localStoragePage");

  const genreMap =
    localStoragePage === "tvShows" ? genreMapTvShow : genreMapMovie;
  const getFunction =
    localStoragePage === "tvShows"
      ? GetFromStorage.getTvShowGenre
      : GetFromStorage.getMovieGenre;

  return (
    <>
      <ImageBackground page={localStoragePage} />
      <AppBarComponent />
      <Container maxWidth={false} sx={{ mt: 10 }}>
        <Grid>
          {Object.entries(genreMap).map(([genre, value]) => (
            <Grid item mt={5} maxwidth={false} key={genre}>
              <Carousel
                genreId={value}
                getFunction={getFunction}
                title={genre.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
              />
            </Grid>
          ))}
        </Grid>
        <Grid sx={{ mt: 10 }}></Grid>
      </Container>
    </>
  );
};

export default MoviesPage;
