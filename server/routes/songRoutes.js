// const express = require("express");
// const router = express.Router();

// const protect = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");

// const {
//   getSongs,
//   //addSong,
// } = require("../controllers/songController");

// // Get all songs
// router.get("/", getSongs);

// // Upload Song
// //  router.post(
// //   "/add",

// //  (req, res, next) => {
// //    console.log("Before Multer");
// //   next();
// //  },

// //   upload.fields([
// //     {
// //       name: "image",
// //       maxCount: 1,
// //     },
// //     {
// //       name: "audio",
// //       maxCount: 1,
// //     },
// //   ]),

// //   (req, res, next) => {
// //     console.log("After Multer");
// //     console.log(req.files);
// //     next();
// //   },

// //   addSong
// // );

// module.exports = router;


const express = require("express");

const router = express.Router();

const { getSongs } = require("../controllers/songController");

// Get all songs
router.get("/", getSongs);

module.exports = router;