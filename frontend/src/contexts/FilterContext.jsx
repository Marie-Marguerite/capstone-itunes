// src/contexts/FilterContext.jsx

import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  //* TOGGLE FILTER
  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? //? that is "f"?
          //? please explain !== again. I keep getting a little confused with it.
          prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  //* CLEAR FILTER
  const clearFilters = () => setActiveFilters([]);

  //* TOGGLE FAVOURITES
  const toggleShowFavouritesOnly = () => {
    setShowFavouritesOnly = (prev) => !prev;
  };

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        toggleFilter,
        clearFilters,
        showFavouritesOnly,
        setShowFavouritesOnly,
        toggleShowFavouritesOnly,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
