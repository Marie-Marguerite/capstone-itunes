// components/MediaResultDisplay/SearchResults
// import styles from "./SearchResult.";
import React, { useContext } from "react";
import MediaBlock from "./MediaBlock";
import { SearchContext } from "../../contexts/SearchContext";
import { FilterContext } from "../../contexts/FilterContext";
import { useFavouritesContext } from "../../contexts/FavouritesContext";
import { groupResultsByKind } from "../utils/groupResultsByKind";

export default function SearchResults() {
  const { results } = useContext(SearchContext);
  const { activeFilters, showFavouritesOnly  } = useContext(FilterContext);
  const { favourites } = useFavouritesContext();

  const dataToUse = showFavouritesOnly ? favourites : results;
  const grouped = groupResultsByKind(dataToUse, activeFilters  );

  const hasMusic =
    grouped.songs.length || grouped.artists.length || grouped.albums.length;
  const hasBooks =
    grouped.audiobooks.length ||
    grouped.authors.length ||
    grouped.ebooks.length;
  const hasPodcasts =
    grouped.podcasts.length ||
    grouped.podcastors.length ||
    grouped.podcastEpisodes.length;

  return (
    <>
      {/* BLOCK: MUSIC */}
      {hasMusic && (
        <div>
          <h1>MUSIC</h1>
          {/* - songs */}
          {grouped.songs.length > 0 && (
            <MediaBlock title="Songs" type="block" data={grouped.songs} />
          )}
          {/* - artists */}
          {grouped.artists.length > 0 && (
            <MediaBlock title="Artists" type="round" data={grouped.artists} />
          )}
          {/* - albums */}
          {grouped.albums.length > 0 && (
            <MediaBlock title="Albums" type="block" data={grouped.albums} />
          )}
        </div>
      )}

      {/* BLOCK: BOOKS */}
      {hasBooks && (
        <div>
          <h1>BOOKS</h1>
          {/* -audiobooks */}
          {grouped.audiobooks.length > 0 && (
            <MediaBlock
              title="Audiobooks"
              type="block"
              data={grouped.audiobooks}
            />
          )}
          {/* - authors */}
          {grouped.authors.length > 0 && (
            <MediaBlock title="Authors" type="round" data={grouped.authors} />
          )}
          {/* - ebooks */}
          {grouped.ebooks.length > 0 && (
            <MediaBlock title="eBooks" type="block" data={grouped.ebooks} />
          )}
        </div>
      )}

      {hasPodcasts && (
        <div>
          <h1>PODCASTS</h1>
          {/* - podcasts */}
          {grouped.podcasts.length > 0 && (
            <MediaBlock title="Podcasts" type="block" data={grouped.podcasts} />
          )}
          {/* - podcastors */}
          {grouped.podcastors.length > 0 && (
            <MediaBlock
              title="Podcastors"
              type="round"
              data={grouped.podcastors}
            />
          )}
          {/* - episodes */}
          {grouped.episodes.length > 0 && (
            <MediaBlock title="Episodes" type="block" data={grouped.episodes} />
          )}
        </div>
      )}
    </>
  );
}
