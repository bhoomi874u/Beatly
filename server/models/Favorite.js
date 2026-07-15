const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Favorite",
  favoriteSchema
);