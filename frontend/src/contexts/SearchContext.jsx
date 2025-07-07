// src/contexts/SearchContext.jsx

import React, { createContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

const initialOffset = {
  song: 0,
  album: 0,
  musicArtist: 0,
  audiobook: 0,
  author: 0, // ? does "author" exist in itunes response? or must it be "audiobookAuthor" to match itunes
  ebook: 0,
  podcast: 0,
  podcastAuthor: 0,
  podcastEpisode: 0,
};

const SearchProvider = ({ children }) => {
  //* INITIALISE STATE
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState({ ...initialOffset });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //* 1. MAIN SEARCH
  const fetchSearchResults = async (newTerm) => {
    setTerm(newTerm);
    setLoading(true);
    setError("");
    setResults([]);
    setOffset({ ...initialOffset });

    try {
      const tokenRes = await axios.get("/api/search/token");
      const token = tokenRes.data.token;

      const res = await axios.get("/api/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          term: newTerm,
          media: "all",
          limit: 25,
          offset: 0
        },
      });

      setResults(res.data);

    } catch (err) {
      setError(
        err?.response?.data?.message || "Oh my hat, something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  //* 2. FETCH MORE RESULTS
  const fetchMoreResults = async (entity) => {
    setLoading(true);
    setError("");
    const currentOffset = offset[entity] || 0;

    try {
          const token = (await axios.get("/api/search/token")).data.token;
      const res = await axios.get("/api/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          term,
          entity: entity,
          limit: 15, //todo (l): check that you are happy with this once app is up and running.
          offset: currentOffset,
        },
      });

      // APPEND NEW ITEMS
      setResults((prev) => [...prev, ...res.data]);
      // UP THE OFFSET FOR THAT ENTITY
      setOffset((prev) => ({
        ...prev,
        [entity]: currentOffset + res.data.length,
      }));
    } catch (err) {
      setError(err?.response?.data?.message || "Woops, that didn't work...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        term,
        results,
        loading,
        error,
        fetchSearchResults,
        fetchMoreResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
