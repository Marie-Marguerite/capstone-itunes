// routes/lookupAlbum.js

const express = require("express");
const axios = require("axios");
const asyncHandler = require("../middleware/asyncHandler");
const verifyToken = require("../middleware/auth");

const router = express.Router();

//* GET /api/lookupAlbum?/entity={entity}&id={xxxx}
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
      entity: entity === "album" ? "song" : entity,
    };

    const { data } = await axios.get(lookupUrl, { params });

    // data.results[0] is the album; the rest are tracks
    const [albumInfo, ...tracks] = data.results;

    //* SIMPLIFY RESULTS (ALBUM DETAILS & TRACKS)
    return res.json({
      // ALBUM INFO
      album: {
        artistName: albumInfo.artistName,
        artistId: albumInfo.artistId,
        collectionName: albumInfo.collectionName,
        artworkUrl: albumInfo.artworkUrl100 || artworkUrl600,
        releaseDate: albumInfo.releaseDate,
      },
      // TRACKS
      tracks: tracks.map((track) => ({
        trackId: track.trackId,
        trackName: track.trackName,
        trackTimeMillis: track.trackTimeMillis,
        previewUrl: track.previewUrl, // ? what is this used for?
      })),
    });
  })
);

module.exports = router;
