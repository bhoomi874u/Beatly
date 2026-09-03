const Song = require("../models/song");


// GET ALL SONGS
const getSongs = async (req, res) => {
  try {

    const songs = await Song.find();

    res.json(songs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ADD SONG
const addSong = async (req, res) => {
console.log("BODY:", req.body);
    console.log("FILES:", req.files);
  try {
 
    const {
      title,
      artist,
      description,
      category,
    } = req.body;

    if (
      !req.files.image ||
      !req.files.audio
    ) {
      return res.status(400).json({
        message: "Image and Audio are required",
      });
    }

    const imageUrl =
      req.files.image[0].path;

    const audioUrl =
      req.files.audio[0].path;

    const song = await Song.create({

      title,

      artist,

      description,

      category,

      image: imageUrl,

      audio: audioUrl,

    });

    res.status(201).json(song);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {

  getSongs,

  addSong,

};