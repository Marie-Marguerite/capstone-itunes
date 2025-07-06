// src/components/SearchBar/SearchBar.jsx

import styles from "./SearchBar.module.css";

import React from "react";
import { Formik, Form, Field } from "formik";

const mediaOptions = [
  { value: "all", label: "All" },
  { value: "music", label: "Music" },
  { value: "podcasts", label: "Podcasts" },
  { value: "books", label: "Books" }, // includes audiobooks and eBooksl
];

export default function SearchBar({ onSearch }) {
  return (
    <div className={styles.searchBarWrapper}>
      <Formik
        initialValues={{ term: "", media: "all" }}
        onSubmit={(values) => {
          onSearch(values.term.trim(), values.media);
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
                src="../../assets/searchIcon.png"
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
