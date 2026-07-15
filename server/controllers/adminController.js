//const React =require("react");
const Admin = require("../models/Admin");
 const User = require("../models/User");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const Favorite = require("../models/Favorite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
// const addSong=require ("../models/song")
// const User=require("../models/User");
const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(404).json({message:"Email and Password are required",})

        }
        const admin=await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({message:"Admin not found"})

        }
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid  Password",})

        }
        const token=jwt.sign({_id:admin._id,role:admin.role},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).json({message:"Login Successful",token,admin:{_id:admin._id,name:admin.name,email:admin.email,role:admin.role},})

    }catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);

    res.status(500).json({
        message: error.message
    });
}

}
const adminRegister =async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const exist=await Admin.findOne({email});
        if(exist ){
            return res.status(400).json({massage:"Admin already exist"})

        }
        const hashPassword=await bcrypt.hash(password,10);
        const admin=await Admin.create ({name,email,password:hashPassword,role:"admin",})
        res.status(200).json({message:"Admin Created",admin});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error",})
    }
}
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    console.log(users);   // <-- Ye add karo

    res.json(users);
  } catch (err) {
    console.log(err);
  }
};
const dashboardStats=async (req,res)=>{
    try{
        const songs=await Song.countDocuments();
        const users=await User.countDocuments();
        const playlists=await Playlist.countDocuments();
        const favorites=await Favorite.countDocuments();
        res.json({songs,users,playlists,favorites,})
    }catch (error){
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
}
// const addSong=async (req,res)=>{
//     try{
//         const { title,artist,audio,description }=req.body;
//         const image=req.file ? req.file.path:"";
//         const song=await Song.create({title,artist,image,audio,description});
//         res.status(201).json({message:"Song Added Successfully",song})
// }
// catch (error){
//     console.log(error)
//     res.status(500).json({message:"Server Error"})
// }

//}

const addSong = async (req, res) => {
    console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  try {

    const { title, artist, description } = req.body;

    if (!req.files.image || !req.files.audio) {
      return res.status(400).json({
        message: "Image and Audio are required",
      });
    }

    // Image Upload

    const imageUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "Beatly/images",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.files.image[0].buffer).pipe(stream);
    });

    // Audio Upload

    const audioUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "Beatly/audio",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.files.audio[0].buffer).pipe(stream);
    });

    // Save Song

    const song = await Song.create({
      title,
      artist,
      description,
      image: imageUpload.secure_url,
      audio: audioUpload.secure_url,
    });

    res.status(201).json({
      message: "Song Added Successfully",
      song,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
const getSongs=async (req,res)=>{
    try{
        const songs=await Song.find();
        res.json(songs);

    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}
const deleteSong=async (req,res)=>{
    try{
        await Song.findByIdAndDelete(req.params.id);
        res.json({massage:"Song Deleted"})
    }catch(error){
        res.status(500).json({massage:"Server Error"});

    }
}
const updateSong= async (req,res)=>{
    try{
        const song=await Song.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(song);

    }catch (error){
        res.status(500).json({massage:"Server Error"});

    }
}
module.exports={adminLogin,adminRegister,getUsers,dashboardStats,addSong,getSongs,deleteSong,updateSong} 