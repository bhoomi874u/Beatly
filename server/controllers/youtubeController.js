const axios=require("axios");
const searchYoutube=async (req,res)=>{
    try{
        const query=req.query.q;
        if(!query){
            return res.json([]);
        }
        const response=await axios.get("https://www.googleapis.com/youtube/v3/search",
        {
            params:{
                part:"snippet",
                q: query,
                type:"video",
                maxResults:10,
                 videoEmbeddable: "true",
                 videoCategoryId: "10",
                key:process.env.YOUTUBE_API_KEY,

            },

        }
    )
     const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
    }));

    res.json(videos);

    }
    catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "YouTube Search Failed",
    });
  }
};

module.exports={searchYoutube,}