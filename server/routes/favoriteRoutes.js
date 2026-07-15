const express=require ("express");
const router=express.Router();

const {
    addFavorite,deleteFavorite,
    getFavorites
}=require("../controllers/favController")

router.post("/",addFavorite);
router.get("/",getFavorites);
router.delete("/:id",deleteFavorite);
module.exports=router;