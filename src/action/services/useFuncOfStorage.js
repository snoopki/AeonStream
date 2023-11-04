import * as localStorageHandler from "./useLocalStorage.js";

export const getMovieDetailsById = (id) => {
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
      categoryArrayWithDetails.push(JSON.parse(itemDetails));
    }
  }
  return categoryArrayWithDetails;
};

export const getTopMoviesObject = (num) =>
  getObjectByCategory("topMovies", num);
export const getPopularMoviesObject = (num) =>
  getObjectByCategory("popularMovies", num);
export const getPopularTvShowsObject = (num) =>
  getObjectByCategory("popularTvShows", num);
export const getTopTvShowsObject = (num) =>
  getObjectByCategory("topTvShows", num);
export const getMovieGenre = (num, genreId) =>
  getObjectByCategory(`genre_movie_${genreId}`, num);
export const getTvShowGenre = (num, genreId) =>
  getObjectByCategory(`genre_TvShow_${genreId}`, num);
