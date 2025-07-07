// src/components/MediaResultDisplay/MediaBlock.jsx
import styles from "./MediaBlock.module.css";
import BlockTile from "../tiles/BlockTile";
import RoundTile from "../tiles/RoundTile";
import { useSearchContext } from "../../contexts/SearchContext";

export default function MediaBlock({
  title,
  entity,
  type = "", 
  data = [],
}) {
  const { fetchMoreResults, loading, offset } = useSearchContext();

  // CHECH TO DISPLAY 'SHOW MORE'
  const hasMore = data.length >= offset[entity] + 6;

  // IF NO RESPONSE DATA, SHOW NOTHING
  if (!data.length) return null;

  return (
    <div className={styles.block}>
      {/* TITLE */}
      <h2 className={styles.title}>{title}</h2>

      {/* TILE GRID */}
      {/* //! check round vs block type implementation, is the type specified in SearchResults.jsx reaching this intended destination? */}
      <div className={styles.tileGrid}>
        {data.map((item, index) =>
          type === "round" ? (
            <RoundTile
              key={index}
              image={item.artworkUrl100}
              label={item.artistName || "Unknown"}
              item={item}
            />
          ) : (
            <BlockTile
              key={index}
              image={item.artworkUrl100}
              title={item.trackName || item.collectionName || "Untitled"}
              subtitle={item.artistName || "Unknown"}
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

        // TODO BUTTON: SHOW LESS
      )}
    </div>
  );
}
