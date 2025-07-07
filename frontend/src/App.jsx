// App.jsx
import "./App.css";

import React from "react";
import HomePage from "./pages/HomePage";
import { SearchProvider } from "./contexts/SearchContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { FilterProvider } from "./contexts/FilterContext";

function App() {
  return (
    <>
      <SearchProvider>
        <FavouritesProvider>
          <FilterProvider>
            <HomePage />
          </FilterProvider>
        </FavouritesProvider>
      </SearchProvider>
    </>
  );
}

export default App;
