const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const searchRoutes = require("./routes/searchRoutes");
const youtubeRoutes = require("./routes/youtubeRoutes");
const authRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const recentRoutes = require("./routes/recentRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const adminRoute = require("./routes/adminRoute");
console.log("ADMIN ROUTE FILE LOADED");
console.log("ADMIN ROUTE TYPE:", typeof adminRoute);

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// USER / SONG ROUTES

app.use("/api/songs", songRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/favorite", favoriteRoutes);

app.use("/api/recent", recentRoutes);

app.use("/api/playlist", playlistRoutes);

app.use("/api/youtube", youtubeRoutes);

app.use("/api/search", searchRoutes);


// ADMIN

app.use("/api/admin", adminRoute);


// TEST

app.get("/", (req, res) => {
  res.send("Beatly app is running");
});

app.get("/check", (req, res) => {
  res.send("Server Working");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Beatly app is running on port ${PORT}`
  );
});