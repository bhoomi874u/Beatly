

const express=require('express');
 const User=require("../models/User");
const router=express.Router();

const {
    registerUser,
    loginUser,
    updateProfile,
    uploadProfileImage,
}=require('../controllers/userController');
const protect=require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,async (req,res)=>{
   
    try{
        console.log("Finding User:", req.user);
       
        const user=await User.findById(req.user).select ("-password");
        res.json(user);
console.log("User Found:", user);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});
 router.put("/profile", protect, updateProfile);
 router.post("/upload-profile",protect,upload.single("profileImage"),uploadProfileImage)
module.exports=router;