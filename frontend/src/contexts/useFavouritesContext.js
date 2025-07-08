// context/useFavouritesContext.js

import { useContext } from "react";
import{FavouritesContext} from "./FavouritesContext";

export const useFavouritesContext = () => useContext(FavouritesContext);
