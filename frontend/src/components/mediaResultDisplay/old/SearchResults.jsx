// components/MediaResultDisplay/SearchResults
// import styles from "./SearchResult.";
import React, { useContext } from "react";
import MediaBlock from "../MediaBlock";
import { SearchContext } from "../../../contexts/SearchContext";

import { groupResultsByKind } from "../../utils/groupResultsByKind";



//* SORT & FILTER RESULTS BY MEDIA TYPE/KIND
export default function groupResultsByKind(results, filters) {
  //* GROUPS
  const groups = {
    // MUSIC
    songs: [],
    artists: [],
    albums: [],

    // BOOKS
    audiobooks: [],
    authors: [],
    ebooks: [],

    // PODCAST
    podcasts: [],
    podcastors: [],
    podcastEpisodes: [],
  };

  //* RESULTS
  results.forEach((item) => {
    const kind = item.kind;
    const wrapperType = item.wrapperType;

    // MUSIC
    // - song
    if (kind === "song") groups.songs.push(item);
    // - artist
    else if (wrapperType === "artist" && item.artistType === "Artist")
      groups.artists.push(item);
    // - album
    else if (kind === "album" || wrapperType === "collection")
      groups.albums.push(item);
    // BOOKS
    // - audiobook
    else if (kind === "audiobook") groups.audiobooks.push(item);
    // - author
    else if (
      wrapperType === "artist" &&
      (item.artistType === "Author" || item.artistType === "Writer")
    )
      groups.authors.push(item);
    // - ebooks
    else if (kind === "ebook") groups.ebooks.push(item);
    // PODCASTS
    // - podcasts
    else if (kind === "podcast") groups.podcasts.push(item);
    // - podcastors
    else if (wrapperType === "artist" && item.artistType === "Podcast Author")
      groups.podcastors.push(item);
    // - episodes
    else if (kind === "podcast-episodes") groups.podcastEpisodes.push(item);
  });

  return groups;
}

//* RESULTS
  results.forEach((item) => {
    const kind = item.kind;
    const wrapperType = item.wrapperType;

    // MUSIC
    // - song
    if (kind === "song") groups.songs.push(item);
    // - artist
    else if (wrapperType === "artist" && item.artistType === "Artist")
      groups.artists.push(item);
    // - album
    else if (kind === "album" || wrapperType === "collection")
      groups.albums.push(item);
    // BOOKS
    // - audiobook
    else if (kind === "audiobook") groups.audiobooks.push(item);
    // - author
    else if (
      wrapperType === "artist" &&
      (item.artistType === "Author" || item.artistType === "Writer")
    )
      groups.authors.push(item);
    // - ebooks
    else if (kind === "ebook") groups.ebooks.push(item);
    // PODCASTS
    // - podcasts
    else if (kind === "podcast") groups.podcasts.push(item);
    // - podcastors
    else if (wrapperType === "artist" && item.artistType === "Podcast Author")
      groups.podcastors.push(item);
    // - episodes
    else if (kind === "podcast-episodes") groups.podcastEpisodes.push(item);
  });

  return groups;
}
//* 2.
export default function SearchResults() {
  const { results } = useContext(SearchContext);
  const grouped = groupResultsByKind(results);

  const hasMusic =
    grouped.songs.length || grouped.artists.length || grouped.albums.length;
  const hasBooks =
    grouped.audiobooks.length ||
    grouped.authors.length ||
    grouped.ebooks.length;
  const hasPodcasts =
    grouped.podcasts.length ||
    grouped.podcastors.length ||
    groupResultsByKind.podcastEpisodes.length;

  return (
    <>
      {/* BLOCK: MUSIC */}
      {hasMusic && (
        <div>
          <h1>MUSIC</h1>
          <MediaBlock title="Songs" type="block" data={grouped.songs} />
          <MediaBlock title="Artist" type="round" data={grouped.artist} />
          <MediaBlock title="Albums" type="block" data={grouped.albums} />
        </div>
      )}

      {/* BLOCK: BOOKS */}
      {hasBooks && (
        <div>
          <h1>BOOKS</h1>
          <MediaBlock
            title="Audiobooks"
            type="block"
            data={grouped.audiobooks}
          />
          <MediaBlock title="Authors" type="round" data={grouped.authors} />
          <MediaBlock title="eBooks" type="block" data={grouped.ebooks} />
        </div>
      )}

      {hasPodcasts && (
        <div>
          <h1>PODCASTS</h1>
          <MediaBlock title="Podcasts" type="block" data={grouped.podcasts} />
          <MediaBlock
            title="Podcast Authors"
            type="round"
            data={grouped.podcastors}
          />
          <MediaBlock title="Episodes" type="block" data={grouped.episodes} />
        </div>
      )}
    </>
  );
}
