const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary=require("../config/cloudinary")

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProfile=async (req,res)=>{
  try{
    const user=await User.findById(req.user);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    user.name=req.body.name || user.name;
    user.email=req.body.email || user.email;
    await user.save();
    res.json({message:"Profile updated successfully",user});
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
const uploadProfileImage=async (req,res)=>{
  try{
    console.log(req.file);
console.log(req.body);
    if(!req.file){
      return res.status(400).json({message:"No image selected"})
    }
    const result=await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,{folder:"Beatly/Profile",});
    const user=await User.findById(req.user);
    if(!user){
      return res.status (404).json({message:"User not found",})
    }
    user.profileImage=result.secure_url;
    await user.save();
    res.json({message: "Profile image uploaded successfully", profileImage: result.secure_url,})

    }
    catch(error){
      console.log(error);
      res.status(500).json({message:"Upload Failed"})
    }
}

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
   uploadProfileImage
};