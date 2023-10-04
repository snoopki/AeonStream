import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Carousel from "../components/Carousel";
import { searchMoviesByName, searchTvShowsByName } from "../action/fetch";
import { useParams } from "react-router-dom";
import AppBarComponent from "../components/AppBar";
import { calculateSimilarity } from "../constant/calculateSimilarity";

function SearchPage() {
  const { searchInput } = useParams();
  const num = 16;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Promise.all([
      searchMoviesByName(searchInput, num),
      searchTvShowsByName(searchInput, num),
    ])
      .then(([movieResults, tvResults]) => {
        const mergedResults = [...movieResults, ...tvResults];
        const sortedResults = mergedResults.sort((itemA, itemB) => {
          const similarityA = calculateSimilarity(
            itemA.title || itemA.name,
            searchInput
          );
          const similarityB = calculateSimilarity(
            itemB.title || itemB.name,
            searchInput
          );

          return similarityB - similarityA;
        });
        setSearchResults(sortedResults.slice(0, num));
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchInput]);

  return (
    <div>
      <AppBarComponent />
      <Container maxWidth={false} sx={{ mt: 15 }}>
        <Carousel apiFetched={searchResults} title="Search result" />
      </Container>
    </div>
  );
}

export default SearchPage;
