// src/contexts/FilterContext.jsx

import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [mediaFilterGroup, setMediaFilterGroup] = useState("all");

  //* TOGGLE FILTER
  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  //* CLEAR FILTER
  const clearFilters = () => setActiveFilters([]);

  //* TOGGLE FAVOURITES
  const toggleShowFavouritesOnly = () => {
    setShowFavouritesOnly((prev) => !prev);
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
        mediaFilterGroup,
        setMediaFilterGroup,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider}; 
export const useFilterContext = () => useContext(FilterContext); 
