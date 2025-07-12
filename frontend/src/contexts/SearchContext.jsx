// src/contexts/SearchContext.jsx

import React, { createContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

const initialLimit = 16; // how many to load initially (first batch)
const showMoreBatchLimit = 8; // how many to load with each click of the "show more button"

const initialOffset = {
  song: 0,
  album: 0,
  musicArtist: 0,
  audiobook: 0,
  audiobookAuthor: 0,
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
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [audiobook, setAudiobook] = useState(null);

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
          limit: initialLimit,
          offset: 0,
        },
      });

      setResults(res.data);
    } catch (error) {
      setError(
        error?.res?.data?.message || "Oh my hat, something went wrong..."
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
          limit: showMoreBatchLimit,
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
    } catch (error) {
      setError(error?.res?.data?.message || "Woops, that didn't work...");
      console.log("Fetch more failed ('show more' button)");
    } finally {
      setLoading(false);
    }
  };

  //* 3.FETCH BY ARTIST ID
  const fetchArtistById = async (artistId) => {
    console.log("fetchartistById called with artistId:", artistId);
    setLoading(true);
    setError("");
    setResults([]);
    setOffset({ ...initialOffset }); // reset offset per media group key=value pair (new iteration)
    setTerm(""); // clear current user search term

    try {
      // Fetch a token
      const token = (await axios.get("/api/search/token")).data.token;
      console.log("Got token:", token);

      // Make the request: CALL /api/search WITH ARTIST ID AS SEARCH TERM
      const res = await axios.get("/api/lookupArtist", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          artistId, // now using artistId as the search term
          limit: initialLimit,
          offset: 0,
        },
      });
      console.log("Lookup response data:", res.data);

      // Update resuls
      setResults(res.data || []);
    } catch (error) {
      console.error("Fetch by Artist Id failed:", error);
      setError(
        error?.res?.data?.message ||
          "Woops, we could not load the artist's content"
      );
    } finally {
      setLoading(false);
    }
  };

  //! tracks
  //* 4. FETCH ALBUM DETAILS BY ID
  const fetchAlbumById = async (collectionId) => {
    setLoading(true);
    setError("");
    setAlbum([]); // clear previous results
    setTracks([]); // clear previous results

    try {
      const token = (await axios.get("/api/search/token")).data.token;
      const res = await axios.get("/api/lookupAlbum", {
        headers: { Authorization: `Bearer ${token}` },
        params: { entity: "album", id: collectionId },
      });

      setAlbum(res.data.album);
      setTracks(res.data.tracks || []);
    } catch (error) {
      console.error("Failed to load album details:", error);
      setError("Could not load album details");
    } finally {
      setLoading(false);
    }
  };

  //* 5. FETCH AUDIOBOOK DETAILS BY ID
  const fetchAudiobookById = async (collectionId) => {
    setLoading(true);
    setError("");
    setAudiobook([]); // clear previous results

    try {
      const token = (await axios.get("/api/search/token")).data.token;
      const res = await axios.get("/api/lookupAudiobook", {
        headers: { Authorization: `Bearer ${token}` },
        params: { entity: "audiobook", id: collectionId },
      });

      setAudiobook(res.data.audiobook);
    } catch (error) {
      console.error("Failed to load audiobook details:", error);
      setError("Could not load audibook details");
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
        offset,
        fetchSearchResults,
        fetchMoreResults,
        fetchArtistById,

        fetchAudiobookById,
        audiobook,
        setAudiobook,

        fetchAlbumById,
        album,
        // setAlbum, //? dont believe im using this in another file
        tracks,
        // setTracks, //? dont believe im using this in another file
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
