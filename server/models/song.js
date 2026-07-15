const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  audio: {
    type: String,
    required: true,
  },

});

module.exports =
  mongoose.models.Song ||
  mongoose.model("Song", songSchema);