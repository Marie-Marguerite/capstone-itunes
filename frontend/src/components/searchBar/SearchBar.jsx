// src/components/SearchBar/SearchBar.jsx

import styles from "./SearchBar.module.css";

import React from "react";
import { Formik, Form, Field } from "formik";
import searchIcon from "../../assets/searchIcon.png";

const mediaOptions = [
  //? how can i include multiple categories under one label? for ex "Books" should fetch audiobook and ebook
  //? also though, when the user enters a search term and clicks on music, then resutlts for songs and albums and artists should be fetched. If the user then filters for only songs, then only shoul djust songs appear on the screen... 
  //? if no media option is selected the "All" is automatically selected. Then all the folowing should be fetched: songs, artist, album, audiobook, author, ebook, podcast and podcast author (thus this I believe we filter by author under the already filtered podcast...)
  { value: "all", label: "All" },
  { value: "music", label: "Music" },
  //todo change to pod
  { value: "podcast", label: "Podcasts" },
  // { value: "pod", label: "Podcasts" },
  { value: "book", label: "Books" }, // includes audiobooks and eBooksl
];

export default function SearchBar({ onSearch }) {
  return (
    <div className={styles.searchBarWrapper}>
      <Formik
        initialValues={{ term: "" }}
        onSubmit={(values) => {
          onSearch(values.term.trim());
        }}
      >
        {() => (
          <Form className={styles.form}>
            {/* INPUT FIELD */}
            <Field
              name="term"
              type="text"
              placeholder="What would you like to listen to?"
              className={styles.input}
            />

            {/* MEDIA TYPE DROPDOWN */}
            <Field name="media" as="select" className={styles.select}>
              {mediaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>

            {/* SUBMIT */}
            <button type="submit" className={styles.button}>
              <img
                src={searchIcon}
                alt="⌕"
                className={styles.searchIcon}
              />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
