import React from "react";
import { Container, Grid } from "@mui/material";
import Carousel from "../components/Carousel";
import { genreMapTvShow } from "../constant/genreMapTvShows";
import useFuncOfStorage from "../action/services/useFuncOfStorage";
import AppBarComponent from "../components/AppBar";
import ImageBackground from "../components/ImageBackground";

function TvShowsPage() {
  const GetFromStorage = useFuncOfStorage();

  return (
    <>
      <ImageBackground />
      <AppBarComponent />
      <Container maxWidth={false} sx={{ mt: 10 }}>
        <Grid>
          {Object.entries(genreMapTvShow).map(([genre, value]) => (
            <Grid item mt={5} maxwidth={false}>
              <Carousel
                genreId={value}
                getFunction={GetFromStorage.getTvShowGenre}
                title={genre.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
              />
            </Grid>
          ))}
        </Grid>
        <Grid sx={{ mt: 10 }}></Grid>
      </Container>
    </>
  );
}

export default TvShowsPage;
