const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  adminLogin,
  adminRegister,
  getUsers,
  addSong,
  getSongs,
  deleteSong,
  updateSong,
  deleteUser,
  dashboardStats
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/login", adminLogin);

router.post("/register", adminRegister);

router.get("/user", protect, adminOnly, getUsers);

router.post(
  "/add",
  // protect,
  // adminOnly,
  upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "audio",
      maxCount: 1
    }
  ]),
  addSong
);

router.get("/song", protect, adminOnly, getSongs);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteSong
);

router.put(
  "/song/:id",
  protect,
  adminOnly,
  updateSong
);

router.delete(
  "/user/:id",
  protect,
  adminOnly,
  deleteUser
);

router.get(
  "/stats",
  protect,
  adminOnly,
  dashboardStats
);

module.exports = router;