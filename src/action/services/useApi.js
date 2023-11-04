import { useState } from "react";
import * as FetchApi from "../fetch.js";

function useApi() {
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(num) {
    const topMovies = await FetchApi.getTopMovies(num);
    const popularMovies = await FetchApi.getPopularMovies(num);
    const popularTvShows = await FetchApi.getPopularTvShows(num);
    const topTvShows = await FetchApi.getTopTvShows(num);

    setIsLoading(false);
    return {
      topMovies,
      popularMovies,
      popularTvShows,
      topTvShows,
    };
  }

  return {
    isLoading,
    fetchData,
  };
}

export default useApi;
