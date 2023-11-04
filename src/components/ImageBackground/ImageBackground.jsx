import React, { useEffect, useState } from "react";
import { Paper, CardMedia, Fade } from "@mui/material";
import * as GetFromStorage from "../../action/services/useFuncOfStorage";
import { ECardMedia } from "./style";

function ImageBackground({ page }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const numOfPopularPictures = 5;
  const fadeTime = 2000;
  const switchImageTime = 10000;

  const [topItemsData, setTopItemsData] = useState([]);

  useEffect(() => {
    const getItemsOnScreen = (page) => {
      if (page === "tvShows") {
        return GetFromStorage.getTopTvShowsObject(numOfPopularPictures);
      } else if (page === "movies") {
        return GetFromStorage.getTopMoviesObject(numOfPopularPictures);
      } else {
        const randomChoice = Math.random() < 0.5 ? "tvShows" : "movies";
        if (randomChoice === "tvShows") {
          return GetFromStorage.getTopTvShowsObject(numOfPopularPictures);
        } else {
          return GetFromStorage.getTopMoviesObject(numOfPopularPictures);
        }
      }
    };

    const ItemsOnScreen = getItemsOnScreen(page);
    setTopItemsData(ItemsOnScreen);

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % numOfPopularPictures
        );
        setFade(true);
      }, fadeTime);
    }, switchImageTime);

    return () => clearInterval(interval);
  }, [page]);

  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      {topItemsData.length > 0 && (
        <Fade
          in={fade}
          timeout={{
            enter: fadeTime,
            exit: fadeTime,
          }}
        >
          <ECardMedia
            component="img"
            alt={topItemsData[currentImageIndex].title}
            height="100%"
            src={`https://image.tmdb.org/t/p/original${topItemsData[currentImageIndex].backdrop_path}`}
          />
        </Fade>
      )}
    </Paper>
  );
}

export default ImageBackground;
