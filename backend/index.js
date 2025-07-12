// backend/index.js

const express = require( 'express');
const cors = require( 'cors');
const dotenv = require( 'dotenv');

// Route files
const searchRoutes = require( './routes/search');
const lookupArtistByIdRoutes = require("./routes/lookupArtistById")
const lookupAlbumDetailRoutes = require("./routes/lookupAlbum")
const lookupAudiobookDetailRoutes = require("./routes/lookupAudiobook")

// Load environment
dotenv.config();

// Initialise Express app
const app = express();

//* MIDDLEWARE
app.use(cors()); // enable CORS for all routes (allows front-ed requests)
app.use(express.json()); // automatically parse incoming JSON requests

//* ROUTES: SEARCH (SEARCH RESULTS)
app.use("/api/search", searchRoutes);

//* ROUTES: LOOKUP ARTIST BY ID (SEARCH RESULTS)
app.use("/api/lookupArtist", lookupArtistByIdRoutes);

//* ROUTES: LOOKUP DETAIL (POPUP)
app.use("/api/lookupAlbum", lookupAlbumDetailRoutes);

//* ROUTES: LOOKUP AUDIOBOOK DETAIL (POPUP)
app.use("/api/lookupAudiobook", lookupAudiobookDetailRoutes)

//* ROUTES: DEFAULT
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

//* START
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
