import { genreMap } from "../../constant/genreMapTvShows.js";
import { getMovieById } from "../fetch.js";
import useLocalStorage from "./useLocalStorage.js";

function useFuncOfStorage() {
  const localStorageHandler = useLocalStorage();

  const getMovieDetailsById = (id) => {
    return localStorageHandler.readFromLocalStorage(`${id}`);
  };

  const getObjectByCategory = (category, num) => {
    const categoryArray = localStorageHandler.readFromLocalStorage(category);

    if (categoryArray === null) {
      return [];
    }

    const categoryObjects = categoryArray.split(",").slice(0, num);
    const categoryArrayWithDetails = [];

    for (const itemId of categoryObjects) {
      const itemDetails = localStorageHandler.readFromLocalStorage(itemId);

      if (itemDetails !== null) {
        categoryArrayWithDetails.push(itemDetails);
      }
    }

    return categoryArrayWithDetails;
  };

  return {
    getMovieDetailsById,
    getTopMoviesObject: (num) => getObjectByCategory("topMovies", num),
    getPopularMoviesObject: (num) => getObjectByCategory("popularMovies", num),
    getPopularTvShowsObject: (num) =>
      getObjectByCategory("popularTvShows", num),
    getTopTvShowsObject: (num) => getObjectByCategory("topTvShows", num),
    getMovieGenre: (num, genreId) =>
      getObjectByCategory(`genre_movie_${genreId}`, num),
    getTvShowGenre: (num, genreId) =>
      getObjectByCategory(`genre_TvShow_${genreId}`, num),
  };
}

export default useFuncOfStorage;
