// src/contexts/FavouritesContext.jsx

import React, { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // ADD/REMOVE FAVOURITES (TOGGLE)
  const toggleFavourite = (item) => {
    setFavourites((prev) => {
      const isAlreadyFav = prev.some(
        (fav) => fav.collectionViewUrl === item.collectionViewUrl
      );
      return isAlreadyFav
        ? prev.filter((fav) => fav.collectionViewUrl !== item.collectionViewUrl)
        : [...prev, item];
    });
  };

  // CHECK IF ITEM IS A FAVOURITE
  const isFavourite = (item) => {
    return favourites.some(
      (fav => fav.collectionViewUrl === item.collectionViewUrl)
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouritesContext = () => useContext(FavouritesContext);
