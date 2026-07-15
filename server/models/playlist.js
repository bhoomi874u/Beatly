const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

module.exports =
  mongoose.models.Playlist ||
  mongoose.model("Playlist", playlistSchema);