const Favorite = require("../models/Favorite");
const Song= require ("../models/song")
const addFavorite = async (req, res) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({
        message: "Song ID is required",
      });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    const alreadyExists = await Favorite.findOne({ songId });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Song already in favorites",
      });
    }

    const favorite = await Favorite.create({ songId });

    res.status(201).json(favorite);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Favorites

const getFavorites = async (
  req,
  res
) => {

  try {

    const favorites =
      await Favorite.find()
        .populate("songId");

    res.json(favorites);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// Delete Favorite

const deleteFavorite =
  async (req, res) => {

    try {

      await Favorite.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Removed from favorites",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
};