// routes/search.js

/*
! with results:
songs;
musicArtist;
albums;
audiobooks;
audiobookAuthors;
ebooks;
podcasts;
podcastEpisodes.

!without results:
podcastAuthors.

*/

const express = require("express");
const axios = require("axios");
const asyncHandler = require("../middleware/asyncHandler");
const verifyToken = require("../middleware/auth");

const router = express.Router();

//* Dummy token generator for the frontend to use
router.get("/token", (req, res) => {
  res.json({ token: "dummy.jwt.token.here" });
});

// ============================
//* 1. DUMMY TOKEN ENDPOINT
//* MAIN SEARCH ROUTE
router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    let { term, entity = "", limit = 8, offset = 0 } = req.query;
    // Ensure these values are Numbers and not stings
    //? what are the 10s?
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    // REQUIRE SEARCH TERM: IF NO SEARCH TERM
    if (!term) {
      return res.status(400).json({ message: "What can we get for you?" });
    }

    const encodedTerm = encodeURIComponent(term);

    // GET DUMMY TOKEN
    const tokenRes = await axios.get(
      `${req.protocol}://${req.get("host")}/api/search/token`
    );
    const token = tokenRes.data.token;

    // ==========================================
    // SINGLE-ENTITY "SHOW MORE" CALLS
    //*  A. IF FETCH MORE: IF TYPE/ENTITY IS PROVIDED, USE IT
    //* 1. BUILD THE URL
    if (entity) {
      const url =
        `https://itunes.apple.com/search` +
        `?term=${encodedTerm}` +
        `&entity=${encodeURIComponent(entity)}` +
        `&limit=${limit}` +
        `&offset=${offset}`;

      //* 2. MAKE REQUEST
      const { data } = await axios.get(url);
      let results = data.results;

      //* 3. SIMPLIFY RESPONSE (default formatting for other entities)
      const simplifiedResults = data.results.map((item) => ({
        artistName: item.artistName,
        artistId: item.artistId,
        trackName: item.trackName,
        collectionName: item.collectionName,
        collectionId: item.collectionId,
        artworkUrl100: item.artworkUrl100,
        artworkUrl600: item.artworkUrl600,
        releaseDate: item.releaseDate,
        wrapperType: item.wrapperType,
        artistType: item.artistType,
        kind: item.kind,
        previewUrl: item.previewUrl,
        collectionViewUrl: item.collectionViewUrl,
      }));

      return res.json(simplifiedResults);
    }

    // ===================================
    // HOME PAGE INITIAL CALL TO DISPLAY ALL (PARALLEL SLICE OF EVERY ENTITY )
    //* B. NO ENTITY: FETCH ONE SLICE PER CATEGORY IN PARALLEL)
    //* 1. DEFINE EACH ENTITY TO FETCH
    const entities = [
      "song",
      "musicArtist",
      "album",
      "audiobook",
      "ebook",
      "podcast",
      "podcastAuthor", 
      "podcastEpisode",
    ];

    //* 2. BUILD AND FIRE ONE REQ PER ENTITY (ALL AT ONE)
    try {
      // FIRE ONE REQUEST PER ENTITY
      const responses = await Promise.all(
        entities.map((entity) => {
          // fetch more than others for audiobook & podcast author to increase changes for results
          return axios.get("https://itunes.apple.com/search", {
            params: {
              term,
              entity,
              limit,
              offset,
            },
          });
        })
      );

      // CONSOLE.LOG: SEE WHAT CAME IN
      console.log(
        "PARALLEL RESPONSES:",
        responses.map((r) => ({
          entity: r.config.params.entity,
          count: r.data.results.length,
        }))
      );

      //* 3. COMBINE ALL RESULTS
      const allRaw = responses.flatMap((r) => r.data.results.slice(0, limit));

      //* 4. REMOVE DUPLICATE BY collectionViewUrl / trackViewUrl / artistViewUrl / trackId
      const uniqueMap = new Map();
      allRaw.forEach((item) => {
        const key =
          item.collectionViewUrl ||
          item.trackViewUrl ||
          item.artistViewUrl ||
          item.collectionId?.toString() ||
          item.trackId?.toString() ||
          item.artistId?.toString();

        if (!key) return;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      });

      const uniqueResults = Array.from(uniqueMap.values());

      //* 5. SIMPLIFY THE RESPONSE OBJECT FOR FRONTEND
      const simplifiedResults = uniqueResults.map((item) => ({
        artistName: item.artistName,
        artistId: item.artistId,
        trackName: item.trackName,
        collectionName: item.collectionName,
        collectionId: item.collectionId,
        artworkUrl100: item.artworkUrl100,
        artworkUrl600: item.artworkUrl600,
        releaseDate: item.releaseDate,
        wrapperType: item.wrapperType,
        artistType: item.artistType,
        kind: item.kind,
        previewUrl: item.previewUrl,
        collectionViewUrl: item.collectionViewUrl,
      }));

      //* 6. RETURN THE UNIFIED RESPONSE ARRAY
      return res.json(simplifiedResults);
    } catch (error) {
      console.error(
        "itunes parallel-fetch error (B):",
        error.response?.data || error.message
      );
      return res.status(502).json({ message: "itunes API Error" });
    }
  })
);

module.exports = router;
