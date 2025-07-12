// src/components/tileBlock/MediaBlock.jsx

import styles from "./MediaBlock.module.css";

import React, { useEffect, useState } from "react";
import SquareTile from "../tiles/SquareTile";
import RoundTile from "../tiles/RoundTile";
import { useSearchContext } from "../../contexts/useSearchContext";
import fallbackImage from "../../assets/fallbackImage100.png";
import fallbackImageArtist from "../../assets/fallbackImageArtist64.png";
import AlbumDetailPopup from "../details/AlbumDetailPopup";
import AudiobookDetailPopup from "../details/AudiobookDetailPopup" 
//todo low priority: might want the fallbackImageArtist is variuos alternating colour.

export default function MediaBlock({
  title,
  entity,
  type = "square",
  data = [],
}) {
  const { fetchMoreResults, loading, offset, results, initialLimit } =
    useSearchContext();
  const [openAlbumId, setOpenAlbumId] = useState(null);
  const [openAudiobookId, setOpenAudiobookId] = useState(null);

  // CONSOLE LOG: FOR DEBUGGING (log 'n sample item whenever data or entity changes)
  useEffect(() => {
    if (data.length) {
      console.log(`[MediaBlock:${entity}] sample item:`, data[0]);
    }
  }, [entity, data]);

  //* FALLBACK IMAGE
  // (HELPER) FIND ARTIST COVER: FALLBACK FROM API
  //  helper to grab a cover image when the API gives no artist image
  //! low priority: not working (will be deleting this code later since i am happy using an icon (the current fallback)- not going to use it)
  const findArtistCover = (artistName) => {
    // Find a collection artwork by that artist to display (no artist artworks available from the API)
    const match = results.find(
      (result) =>
        result.artistName === artistName &&
        //pick whichever makes sense for that media group
        (result.wrapperType === "collection" ||
          result.wrapperType === "track" ||
          result.kind === "album" ||
          result.kind === "audiobook")
    )?.artworkUrl100;
    return match?.artworkUrl100 || match?.artworkUrl600;
  };

  //* IF NO RESPONSE DATA, SHOW NOTHING
  if (!data.length) return null;

  //* CHECH WHETHER OR NOT TO DISPLAY 'SHOW MORE' BUTTON
  const hasMore = data.length >= offset[entity] + Number(initialLimit);

  return (
    <div className={styles.block}>
      {/* TITLE */}
      <h2 className={styles.title}>{title}</h2>

      {/* TILE GRID */}
      <div className={styles.tileGrid}>
        {data.map((item, index) => {
          //* 1. ALBUM TITLES get a click handler and popup
          if (entity === "album" && type === "square") {
            return (
              <div key={item.collectionId + "-" + index}>
                <SquareTile
                  image={
                    item.artworkUrl100 || item.artworkUrl600 || fallbackImage
                  }
                  title={item.collectionName}
                  subtitle={item.artistName}
                  date={new Date(item.releaseDate).getFullYear()}
                  item={item}
                  onTitleClick={() => setOpenAlbumId(item.collectionId)}
                />
                <AlbumDetailPopup
                  isOpen={openAlbumId === item.collectionId}
                  onClose={() => setOpenAlbumId(null)}
                  collectionId={item.collectionId}
                />
              </div>
            );
          }

          //* 2. AUDIOBOOK TITLES get a click handler and popup
          if (entity === "audiobook" && type === "square") {
            return (
              <div key={item.collectionId + "-" + index}>
                <SquareTile
                  image={
                    item.artworkUrl100 || item.artworkUrl600 || fallbackImage
                  }
                  title={item.collectionName}
                  subtitle={item.artistName}
                  date={new Date(item.releaseDate).getFullYear()}
                  item={item}
                  onTitleClick={() => setOpenAudiobookId(item.collectionId)}
                />
                <AudiobookDetailPopup
                  isOpen={openAudiobookId === item.collectionId}
                  onClose={() => setOpenAudiobookId(null)}
                  collectionId={item.collectionId}
                />
              </div>
            );
          }

          //* 2. ROUND TILES (artists & authors)
          if (type === "round") {
            return (
              <RoundTile
                key={index}
                image={
                  // If artist and no artwork, use their first album/book/podcast cover
                  item.artworkUrl100 ||
                  item.artworkUrl600 ||
                  findArtistCover(item.artistName) ||
                  fallbackImageArtist
                }
                label={item.artistName || "Unknown"}
                item={item}
              />
            );
          }

          //* 3. DEFAULT - SQUARE TILES: (songs, podcasts, etx)
          return (
            <SquareTile
              key={index}
              image={item.artworkUrl100 || item.artworkUrl600 || fallbackImage}
              title={item.trackName || item.collectionName || "Untitled"}
              subtitle={item.artistName || item.collectionName || "Unknown"}
              date={new Date(item.releaseDate).getFullYear()}
              item={item}
            />
          );
        })}
      </div>

      {/* BUTTON: SHOW MORE / LESS */}
      {hasMore && (
        <button
          className={styles.toggleMoreLessButton}
          onClick={() => fetchMoreResults(entity)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show More"}
        </button>

        // TODO BUTTON: SHOW LESS (ONLY SHOW THE INITIAL BATCH)
      )}
    </div>
  );
}

//todo update: 
/* note: https://icons8.com/icons/set/artwork
https://icons8.com/icon/UA9AboCq7wiP/flower-doodle */
