const express=require ("express");
const router=express.Router();
const upload = require("../middleware/upload");
const{adminLogin,adminRegister,getUsers,addSong,getSongs,deleteSong,updateSong}=require("../controllers/adminController");
router.post("/login",adminLogin);
router.post("/register",adminRegister)
router.get("/user",getUsers)
router.post("/song",upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]),addSong);
router.get("/song", getSongs);
router.delete("/song/:id",deleteSong)
router.put("/song/:id",updateSong);
module.exports=router;