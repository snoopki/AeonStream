import React, { useEffect, useState } from "react";
import { Paper, CardMedia, Fade } from "@mui/material";
import useFuncOfStorage from "../action/services/useFuncOfStorage";

function ImageBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const numOfPopularPictures = 5;
  const fadeTime = 2000;
  const switchImageTime = 10000;

  const [topItemsData, setTopItemsData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setShowImage(false);
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % numOfPopularPictures
        );
        setShowImage(true);
        setTimeout(() => {
          setFade(true);
        }, fadeTime);
      }, fadeTime);
    }, switchImageTime);

    return () => clearInterval(intervalId);
  }, []);

  const GetFromStorage = useFuncOfStorage();

  useEffect(() => {
    const ItemsOnScreen =
      GetFromStorage.getTopTvShowsObject(numOfPopularPictures);
    const parsedItemsOnScreen = ItemsOnScreen.map((jsonString) =>
      JSON.parse(jsonString)
    );
    setTopItemsData(parsedItemsOnScreen);
  }, []);

  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      {showImage && topItemsData.length > 0 && (
        <Fade
          in={fade}
          timeout={{
            enter: fadeTime,
            exit: fadeTime,
          }}
        >
          <CardMedia
            component="img"
            alt={topItemsData[currentImageIndex].title}
            height="100%"
            src={`https://image.tmdb.org/t/p/original${topItemsData[currentImageIndex].backdrop_path}`}
            sx={{
              filter: "brightness(60%)",
            }}
          />
        </Fade>
      )}
    </Paper>
  );
}

export default ImageBackground;
