//  InfoPopup.jsx
import styles from "./styles/InfoPopup.module.css";
import React, { useState } from "react";

export default function InfoPopup() {
  const [isViewingInfo, setIsViewingInfo] = useState(false);

  return (
    <>
      {/* 1. BUTTON: INFO ICON (to open)*/}
      <div className={styles.infoButtonContainer}>
        <button
          className={styles.infoButton}
          onClick={() => setIsViewingInfo(true)}
        >
          i
        </button>
      </div>

      {/* 2. POPUP OVERLAY */}
      {isViewingInfo && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            {/* - heading */}
            <h2>Instructions</h2>

            {/* - instruction content */}
            <ul className={styles.popupList}>
              <li>
                <span className={styles.spanSpace}>ADD</span> add new
              </li>
              <li>
                <span className={styles.spanSpace}>TICK</span> complete
              </li>
              <li>
                <span className={styles.spanSpace}>✎</span> edit
              </li>
              <li>
                <span className={styles.spanSpace}>✔</span> save / done
              </li>
              <li>
                <span className={styles.spanSpace}>✖</span> delete
              </li>
            </ul>

            {/* - button (to close) */}
            <button
              className={styles.closeButton}
              onClick={() => setIsViewingInfo(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}
