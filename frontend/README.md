## DATA NOTES
### REQUEST
MEDIA       | ENTITY            | ATTRIBUTE
music       | song              | songTerm
            | album             | ?
            | musicArtist       | artistTerm
            |                   | composerTerm
audiobook   | audiobook         | titleTerm
            | audiobookAuthor   | authorTerm
ebook       | ebook             |
podcast     | podcast           | titleTerm
            | podcastAuthor     | authorTerm
            |                   | artistTerm


NOTE:   "music" mostly returns songs... 

### RESPONSE
wrapperType | collectionType    | kind
track       |                   | song
(trackName) |                   | audiobook
            |                   | book
            |                   | podcast
            |                   | podcast-episode
collection  | Album             | album
            | Compillation      |
artist      | Artist            | artist
            | Author            |
            | Podcast Author    |

### NOTE
plural: filters
singular: entity

## FLOW

1. DETAILS MODAL
Album details modal

When the user clicks any album title in your UI, a modal pops up.

The modal fetches full album info (cover art, album title, artist, release year) plus the complete track list.

User can scroll or close the modal.

Re‑useable backend lookup endpoint

Rather than bloating routes/search.js, we’ll add a new route, e.g.

http
Copy code
GET /api/lookup?entity=album&id=<collectionId>
This calls the iTunes Lookup API (https://itunes.apple.com/lookup) under the hood.

In future you can pass entity=podcastEpisode&id=<podcastId> or entity=musicArtist&id=<artistId> and return the proper fields.

Front‑end modal component

A new <AlbumModal> component:

Takes isOpen, onClose, and the collectionId.

On open it calls /api/lookup?entity=album&id=<collectionId>.

Renders the first element (the album info) and then the subsequent “track” results in a list.

Make album titles clickable

In your SquareTile (or specifically for albums) wrap the title in a <button> (or <a>) that sets a local selectedAlbumId and shows the <AlbumModal>.

Future artist deeper‑search

Later you can reuse the same /api/lookup?entity=musicArtist&id=<artistId> to return their albums, songs, etc., and render them using your existing SearchResults layout.