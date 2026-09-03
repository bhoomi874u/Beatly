const Admin = require("../models/Admin");
const User = require("../models/User");
const Song = require("../models/song");
const Playlist = require("../models/playlist");
const Favorite = require("../models/Favorite");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ================= ADMIN LOGIN =================

const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",

      token,

      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {

    console.log("ADMIN LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= ADMIN REGISTER =================

const adminRegister = async (req, res) => {

  try {

    const {
      secretKey,
      name,
      email,
      password,
    } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {

      return res.status(403).json({
        message: "You are not allowed to create an admin.",
      });

    }

    const adminExists = await Admin.findOne({
      email,
    });

    if (adminExists) {

      return res.status(400).json({
        message: "Admin already exists",
      });

    }

    const hashPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await Admin.create({

      name,
      email,
      password: hashPassword,

      role: "admin",

    });

    res.status(201).json({

      message: "Admin created successfully",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },

    });

  } catch (error) {

    console.log("ADMIN REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= ADD SONG =================

const addSong = async (req, res) => {
  try {

    console.log("========== ADD SONG START ==========");

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files?.image?.[0]) {
      return res.status(400).json({
        message: "Image file not received"
      });
    }

    if (!req.files?.audio?.[0]) {
      return res.status(400).json({
        message: "Audio file not received"
      });
    }

    const { title, artist, description } = req.body;

    const image = req.files.image[0].path;
    const audio = req.files.audio[0].path;

    console.log("IMAGE URL:", image);
    console.log("AUDIO URL:", audio);

    const song = await Song.create({
      title,
      artist,
      description,
      image,
      audio
    });

    console.log("MONGODB SONG:", song);

    return res.status(201).json({
      message: "Song Added Successfully",
      song
    });

  } catch (error) {

    console.error("========== ADD SONG ERROR ==========");
    console.error(error);
    console.error("ERROR MESSAGE:", error.message);
    console.error("====================================");

    return res.status(500).json({
      message: error.message
    });
  }
};
// ================= GET USERS =================

const getUsers = async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ================= GET SONGS =================

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });

    res.status(200).json(songs);

  } catch (error) {
    console.error("GET SONGS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DASHBOARD =================

const dashboardStats = async (req, res) => {

  try {

    const songs =
      await Song.countDocuments();

    const users =
      await User.countDocuments();

    const playlists =
      await Playlist.countDocuments();

    const favorites =
      await Favorite.countDocuments();

    res.json({
      songs,
      users,
      playlists,
      favorites,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ================= DELETE SONG =================

const deleteSong = async (req, res) => {

  try {

    await Song.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Song Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ================= UPDATE SONG =================

const updateSong = async (req, res) => {

  try {

    const song =
      await Song.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(song);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ================= DELETE USER =================

const deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  adminLogin,
  adminRegister,
  getUsers,
  dashboardStats,
  addSong,
  getSongs,
  deleteSong,
  updateSong,
  deleteUser,
};