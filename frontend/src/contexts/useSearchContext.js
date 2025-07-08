// context/useSearchContext.js
import React, {useContext} from "react";
import { SearchContext } from "./SearchContext";

export const useSearchContext = () => useContext(SearchContext);
