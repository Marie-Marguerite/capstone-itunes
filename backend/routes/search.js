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

router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { term, media = "all", type = "" } = req.query;

    if (!term) {
      return res.status(400).json({ message: "What can we get for you?" });
    }

    const encodedTerm = encodeURIComponent(term);
    //? how to handle a 'show more" button?
    const limit = 25;

    let url = `https://itunes.apple.com/search?term=${encodedTerm}&limit=${limit}`;
    if (media !== "all") url += `&media=${media}`;
    if (type) url += `&type=${type}`;
    const { data } = await axios.get(url);

    //* SIMPLIFY RESPONSE
    const simplifiedResults = data.results.map((item) => ({
      artistName: item.artistName,
      trackName: item.trackName || item.collectionName,
      artworkUrl100: item.artworkUrl100,
      releaseDate: item.releaseDate,
      kind: item.kind,
      previewUrl: item.previewUrl,
      collectionViewUrl: item.collectionViewUrl,
    }));

    res.json(simplifiedResults);
  })
);

module.exports = router;
