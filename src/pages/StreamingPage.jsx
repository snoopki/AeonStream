import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import Carousel from "../components/carousel/Carousel";
import * as GetFromStorage from "../action/services/useFuncOfStorage";
import useHandleData from "../action/services/useHandleData";
import AppBarComponent from "../components/appBar/AppBar";
import ImageBackground from "../components/ImageBackground/ImageBackground";

function StreamingPage() {
  const requestForMoviesAndTvShows = 500;

  const handleData = useHandleData();
  const { fetchAndSaveDataToLocalStorage, isLoading } = handleData;

  useEffect(() => {
    fetchAndSaveDataToLocalStorage(requestForMoviesAndTvShows);
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Typography
          variant="h6"
          component="div"
          align="left"
          sx={{ ml: 3, mt: 5 }}
        >
          Loading...
        </Typography>
      ) : (
        <Box>
          <ImageBackground />
          <AppBarComponent />
          <Container maxWidth={false} sx={{ mt: 10 }}>
            <Carousel
              getFunction={GetFromStorage.getTopMoviesObject}
              title="Top Movies"
            />
            <Box mt={5}>
              <Carousel
                getFunction={GetFromStorage.getPopularMoviesObject}
                title="Popular Movies"
              />
            </Box>
            <Box mt={5}>
              <Carousel
                getFunction={GetFromStorage.getPopularTvShowsObject}
                title="Popular TV Shows"
              />
            </Box>
            <Box mt={5} mb={10}>
              <Carousel
                getFunction={GetFromStorage.getTopTvShowsObject}
                title="Top TV Shows"
              />
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default StreamingPage;
