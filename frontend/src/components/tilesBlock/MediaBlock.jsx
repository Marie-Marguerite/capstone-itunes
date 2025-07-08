// src/components/tileBlock/MediaBlock.jsx
import styles from "./MediaBlock.module.css";
import SquareTile from "../tiles/SquareTile";
import RoundTile from "../tiles/RoundTile";
import { useSearchContext } from "../../contexts/useSearchContext";
import React, {useEffect} from "react";
export default function MediaBlock({
  title,
  entity,
  type = "square", 
  data = [],
}) {
  const { fetchMoreResults, loading, offset } = useSearchContext();

  //!
  useEffect (()=>{
    if (data.length){
      console.log(`[MediaBlock:${entity}] sample item:`, data[0]);
    }
  }, [entity, data]);

// FALLBACK IMAGE
const fallbackImage = "../../assets/fallbackImage100.png"

  // CHECH TO DISPLAY 'SHOW MORE'
  const hasMore = data.length >= offset[entity] + 6;

  // IF NO RESPONSE DATA, SHOW NOTHING
  if (!data.length) return null;

  return (
    <div className={styles.block}>
      {/* TITLE */}
      <h2 className={styles.title}>{title}</h2>

      {/* TILE GRID */}
      <div className={styles.tileGrid}>
        {data.map((item, index) =>
          type === "round" ? (
            <RoundTile
              key={index}
              image={item.artworkUrl100 || item.artworkUrl600 || fallbackImage}
              label={item.artistName || "Unknown"}
              item={item}
            />
          ) : (
            <SquareTile
              key={index}
              image={item.artworkUrl100 || item.artworkUrl600 || fallbackImage}
              title={item.trackName || item.collectionName || "Untitled"}
              subtitle={item.artistName || item.collectionName || "Unknown"}
              date={new Date(item.releaseDate).getFullYear()}
              item={item}
            />
          )
        )}
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

// note: https://icons8.com/icons/set/artwork