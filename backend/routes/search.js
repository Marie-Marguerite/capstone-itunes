// routes/search.js

const express = require("express");
const axios = require("axios");
const asyncHandler = require("../middleware/asyncHandler");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Dummy token generator for the frontend to use
router.get("/token", (req, res) => {
  res.json({ token: "dummy.jwt.token.here" });
});

//* SETUP MAIN SEARCH ROUTE
router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { term, entity = "", limit = 25, offset = 0 } = req.query;

    // IF NO SEARCH TERM
    if (!term) {
      return res.status(400).json({ message: "What can we get for you?" });
    }

    const encodedTerm = encodeURIComponent(term);

    //* BUILD THE URL
    const limitInt = parseInt(limit, 10);
    const offsetInt = parseInt(offset, 10);

    let url 
      = `https://itunes.apple.com/search`
      + `?term=${encodedTerm}`
      + `&limit=${limitInt}`
      + `&offset=${offset}`;

    //  IF FETCH MORE: IF TYPE IS PROVIDED, USE IT
    if (entity) {
      url += `&entity=${encodeURIComponent(entity)}`;
    }

    //* MAKE REQUEST
    const { data } = await axios.get(url);

    //* SIMPLIFY RESPONSE
    const simplifiedResults = data.results.map((item) => ({
      artistName: item.artistName,
      trackName: item.trackName,
      collectionName: item.collectionName,
      artworkUrl100: item.artworkUrl100, // todo (l) add: fallback image here (or in block/roundTile) for artists/authors
      releaseDate: item.releaseDate,
      wrapperType: item.wrapperType,
      artistType: item.artistType,
      kind: item.kind,
      previewUrl: item.previewUrl,
      collectionViewUrl: item.collectionViewUrl,
    }));

    res.json(simplifiedResults);
  })
);

module.exports = router;
