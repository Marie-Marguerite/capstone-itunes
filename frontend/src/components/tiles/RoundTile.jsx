// src/components/tiles/RoundTile.jsx
import styles from "./RoundTile.module.css";
import React from "react";
import { useFavouritesContext } from "../../contexts/FavouritesContext";

export default function RoundTile({ image, label, item }) {
  const { toggleFavourite, isFavourite } = useFavouritesContext();
  const fav = isFavourite(item);

  return (
    <div className={styles.tile}>
      {/* IMAGE */}
      <img src={image} alt={`Portrait of ${label}`} className={image} />
      
      {/* TITLE */}
      <h4 className={styles.label}>{label}</h4>
      
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
