const Playlist = require("../models/playlist");



const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;

    const newPlaylist = await Playlist.create({
      name,
      songs: [],
    });

    res.status(201).json(newPlaylist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getPlaylist = async (req, res) => {
  try {

    const playlists = await Playlist.find()
      .populate("songs");

    res.status(200).json(playlists);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getSinglePlaylist=async (req,res)=>{
  try{
     console.log("Requested ID:", req.params.id);
    const playlist=await Playlist.findById(req.params.id).populate("songs")
    if(!playlist){
      return res.status(404).json({message:"does not playlist found"});

    }
    res.json(playlist);

  }
  catch(error){
    res.status(500).json({message:error.message})
  }
}


const addSongToPlaylist = async (req, res) => {
  try {
    // Playlist id from URL
    const playlistId = req.params.id;
    console.log(req.body);
    // Song id from request body
    const { songId } = req.body;

    console.log("Playlist ID:", playlistId);
    console.log("Song ID:", songId);

    console.log("Playlist ID Length:", playlistId.length);
    // Find playlist
    const playlist = await Playlist.findById(playlistId);
console.log("Playlist Found:", playlist);
    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    // Check duplicate
    const alreadyExists = playlist.songs.some(
      (song) => song.toString() === songId
    );

    if (alreadyExists) {
      return res.status(400).json({
        message: "Song already exists in playlist",
      });
    }

    // Add song
    playlist.songs.push(songId);

    // Save
    await playlist.save();

    res.status(200).json({
      message: "Song Added Successfully",
      playlist,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const deletePlaylist = async (req, res) => {

  try {

    await Playlist.findByIdAndDelete(req.params.id);

    res.json({
      message: "Playlist Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



const removeSongFromPlaylist = async (req, res) => {

  try {

    const { songId } = req.body;

    const playlistData = await Playlist.findById(req.params.id);

    if (!playlistData) {

      return res.status(404).json({
        message: "Playlist not found",
      });

    }

    playlistData.songs = playlistData.songs.filter(
      (song) => song.toString() !== songId
    );

    await playlistData.save();

    res.json({
      message: "Song Removed Successfully",
      playlistData,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createPlaylist,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  getSinglePlaylist
};