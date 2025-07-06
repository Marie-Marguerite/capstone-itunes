// App.jsx
import "./App.css";

import React from "react";
import { SearchProvider } from "./contexts/SearchContext";
import HomePage from "./pages/HomePage";
import { FilterProvider } from "./contexts/FilterContext";

function App() {
  return (
    <>
      <SearchProvider>
        <FilterProvider>
          <HomePage />
        </FilterProvider>
      </SearchProvider>
    </>
  );
}

export default App;
