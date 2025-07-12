// src/components/Filters/Filters.jsx

import styles from "./Filters.module.css";

import React from "react";
import { useFilterContext } from "../../contexts/useFilterContext";
import { useFavouritesContext } from "../../contexts/useFavouritesContext";

//* FILTER GROUPS
const filterGroups = {
  music: ["songs", "artists", "albums"],
  books: ["audiobooks", "audiobookAuthors", "ebooks"],
  pods: ["podcasts", "podcastAuthors", "podcastEpisodes"],
};

export default function Filters() {
  const {
    activeFilters,
    toggleFilter,
    showFavouritesOnly,
    toggleShowFavouritesOnly,
    clearFilters,
    mediaFilterGroup,
  } = useFilterContext();

  const { favourites } = useFavouritesContext();

  //* FILTERS TO DISPLAY BASED ON MEDIA FILTER SELECTION
  //* CONDITIONALLY SHOWS FILTERS DEPENDING ON mediaFilterGroup
  const currentFilters =
    mediaFilterGroup === "all"
      ? // Return an arry of the filterGroup arrays & flatten into one array (single)
        Object.values(filterGroups).flat()
      : // If not "all": retun just the filters from the selected group
        filterGroups[mediaFilterGroup] || [];

  return (
    <div className={styles.filterWrapper}>
      {/* BUTTON: FAVOURITES TOGGLE */}
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
      <div className={`${styles.group} ${styles[mediaFilterGroup]}`}>
        {currentFilters.map((filter) => (
          <button
            key={filter}
            // Style: if included in active filters, mark to style as active
            className={`${styles.bubble} ${
              activeFilters.includes(filter) ? styles.active : ""
            }`}
            // Toggle filter (active/inactive)
            onClick={()=>toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* BUTTON: CLEAR FILTERS */}
      {activeFilters.length > 0 && (
        <button
          className={`${styles.bubble} ${styles.clear}`}
          onClick={() => clearFilters()}
        >
          ✖ clear
        </button>
      )}
    </div>
  );
}
