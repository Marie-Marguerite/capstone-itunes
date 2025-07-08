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