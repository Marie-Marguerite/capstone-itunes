// src/components/Filters/Filters.jsx

import styles from "./Filters.module.css";

import React from "react";
import { useFilterContext } from "../../contexts/FilterContext";
import { useFavouritesContext } from "../../contexts/FavouritesContext";

//* FILTER OPTIONS
//todo split buttons by media groups (music, books, pods) because i want to style each groups corresponding filter differently (different background-color & color...)
// todo add media groups as filters too 
const filterOptions = [
  "songs",
  "artists",
  "albums",
  "audiobooks",
  "authors",
  "ebooks",
  "podcasts",
  "podcastors",
  "episodes",
];

//* FILTERS
export default function Filters() {
  const {
    activeFilters,
    toggleFilter,
    showFavouritesOnly,
    toggleShowFavouritesOnly,
    clearFilters,
  } = useFilterContext();
  const { favourites } = useFavouritesContext();

  return (
    <div className={styles.filterWrapper}>
      {/* BUTTON: FAVOURITES (only if some) */}
      {favourites.length > 0 && (
        <button
          className={`${styles.bubble} ${
            showFavouritesOnly ? styles.active : ""
          }`}
          onClick={toggleShowFavouritesOnly}
        >
          ✿
        </button>
      )}

      {/* BUTTONS: FILTER BUBBLES */}
      {filterOptions.map((filter) => (
        <>
          {/* - filters */}
          <button
            key={filter}
            className={`${styles.bubble} ${
              activeFilters.includes(filter) ? styles.active : ""
            }`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>

          {/* - clear filters */}
          <button
            key={filter}
            className={`${styles.bubble} ${
              activeFilters.includes(filter) ? styles.active : ""
            }`}
            onClick={() => clearFilters(filter)}
          >
            x
          </button>
        </>
      ))}
    </div>
  );
}
