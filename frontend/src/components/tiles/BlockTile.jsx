// src/components/tiles/BlockTile.jsx
import styles from "./BlockTile.module.css";
import React from "react";
import { useFavouritesContext } from "../../contexts/FavouritesContext";

export default function BlockTile({ image, title, subtitle, date, item }) {
  //? why not  const {toggleFavourites, isFavourite } = useContext(FavouritesContext);

  const { toggleFavourite, isFavourite } = useFavouritesContext();
  const fav = isFavourite(item);

  return (
    <div className={styles.tile}>
      {/* IMAGE */}
      <img src={image} alt={`Album art of ${title}`} className={styles.image} />

      <div className={styles.detailsWrapper}>
        {/* DETAILS */}
        <div className={styles.info}>
          <h4>{title}</h4>
          <p>{subtitle}</p>
          <p>{date}</p>
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
    </div>
  );
}
