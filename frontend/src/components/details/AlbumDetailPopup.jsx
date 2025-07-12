// src/components/details/AlbumDetailPopup.jsx
import styles from "./DetailPopup.module.css";
import React, { useEffect,  } from "react";
import FallbackImage from "../../assets/fallbackImage100.png";
import { useSearchContext } from "../../contexts/useSearchContext";

export default function AlbumDetailPopup({ isOpen, onClose, collectionId }) {
  // const [album, setAlbum] = useState(null);
  const { fetchArtistById, fetchAlbumById, album, tracks } = useSearchContext();

  // HANDLE: CLICK ON ARTIST NAME
  const handleArtistClick = () => {
    if (!album.artistId) return;
    fetchArtistById(album.artistId); // trigger search
    onClose(); // close popup
  };

  // FETCH: ALBUM DETAILS
  useEffect(() => {
    if (isOpen && collectionId) fetchAlbumById(collectionId);
  }, [isOpen, collectionId]);

  // IF NOT OPEN OR NO ALBUM: DO NOTHING
  if (!isOpen || !album) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* BUTTON: CLOSE */}
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        {/* IMAGE */}
        <img
          className={styles.albumImage}
          src={album.artworkUrl || FallbackImage}
          alt={`Album cover of ${album.collectionName}`}
        />
        {/* HEADING: ALBUM NAME */}
        <h2>{album.collectionName}</h2>

        {/* SUBHEADING: ARTIST NAME (CLICKABLE) */}
        <p className={styles.artistLink} onClick={handleArtistClick}>
          {album.artistName}
        </p>

        {/* DATE */}
        <p>
          {new Date(album.releaseDate).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* SONG LIST */}
        <ol className={styles.trackList}>
          {tracks.map((track) => (
            <li key={track.trackId}>
              <span className={styles.trackName}>{track.trackName}</span> - {""}
              <span className={styles.trackTime}>
                {Math.floor((track.trackTimeMillis || 0) / 60000)}:
                {(((track.trackTimeMillis || 0) % 60000) / 1000)
                  .toFixed(0)
                  .padStart(2, "0")}{" "}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
