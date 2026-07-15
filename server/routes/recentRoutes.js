const express=require ('express');
const router=express.Router();
// router.get("/",(req,res)=>{
//     res.send("recent route working")
// })
const {addRecent,getRecents, deleteRecent} =require("../controllers/recentController");
router.post("/",addRecent);
router.get("/",getRecents);
router.delete("/:id",deleteRecent)
module.exports=router;