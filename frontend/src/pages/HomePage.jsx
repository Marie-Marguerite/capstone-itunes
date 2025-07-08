// src/pages/HomePage.jsx

import React, { useContext } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Filters from "../components/Filters/Filters";
import { SearchContext } from "../contexts/SearchContext";
import SearchResults from "../components/displayResults/SearchResults";

export default function HomePage() {
  const { fetchSearchResults, results, error } = useContext(SearchContext);

  return (
    <div>
      {/* SEARCH BAR */}
      <SearchBar onSearch={fetchSearchResults} />
      {error && <p>{error}</p>}

      {/* FILTERS */}
      <Filters />

      {/* SEARCH RESULTS */}
      {results.length > 0 && <SearchResults />}
    </div>
  );
}
