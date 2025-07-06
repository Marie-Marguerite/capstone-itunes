// src/components/Filters/Filters.jsx

import styles from "./Filters.module.css";

import React from "react";
import { useFilterContext } from "../../contexts/FilterContext";

//* FILTER OPTIONS
const filterOptions = [
  // "✿",
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
  const { activeFilters, toggleFilter, showFavouritesOnly, toggleShowFavouritesOnly } =
    useFilterContext();
  const { favourites } = useFavouritesContext();

  return (
    <div className={styles.filterWrapper}>
      {/* BUTTON: FAVOURITES (only if some) */}
      {favourites.length > 0 && (
        <button
          className={`${styles.bubble} ${showFavouritesOnly ? styles.active : ""}`}
          onClick={toggleShowFavouritesOnly}
        >
          ✿
        </button>
      )}

      {/* BUTTONS: FILTER BUBBLES */}
      {filterOptions.map((filter) => (
        <button
          key={filter}
          className={`${styles.bubble} ${
            activeFilters.includes(filter) ? styles.active : ""
          }`}
          onClick={() => toggleFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
