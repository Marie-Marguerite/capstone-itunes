// src/components/tiles/RoundTile.jsx

import styles from "./RoundTile.module.css";
import React from "react";
import { useFavouritesContext } from "../../contexts/useFavouritesContext";
import { useSearchContext } from "../../contexts/useSearchContext";

export default function RoundTile({ image, label, item }) {
  const { toggleFavourite, isFavourite } = useFavouritesContext();
  const { fetchArtistById } = useSearchContext();
  const fav = isFavourite(item);

  // HANDLE ARTIST NAME CLICK
  const handleArtistClick = () => {
    if (!item.artistId) return;
    fetchArtistById(item.artistId);
  };

  return (
    <div className={styles.tile}>
      {/* CLICKABLE AREA (ARTIST LINK/ ARTIST ID CALL) */}
      <div
        className={styles.clickableArea}
        onClick={() => {
          console.log("RoundTile clicked for (artistId):", item.artistId); 
          handleArtistClick();
        }}
      >
        {/* Image */}
        <img
          src={image}
          alt={`Portrait of ${label}`}
          className={styles.image}
        />

        {/* Title */}
        <h4 className={styles.label}>{label}</h4>
      </div>

      {/* BUTTON: FAVOURITES */}
      <button
        className={`${styles.favButton} ${fav ? styles.active : ""}`}
        onClick={() => toggleFavourite(item)}
      >
        <span className={fav ? styles.favIconActive : styles.favIconInactive}>
          ✿
        </span>
      </button>
    </div>
  );
}
