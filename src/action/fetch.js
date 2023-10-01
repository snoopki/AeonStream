const MAX_PAGE_ITEMS = 20;

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

async function requestManager(func) {
  let retries = 3;
  while (retries > 0) {
    try {
      return await func();
    } catch (e) {
      console.log(e);
      retries--;
    }
  }
  throw Error("request failed");
}

const fetchShowAndMovie = async (uri, num) => {
  const lastpage = Math.ceil(num / MAX_PAGE_ITEMS);
  const movies = [];

  for (let page = 1; page <= lastpage; page++) {
    const pageUri = `${uri}&page=${page}`;
    const response = await sendAPI(pageUri);
    const data = await response.json();

    const PushMovies = data.results;
    movies.push(...PushMovies);
  }

  return movies.slice(0, num);
};

const fetchWatchID = async (uri) => {
  const response = await sendAPI(uri);
  const data = await response.json();
  return data;
};

export const getMovieById = async (movieId) => {
  const uri = `movie/${movieId}?language=en-US`;
  return requestManager(() => fetchWatchID(uri));
};

export const getTvShowById = async (tvId) => {
  const uri = `tv/${tvId}?language=en-US`;
  return requestManager(() => fetchWatchID(uri));
};

export const getTopMovies = async (num) => {
  const uri = `movie/top_rated?language=en-US`;
  return requestManager(() => fetchShowAndMovie(uri, num));
};

export const getPopularMovies = async (num) => {
  const uri = `movie/popular?language=en-US`;
  return fetchShowAndMovie(uri, num);
};

export const getPopularTvShows = async (num) => {
  const uri = `tv/popular?language=en-US`;
  return fetchShowAndMovie(uri, num);
};

export const getTopTvShows = async (num) => {
  const uri = `tv/top_rated?language=en-US`;
  return fetchShowAndMovie(uri, num);
};

export const searchMoviesByName = async (query, num) => {
  const uri = `search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US`;

  return fetchShowAndMovie(uri, num);
};

export const searchTvShowsByName = async (query, num) => {
  const uri = `search/tv?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US`;

  return fetchShowAndMovie(uri, num);
};

export const genereMovie = async () => {
  const response = await sendAPI("genre/movie/list?language=en");
  const data = await response.json();
  return data;
};

export const genereTvShow = async () => {
  const response = await sendAPI("genre/tv/list?language=en");
  const data = await response.json();
  return data;
};
