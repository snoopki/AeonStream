const MAX_PAGE_ITEMS = 20;
const MAX_RETRIES = 3;

const sendAPI = async (uri) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2RmMjgwYTBjYjAxMjMwZTk3NjExYmQzMDY4NWJiMiIsInN1YiI6IjY0ZWM3MThlMWZlYWMxMDBlMTZiOTJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QTHDghdy41TbXdyRHcNGzBuZgEgcIAw_fJHKe7kG3K4";
  const url = `https://api.themoviedb.org/3/`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}${uri}`, options);
};

const organizeFetchingPages = async (uri, num) => {
  for (let retries = MAX_RETRIES; retries > 0; retries--) {
    try {
      const lastpage = Math.ceil(num / MAX_PAGE_ITEMS);
      const movies = [];

      for (let page = 1; page <= lastpage; page++) {
        const pageUri = `${uri}&page=${page}`;
        const response = await sendAPI(pageUri);
        const data = await response.json();

        movies.push(...data.results);
      }

      return movies.slice(0, num);
    } catch (error) {
      console.log(error);
    }
  }
  throw new Error("Request failed after 3 retries");
};

const fetchWatchID = async (uri) => {
  for (let retries = MAX_RETRIES; retries > 0; retries--) {
    try {
      const response = await sendAPI(uri);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  throw new Error("Request failed after 3 retries");
};

export const getTrailerMovies = async (movieId) => {
  const uri = `movie/${movieId}/videos?language=en-US`;
  return fetchWatchID(uri);
};

export const getTrailerTvShow = async (tvId) => {
  const uri = `tv/${tvId}/videos?language=en-US`;
  return fetchWatchID(uri);
};

export const genereMovie = async () => {
  const uri = "genre/movie/list?language=en";
  return fetchWatchID(uri);
};

export const genereTvShow = async () => {
  const uri = "genre/tv/list?language=en";
  return fetchWatchID(uri);
};
export const getMovieById = async (movieId) => {
  const uri = `movie/${movieId}?language=en-US`;
  return fetchWatchID(uri);
};

export const getTvShowById = async (tvId) => {
  const uri = `tv/${tvId}?language=en-US`;
  return fetchWatchID(uri);
};

export const getTopMovies = async (num) => {
  const uri = `movie/top_rated?language=en-US`;
  return await organizeFetchingPages(uri, num);
};

export const getPopularMovies = async (num) => {
  const uri = `movie/popular?language=en-US`;
  return organizeFetchingPages(uri, num);
};

export const getPopularTvShows = async (num) => {
  const uri = `tv/popular?language=en-US`;
  return organizeFetchingPages(uri, num);
};

export const getTopTvShows = async (num) => {
  const uri = `tv/top_rated?language=en-US`;
  return organizeFetchingPages(uri, num);
};

export const searchMoviesByName = async (query, num) => {
  const uri = `search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US`;

  return organizeFetchingPages(uri, num);
};

export const searchTvShowsByName = async (query, num) => {
  const uri = `search/tv?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US`;

  return organizeFetchingPages(uri, num);
};
