// components/utils/groupResultsByKind.js

//* SORT & FILTER RESULTS BY MEDIA TYPE/KIND
export default function groupResultsByKind(results, filters = []) {
  if (!Array.isArray(results)) {
    console.warn(
      "groupResultsByKind expected an array but got",
      typeof result,
      results
    );

    return {
      songs: [],
      artists: [],
      albums: [],

      audiobooks: [],
      authors: [],
      ebooks: [],

      podcasts: [],
      podcastors: [],
      podcastEpisodes: [],
    };
  }

  const noFilters = filters.length === 0;

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
  };

  //todo rather group like this so that media filter van be used:
  // //* GROUPS
  // const groups = {
  //   // MUSIC

  //   music: { songs: [], artists: [], albums: [] },

  //   // BOOKS
  //   book: { audiobooks: [], authors: [], ebooks: [] },

  //   // PODCAST
  //   pod: { podcasts: [], podcastors: []},
  // };

  //* HELPER: CHECK IF A CATEGORY IS ALLOWED BY FILTERS:
  results.forEach((item) => {
    //? what is wrapperType? and is collectionType being used?
    const { kind, wrapperType, collectionType, artistType } = item;

    // MUSIC
    // - song
    if (kind === "song" && (noFilters || filters.includes("songs"))) {
      groups.songs.push(item);
      // - artist
    } else if (
      wrapperType === "artist" &&
      artistType === "Artist" &&
      (noFilters || filters.includes("artists"))
    ) {
      groups.artists.push(item);
    }
    // - album
    else if (
      (kind === "album" || wrapperType === "collection") &&
      (noFilters || filters.includes("albums"))
    ) {
      groups.albums.push(item);
    }

    // BOOKS
    // - audiobook
    else if (
      kind === "audiobook" &&
      (noFilters || filters.includes("audiobooks"))
    ) {
      groups.audiobooks.push(item);
    }
    // - author
    else if (
      wrapperType === "artist" &&
      (artistType === "Author" || artistType === "Writer") &&
      (noFilters || filters.includes("authors"))
    ) {
      groups.authors.push(item);
    }
    // - ebooks
    else if (kind === "ebook" && (noFilters || filters.includes("ebooks"))) {
      groups.ebooks.push(item);
    }

    // PODCASTS
    // - podcasts
    else if (
      kind === "podcast" &&
      (noFilters || filters.includes("podcasts"))
    ) {
      groups.podcasts.push(item);
    }
    // - podcastors
    else if (
      wrapperType === "artist" &&
      artistType === "Podcast Author" &&
      (noFilters || filters.includes("podcastors"))
    ) {
      groups.podcastors.push(item);
    }
  });

  return groups;
}
