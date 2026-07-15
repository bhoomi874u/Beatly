const Song=require ("../models/Songs");
const User=require ("../models/User");
const Playlist=require("../models/playlist");
const Favorite=require("../models/Favorite");
const dashboardStats=async(req,res)=>{
    try{
        const songs=await Songs.countDocuments();
        const users=await User.countDocuments();
        const playlists=await Playlist.countDocuments();
        const favorites=await Favorite.countDocuments();
        res.json({
            songs,users,playlists,favorites
        });

    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
}
module.exports={dashboardStats}