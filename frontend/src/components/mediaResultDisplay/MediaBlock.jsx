// src/components/MediaResultDisplay/MediaBlock.jsx
import styles from "./MediaBlock.module.css";
import React, { useState } from "react";
import BlockTile from "../tiles/BlockTile";
import RoundTile from "../tiles/RoundTile";

export default function MediaBlock({ title, type = "block", data = [] }) {
  const [showAll, setShowAll] = useState(false);

  if (!data.length) return null;

  const visibleItems = showAll ? data : data.slice(0, 6);
  const hasMoreThanSix = data.length > 6;

  return (
    <div className={styles.block}>
      {/* TITLE */}
      <h2 className={styles.title}>{title}</h2>

      {/* TILE GRID */}
      <div className={styles.tileGrid}>
        {visibleItems.map((item, index) =>
          type === "round" ? (
            <RoundTile
              key={index}
              image={item.artworkUrl100}
              label={item.artistName || "Unknown Artist"}
              item={item}
            />
          ) : (
            <BlockTile
              key={index}
              image={item.artworkUrl100}
              title={item.trackName || item.collectionName || "Untitled"}
              subtitle={item.artistName || "Unknown Artist"}
              date={new Date(item.releaseDate).getFullYear()}
              item={item}
            />

          )
        )}
      </div>

      {/* BUTTON: SHOW MORE / LESS */}
      {hasMoreThanSix && (
        <button
          className={styles.toggleMoreLessButton}
          onClick={() => setShowAll((prev) => !prev)} // set to previous value
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
