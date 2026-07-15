const Song = require("../models/song");

const searchSongs = async (req, res) => {
  try {

    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const songs = await Song.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json(songs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Search Failed",
    });

  }
};

module.exports = {
  searchSongs,
};