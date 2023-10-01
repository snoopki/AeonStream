import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import useFuncOfStorage from "../action/services/useFuncOfStorage";
import useHandleData from "../action/services/useHandleData";
import AppBarComponent from "./AppBar";
import ImageBackground from "./ImageBackground";

function StreamingPage() {
  const requestForMoviesAndTvShows = 500;

  const handleData = useHandleData();
  const { fetchAndSaveDataToLocalStorage, isLoading } = handleData;
  const GetFromStorage = useFuncOfStorage();

  useEffect(() => {
    fetchAndSaveDataToLocalStorage(requestForMoviesAndTvShows);
  }, [isLoading]);

  console.log("streaming", isLoading);
  return (
    <div>
      {isLoading ? (
        <Typography
          variant="h6"
          component="div"
          align="left"
          style={{ ml: 3, mt: 5 }}
        >
          Loading...
        </Typography>
      ) : (
        <>
          <ImageBackground />
          <AppBarComponent />
          <Container maxWidth={false} sx={{ mt: 15 }}>
            <Carousel
              getFunction={GetFromStorage.getTopMoviesObject}
              title="Top Movies"
            />
            <Carousel
              getFunction={GetFromStorage.getPopularMoviesObject}
              title="Popular Movies"
            />
            <Carousel
              getFunction={GetFromStorage.getTopTvShowsObject}
              title="Top TV Shows"
            />
            <Carousel
              getFunction={GetFromStorage.getPopularTvShowsObject}
              title="Popular TV Shows"
            />
          </Container>
        </>
      )}
    </div>
  );
}

export default StreamingPage;
