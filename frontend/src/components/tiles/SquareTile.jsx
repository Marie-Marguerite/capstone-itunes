// src/components/tiles/SquareTile.jsx
import styles from "./SquareTile.module.css";
import React from "react";
import { useFavouritesContext } from "../../contexts/useFavouritesContext";
import { useSearchContext } from "../../contexts/useSearchContext";

export default function SquareTile({
  image,
  title,
  subtitle,
  date,
  item,
  onTitleClick,
}) {
  const { toggleFavourite, isFavourite } = useFavouritesContext();
  const { fetchArtistById } = useSearchContext();

  const fav = isFavourite(item);

  // HANDLE ARTIST NAME CLICK
  const handleArtistClick = () => {
    if (!item.artistId) return;
    fetchArtistById(item.artistId);
  };

  return (
    <>
      <div className={styles.tile}>
        <div>
          {/* IMAGE */}
          <img
            src={image}
            alt={`Album art of ${title}`}
            className={styles.image}
          />
        </div>

        <div className={styles.detailsWrapper}>
          {/* DETAILS */}
          <div className={styles.info}>
            {/* - title: clickable for detailOverlay */}
            <div className={styles.titleLink}>
              <a onClick={onTitleClick} className={styles.titleLink}>
                {title}
              </a>
            </div>

            {/* - subtitle: clickable for artist search */}
            <div>
              <a onClick={handleArtistClick} className={styles.subtitleLink}>
                {subtitle}
              </a>
            </div>

            <p>{date}</p>
          </div>
        </div>

        {/* BUTTON: FAVOURITES */}
        <div>
          <button
            //? styling: this button is not showing if the classname line is uncommented...
            // className={`${styles.favButton} ${fav ? styles.active : ""}`}
            onClick={() => toggleFavourite(item)}
          >
            <span
              className={fav ? styles.favIconActive : styles.favIconInactive}
            >
              ✿
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
