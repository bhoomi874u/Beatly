const express=require('express');
const router=express.Router();
const Song=require("../models/song");
const protect=require("../middleware/authMiddleware");
router.post("/add",protect,async(req,res)=>{
    try{
        const song=await Song.create(req.body);
        res.json(song);
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
});
router.get("/",async(req,res)=>{
    const songs=await Song.find();
    res.json(songs);
})
module.exports=router;