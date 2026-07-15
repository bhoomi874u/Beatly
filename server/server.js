const express=require('express');

const cors=require('cors');

require('dotenv').config();
const connectDB=require('./config/db')
const searchRoutes = require("./routes/searchRoutes");
const youtubeRoutes=require ("./routes/youtubeRoutes");
const authRoutes=require('./routes/userRoutes');
const songRoutes=require('./routes/songRoutes');
const favoriteRoutes=require ("./routes/favoriteRoutes")
const recentRoutes=require("./routes/recentRoutes")
const authMiddleware=require("./middleware/authMiddleware")
const authController=require("./controllers/userController")
console.log("favoriteRoutes loaded");
const playlistRoutes =
require("./routes/playlistRoutes");
console.log("playlist working")
const adminRoute=require("./routes/adminRoute");
const adminDashboardRoute=require ("./routes/adminDashboardRoute");
const app=express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/songs",songRoutes);
app.use("/api/auth",authRoutes);
  app.use("/api/favorite",favoriteRoutes)
  app.use("/api/recent",recentRoutes)
 app.use(
  "/api/playlist",
  playlistRoutes
);
app.use("/api/youtube",youtubeRoutes);
app.use("/api/admin",adminRoute);
app.use("/api/playlist", playlistRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin",adminDashboardRoute);
app.get("/",(req,res)=>{
    res.send("beatly app is running")
 
})
 app.get("/check", (req, res) => {
  res.send("Server Working");
});

 const PORT=process.env.PORT || 5000;
 app.listen(PORT,()=>{
    console.log(`beatly app is running on port ${PORT}`)
 })