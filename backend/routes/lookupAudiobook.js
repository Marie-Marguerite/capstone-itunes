// routes/lookupAudiobook.js

const express = require("express");
const axios = require("axios");
const asyncHandler = require("../middleware/asyncHandler");
const verifyToken = require("../middleware/auth");

const router = express.Router();

//* GET /api/lookupAudiobook?/entity={entity}&id={xxxx}
router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { entity, id } = req.query;

    if (!entity || !id) {
      console.log("Lookup is missing entity or id");
      return res.status(400).json({ message: "Missing entity or id" });
    }

    //itunes lookup: return array
    const lookupUrl = `https://itunes.apple.com/lookup`;
    const params = {
      id,
      // If looking up an album - get song details
      entity: entity === "audiobook" ? "audiobook" : entity,
    };

    const { data } = await axios.get(lookupUrl, { params });

    // data.results[0] is the album; the rest are tracks
    const [audiobookInfo] = data.results;

    //* SIMPLIFY RESULTS 
    return res.json({
      audiobook: {
        artistName: audiobookInfo.artistName,
        artistId: audiobookInfo.artistId,
        collectionName: audiobookInfo.collectionName,
        artworkUrl: audiobookInfo.artworkUrl100 || audiobookInfo.artworkUrl600,
        releaseDate: audiobookInfo.releaseDate,
        primaryGenreName: audiobookInfo.primaryGenreName,
        description: audiobookInfo.description,
        country: audiobookInfo.country,
        //todo add time length... if it has it
      },
    });
  })
);

module.exports = router;
