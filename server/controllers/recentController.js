const Recent = require("../models/Recent");
const Song=require ("../models/song")

// Add Recent Song

const addRecent = async (req, res) => {
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

    const recent = await Recent.create({
      songId,
    });

    res.status(201).json(recent);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Get Recent Songs

const getRecents = async (req, res) => {

  try {

    const recents = await Recent.find()
      .populate("songId")
      .sort({ createdAt: -1 })
      .limit(10);
console.log(recents)
    res.json(recents);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const deleteRecent=async(req,res)=>{
  try{
    await Recent.findByIdAndDelete(req.params.id)
    res.json({message:"Recent Removed"})
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
}


module.exports = {
  addRecent,
  getRecents,
  deleteRecent,
};