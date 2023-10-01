import React from "react";
import { Container } from "@mui/material";
import Carousel from "../components/Carousel";
import { genreMapTvShow } from "../constant/genreMapTvShows";
import useFuncOfStorage from "../action/services/useFuncOfStorage";
import AppBarComponent from "../components/AppBar";
import ImageBackground from "../components/ImageBackground";

function TvShowsPage() {
  const GetFromStorage = useFuncOfStorage();

  const carousels = [];

  Object.entries(genreMapTvShow).forEach(([genre, value]) => {
    carousels.push(
      <Carousel
        genreId={value}
        getFunction={GetFromStorage.getTvShowGenre}
        title={genre.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
      />
    );
  });

  return (
    <div>
      <ImageBackground />
      <AppBarComponent />
      <Container maxWidth={false} sx={{ mt: 15 }}>
        {carousels}
      </Container>
    </div>
  );
}

export default TvShowsPage;
