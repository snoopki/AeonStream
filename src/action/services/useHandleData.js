import useApi from "./useApi";
import useLocalStorage from "./useLocalStorage.js";
import { useState } from "react";

function useHandleData() {
  const localStorageHandler = useLocalStorage();
  const useApiHandler = useApi();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAndSaveDataToLocalStorage(num) {
    const data = await useApiHandler.fetchData(num);

    if (data.topMovies) {
      data.topMovies.forEach((movie) => {
        localStorageHandler.saveToLocalStorage(`movie_${movie.id}`, movie);
      });
    }

    if (data.popularMovies) {
      data.popularMovies.forEach((movie) => {
        localStorageHandler.saveToLocalStorage(`movie_${movie.id}`, movie);
      });
    }

    if (data.popularTvShows) {
      data.popularTvShows.forEach((show) => {
        localStorageHandler.saveToLocalStorage(`TvShow_${show.id}`, show);
      });
    }

    if (data.topTvShows) {
      data.topTvShows.forEach((show) => {
        localStorageHandler.saveToLocalStorage(`TvShow_${show.id}`, show);
      });
    }

    function generateCategoryArray(data, categoryType, arrayName) {
      const categoryArray = [];
      const genreArrays = {};

      if (data) {
        data.forEach((item) => {
          categoryArray.push(`${categoryType}_${item.id}`);
          if (item.genre_ids) {
            item.genre_ids.forEach((genreId) => {
              if (!genreArrays[`genre_${categoryType}_${genreId}`]) {
                genreArrays[`genre_${categoryType}_${genreId}`] = [];
              }
              genreArrays[`genre_${categoryType}_${genreId}`].push(
                `${categoryType}_${item.id}`
              );
            });
          }
        });
      }

      localStorageHandler.saveToLocalStorage(arrayName, categoryArray);
      for (const array in genreArrays) {
        const arrayToSave = genreArrays[array];
        localStorageHandler.saveToLocalStorage(`${array}`, arrayToSave);
      }
    }

    generateCategoryArray(data.topMovies, "movie", "topMovies");
    generateCategoryArray(data.popularMovies, "movie", "popularMovies");
    generateCategoryArray(data.popularTvShows, "TvShow", "popularTvShows");
    generateCategoryArray(data.topTvShows, "TvShow", "topTvShows");

    setIsLoading(false);
  }

  return {
    fetchAndSaveDataToLocalStorage,
    isLoading,
  };
}

export default useHandleData;
