// components/displayResults/SearchResults

// NOTE: renders grouped media blocks (Music, Books, Podcasts) based on search results or favourites

// import styles from "./SearchResult.";
import React, { useContext } from "react";
import MediaBlock from "../tilesBlock/MediaBlock";
import { SearchContext } from "../../contexts/SearchContext";
import { FilterContext } from "../../contexts/FilterContext";
import { useFavouritesContext } from "../../contexts/useFavouritesContext";
import groupResultsByKind from "../../utils/groupResultsByKind";

export default function SearchResults() {
  const { results } = useContext(SearchContext);
  const { activeFilters, mediaFilterGroup, showFavouritesOnly } =
    useContext(FilterContext);
  const { favourites } = useFavouritesContext();

  // CHOOSE WHICH DATA TO USE (FAVOURITES OR SEARCH RESULTS)
  const dataToUse = Array.isArray(showFavouritesOnly ? favourites : results)
    ? showFavouritesOnly
      ? favourites
      : results
    : [];

  // GROUP RAW RESULT ITEMS INTO MEDIA CATEGORIES AND SUBCATEGORIES
  const grouped = groupResultsByKind(
    dataToUse,
    activeFilters,
    mediaFilterGroup
  );

  // CHECK IF THERE ARE ITEMS IN EACH MAJOR BLOCK
  const hasMusic =
    grouped.music.songs.length ||
    grouped.music.artists.length ||
    grouped.music.albums.length;
  const hasBooks =
    grouped.books.audiobooks.length ||
    grouped.books.audiobookAuthors.length ||
    grouped.books.ebooks.length;
  const hasPodcasts =
    grouped.pods.podcasts.length ||
    grouped.pods.podcastAuthors.length ||
    grouped.pods.podcastEpisodes.length;

  return (
    <>
      {/* BLOCK: MUSIC */}
      {hasMusic && (
        <div>
          <h1>MUSIC</h1>
          {/* - songs */}
          {grouped.music.songs.length > 0 && (
            <MediaBlock
              title="Songs"
              entity="song"
              type="square"
              data={grouped.music.songs}
            />
          )}
          {/* - artists */}
          {grouped.music.artists.length > 0 && (
            <MediaBlock
              title="Artists"
              entity="musicArtist"
              type="round"
              data={grouped.music.artists}
            />
          )}
          {/* - albums */}
          {grouped.music.albums.length > 0 && (
            <MediaBlock
              title="Albums"
              entity="album"
              type="square"
              data={grouped.music.albums}
            />
          )}
        </div>
      )}

      {/* BLOCK: BOOKS */}
      {hasBooks && (
        <div>
          <h1>BOOKS</h1>
          {/* -audiobooks */}
          {grouped.books.audiobooks.length > 0 && (
            <MediaBlock
              title="Audiobooks"
              entity="audiobook"
              type="square"
              data={grouped.books.audiobooks}
            />
          )}
          {/* - authors */}
          {grouped.books.audiobookAuthors.length > 0 && (
            <MediaBlock
              title="Authors"
              entity="audiobookAuthor"
              type="round"
              data={grouped.books.audiobookAuthors}
            />
          )}
          {/* - ebooks */}
          {grouped.books.ebooks.length > 0 && (
            <MediaBlock
              title="eBooks"
              entity="ebook"
              type="square"
              data={grouped.books.ebooks}
            />
          )}
        </div>
      )}

      {hasPodcasts && (
        <div>
          <h1>PODCASTS</h1>
          {/* - podcasts */}
          {grouped.pods.podcasts.length > 0 && (
            <MediaBlock
              title="Podcasts"
              entity="podcast"
              type="square"
              data={grouped.pods.podcasts}
            />
          )}
          {/* - podcast authors */}
          {grouped.pods.podcastAuthors.length > 0 && (
            <MediaBlock
              title="Podcast Authors"
              entity="podcastAuthor"
              type="round"
              data={grouped.pods.podcastAuthors}
            />
          )}
          {/* - episodes */}
          {grouped.pods.podcastEpisodes.length > 0 && (
            <MediaBlock
              title="Episodes"
              entity="podcastEpisode"
              type="square"
              data={grouped.pods.podcastEpisodes}
            />
          )}
        </div>
      )}
    </>
  );
}
