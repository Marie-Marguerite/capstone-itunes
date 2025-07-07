// components/utils/groupResultsByKind.js

/*  NOTE: API call fetches 'media="all"'. Groups are created from response 
    to show those on home page where filters can be applied. 
*/

//* SORT & FILTER RESULTS BY MEDIA TYPE/KIND
export default function groupResultsByKind(results, filters = []) {
  //* 1. SAFETY CHECK:
  //  IS RESULTS AN ARRAY?
  if (!Array.isArray(results)) {
    console.warn(
      "groupResultsByKind expected an array but got:",
      typeof results,
      results
    );

    //  IF NOT: CREATE CORRECT EMPTY ARRAYS (GROUPS) TO PREVENT CRASH
    return {
      // MUSIC
      music: { songs: [], artists: [], albums: [] },

      // BOOKS
      books: { audiobooks: [], authors: [], ebooks: [] },

      // PODCAST
      pods: { podcasts: [], podcastAuthors: [], podcastEpisodes: [] },
    };
  }

  // NO FILTERS
  const noFilters = filters.length === 0;

  //* 2. HANDLE RESPONSE DATA 
  //* CREATE GROUPS
  const groups = {
    // MUSIC
    music: { songs: [], artists: [], albums: [] },

    // BOOKS
    books: { audiobooks: [], authors: [], ebooks: [] },

    // PODCAST
    pods: { podcasts: [], podcastAuthors: [], podcastEpisodes: [] },
  };

  //* ADD TO GROUPS & FILTER CHECK (check if category is allowed by active filter)
  results.forEach((item) => {
    const { kind, wrapperType, artistType } = item;

    // MUSIC
    // - song
    if (kind === "song" && (noFilters || filters.includes("songs"))) {
      groups.music.songs.push(item);
    }
    // - artist
    else if (
      wrapperType === "artist" &&
      artistType === "Artist" &&
      (noFilters || filters.includes("artists"))
    ) {
      groups.music.artists.push(item);
    }
    // - album
    else if (
      (kind === "album" || wrapperType === "collection") &&
      (noFilters || filters.includes("albums"))
    ) {
      groups.music.albums.push(item);
    }

    // BOOKS
    // - audiobook
    else if (
      kind === "audiobook" &&
      (noFilters || filters.includes("audiobooks"))
    ) {
      groups.books.audiobooks.push(item);
    }
    // - author
    else if (
      wrapperType === "artist" &&
      (artistType === "Author" || artistType === "Writer") &&
      (noFilters || filters.includes("authors"))
    ) {
      groups.books.authors.push(item);
    }
    // - ebooks
    else if (kind === "ebook" && (noFilters || filters.includes("ebooks"))) {
      groups.books.ebooks.push(item);
    }

    // PODCASTS
    // - podcasts
    else if (
      kind === "podcast" &&
      (noFilters || filters.includes("podcasts"))
    ) {
      groups.pods.podcasts.push(item);
    }
    // - podcastAuthors
    else if (
      wrapperType === "artist" &&
      artistType === "Podcast Author" &&
      (noFilters || filters.includes("podcastAuthors"))
    ) {
      groups.pods.podcastAuthors.push(item);
    }
    // - podcast episodes
    else if (
      kind === "podcast-episodes" &&
      (noFilters || filters.includes("podcastEpisodes"))
    ) {
      groups.pods.podcastEpisodes.push(item);
    }
  });

  return groups;
}
