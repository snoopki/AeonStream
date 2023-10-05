import React from "react";
import { Container, Grid } from "@mui/material";
import Carousel from "../components/Carousel";
import { genreMapMovie } from "../constant/genreMapMovies";
import useFuncOfStorage from "../action/services/useFuncOfStorage";
import AppBarComponent from "../components/AppBar";
import ImageBackground from "../components/ImageBackground";

const MoviesPage = () => {
  const GetFromStorage = useFuncOfStorage();

  return (
    <>
      <ImageBackground getFunction={GetFromStorage.getPopularMoviesObject} />
      <AppBarComponent />
      <Container maxWidth={false} sx={{ mt: 10 }}>
        <Grid>
          {Object.entries(genreMapMovie).map(([genre, value]) => (
            <Grid item mt={5} maxwidth={false}>
              <Carousel
                genreId={value}
                getFunction={GetFromStorage.getMovieGenre}
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
