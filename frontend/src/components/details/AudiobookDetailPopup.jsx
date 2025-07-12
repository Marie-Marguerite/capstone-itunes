// src/components/details/AudiobookDetailPopup.jsx
import styles from "./DetailPopup.module.css";
import React, { useEffect } from "react";
// import axios from "axios";
import FallbackImage from "../../assets/fallbackImage100.png";
import { useSearchContext } from "../../contexts/useSearchContext";

export default function AudiobookDetailPopup({
  isOpen,
  onClose,
  collectionId,
}) {
  const { fetchArtistById, fetchAudiobookById, audiobook } = useSearchContext();

  // HANDLE: CLICK ON ARTIST NAME
  const handleArtistClick = () => {
    if (!audiobook.artistId) return;
    fetchArtistById(audiobook.artistId); // trigger search
    onClose(); // close popup
  };

// FETCH: AUDIOBOOK DETAILS
    useEffect(() => {
      if (isOpen && collectionId) fetchAudiobookById(collectionId);
  }, [isOpen, collectionId]);

  // IF NOT OPEN OR NO AUDIOBOOK: DO NOTHING
  if (!isOpen || !audiobook) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* BUTTON: CLOSE */}
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {/* IMAGE */}
        <img
          className={styles.audiobookImage}
          src={audiobook.artworkUrl || FallbackImage}
          alt={`Audiobook cover of ${audiobook.collectionName}`}
        />
        {/* HEADING: AUDIOBOOK NAME */}
        <h2>{audiobook.collectionName}</h2>
        
        {/* SUBHEADING: ARTIST NAME (CLICKABLE) */}
        <p className={styles.artistLink} onClick={handleArtistClick}>
          {audiobook.artistName}
        </p>
        {/* DATE */}
        <div className={styles.dateCountryWrapper}>
          <p>
            {new Date(audiobook.releaseDate).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>{audiobook.country}</p>
        </div>

        {/* AUDIOBOOK DETAILS */}
        <div className={styles.detailsWrapper}>
          <p>Genre: {audiobook.primaryGenreName}</p>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{__html: audiobook.description}}
            />
        </div>

        {/* // TODO TIME */}
        {/* <p className={styles.trackTime}>
          {Math.floor((track.trackTimeMillis || 0) / 60000)}:
          {(((track.trackTimeMillis || 0) % 60000) / 1000)
            .toFixed(0)
            .padStart(2, "0")}{" "}
        </p> */}
      </div>
    </div>
  );
}
