// src/contexts/SearchContext.jsx

import React, { createContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSearchResults = async (newTerm, newMedia) => {
    setTerm(newTerm);
    setMedia(newMedia);
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const tokenRes = await axios.get("/api/search/token");
      const token = tokenRes.data.token;

      const res = await axios.get("/api/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          term: newTerm,
          media: newMedia,
        },
      });

      setResults(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Oh hat, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        term,
        media,
        results,
        loading,
        error,
        fetchSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
