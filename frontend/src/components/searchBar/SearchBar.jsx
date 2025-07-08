// src/components/SearchBar/SearchBar.jsx

import styles from "./SearchBar.module.css";

import React from "react";
import { Formik, Form, Field } from "formik";
import searchIcon from "../../assets/searchIcon.png";
import MainMediaFilter from '../filters/MainMediaFilter';

export default function SearchBar({ onSearch }) {
  return (
    <div className={styles.searchBarWrapper}>
      <Formik
      // VALUE GAINED: USER SEARCH TERM
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

            {/* FILTER: MEDIA TYPE DROPDOWN */}
            <div className={styles.select}>
              <MainMediaFilter/>
            </div>

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
