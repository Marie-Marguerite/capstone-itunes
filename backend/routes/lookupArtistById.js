// routes/lookupArtistById.js

const express = require("express");
const axios = require("axios");
const asyncHandler = require("../middleware/asyncHandler");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// DEFINE EACH ENTITY TO FETCH
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

router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    //? why are limit and offset not receiving the right data when search context is giving it to them.
    const { artistId, limit: limitRaw, offset: offsetRaw } = req.query;

    //* 1 LOOKUP BY ARTIST ID
    // If an artistId is provided use that to do a lookup:

    if (!artistId) {
      return res.status(400).json({ message: "Missing artistId" });
    }

    const limit = Math.max(parseInt(limitRaw, 10) || 0, 1);
    const offset = parseInt(offsetRaw, 10) || 0;

    // BUILD LOOOKUP URL

    console.log("[search.js] artistId lookup:", { artistId, limit, offset });

    try {
      //   // call lookup for all media by that artist
      //   // FIRE ONE REQUEST PER ENTITY
      //   const responses = await Promise.all(
      //     entities.map((entity) => {
      //       return axios.get("https://itunes.apple.com/lookup", {
      //         params: {
      //           id: artistId,
      //           entity,
      //           limit,
      //           offset,
      //         },
      //       });
      //     })
      //   );

      const responses = await Promise.all(
        entities.map(async (entity) => {
          const url = "https://itunes.apple.com/lookup";
          const params = { id: artistId, entity, limit, offset };

          try {
            const res = await axios.get(url, { params });
            console.log(
              `✅ [iTunes ${entity}] ${res.data.resultCount} results`
            );
            return res;
          } catch (err) {
            console.warn(`❌ [iTunes ${entity}] lookup failed`, {
              url,
              params,
              error: err?.response?.data || err.message,
            });
            return { data: { results: [] } }; // gracefully return empty results for failed entity
          }
        })
      );

      // COMBINE ALL RESULTS
      const allRaw = responses.flatMap((r) => r.data.results);

      // REMOVE DUPLICATE BY collectionViewUrl / trackViewUrl / artistViewUrl / trackId
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

      //! something is wrong. this is not displaying.
      // SIMPLIFIED RESULTS
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

      console.log(
        "[search.js] simplifiedResults sample: ",
        simplifiedResults[0]
      );

      return res.json(simplifiedResults);
    } catch (error) {
      console.error(
        "itunes parallel-fetch for lookup by artistId failed: ",
        error?.res?.data || error
      );
      return res.status(502).json({ message: "itunes API error. " });
    }
  })
);

module.exports = router;
