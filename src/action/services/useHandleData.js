import useApi from "./useApi";
import useLocalStorage from "./useLocalStorage.js";
import { useState } from "react";

function useHandleData() {
  const localStorageHandler = useLocalStorage();
  const useApiHandler = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);

  const localStorageUpdate = new Date(
    localStorage.getItem("localStorageUpdate")
  );
  const currentDate = new Date();
  async function fetchAndSaveDataToLocalStorage(num) {
    if (!localStorageUpdate || localStorageUpdate <= currentDate) {
      const data = await useApiHandler.fetchData(num);
      localStorageHandler.saveToLocalStorage(`localStorageUpdate`, futureDate);
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

        localStorageHandler.saveToLocalStorage(arrayName, categoryArray);
        for (const array in genreArrays) {
          const arrayToSave = genreArrays[array];
          localStorageHandler.saveToLocalStorage(`${array}`, arrayToSave);
        }
      }

      generateCategoryArray(data.popularTvShows, "TvShow", "popularTvShows");

      generateCategoryArray(data.topMovies, "movie", "topMovies");
      generateCategoryArray(data.popularMovies, "movie", "popularMovies");
      generateCategoryArray(data.topTvShows, "TvShow", "topTvShows");
    }

    setIsLoading(false);
  }

  return {
    fetchAndSaveDataToLocalStorage,
    isLoading,
  };
}

export default useHandleData;
