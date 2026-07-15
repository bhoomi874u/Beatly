const mongoose= require ('mongoose');
const recentSchema=new mongoose.Schema({
songId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Song",
    required:true,

},

},
{
timestamps:true,
});
module.exports=mongoose.model("Recent",recentSchema)