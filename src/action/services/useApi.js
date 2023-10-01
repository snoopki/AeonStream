import { useState } from "react";
import * as FetchApi from "../fetch.js";

function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(num) {
    try {
      setIsLoading(true);

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
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      throw error;
    }
  }

  return {
    isLoading,
    fetchData,
  };
}

export default useApi;
