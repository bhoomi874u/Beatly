const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  getSinglePlaylist,
} = require("../controllers/playlistController");

router.get("/", getPlaylist);

router.post("/", createPlaylist);

router.post("/:id/song", addSongToPlaylist);

router.delete("/:id/song", removeSongFromPlaylist);

router.delete("/:id", deletePlaylist);

router.get("/:id",getSinglePlaylist)
router.get("/test", (req, res) => {
  res.send("Playlist Route Working");
});
module.exports = router;