"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// import Navbar from "../component/Navbar";
import SongCard from "../component/SongCard";
import Player from "../component/Player";
import PlaylistModal from "../component/PlaylistModal";
import {useRouter} from "next/navigation"
import Navbar from "../component/Navbar";

export default function HomePage() {
const [showModal ,setShowModal]=useState(false);
const [selectedSong,setSelectedSong]=useState(null);
const [playlists,setPlaylists]=useState([]);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] =
    useState([]);
const [user,setUser]=useState(null);
  const [currentSong, setCurrentSong] =
    useState(null);

  const [activeCategory, setActiveCategory] =
    useState("All");
    const[searchTerm,setSearchTerm]=useState("")
   const router=useRouter();
const [youtubeSongs,setYoutubeSongs]=useState([]);
const [youtubePlayer,setYoutubePlayer]=useState(null);


  useEffect(() => {
    const token=localStorage.getItem("token");
    if(!token){
      router.push("/login");
      return;
    }
    const storedUSer=localStorage.getItem("user");
    if(storedUSer){
      setUser(JSON.parse(storedUSer));
    }
    fetchSongs();
  }, []);

  const fetchSongs = async () => {

    try {

      const res = await axios.get(
        "https://beatly-efuo.onrender.com/api/songs"
      );

      setSongs(res.data);
      setFilteredSongs(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const playSong=async (song)=>{
    setCurrentSong(song)
    try{
    await axios.post( "https://beatly-efuo.onrender.com/api/recent",
      {songId:song._id,}
    );
    console.log("Recent Saved")
    }
    catch( error){
 console.log(error)
    }
  }
 const addToFavorite = async (songId) => {
  try {
    const res = await axios.post(
      "https://beatly-efuo.onrender.com/api/favorite",
      { songId }
    );

    console.log("SAVE RESPONSE:", res.data);

  } catch (error) {
    console.log(
      "SAVE ERROR:",
      error.response?.data || error.message
    );
  }
};
  const filterSongs = (category) => {

    setActiveCategory(category);

    if (category === "All") {
      setFilteredSongs(songs);
      return;
    }

    const filtered = songs.filter((song) =>
      song.description
        .toLowerCase()
        .includes(category.toLowerCase())
    );

    setFilteredSongs(filtered);
  };

 const searchSongs = async (value) => {

  setSearchTerm(value);

  // Agar search box empty hai
  if (value.trim() === "") {
    setFilteredSongs(songs);
    setYoutubeSongs([]);
    return;
  }

  // Beatly database search
  const localSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(value.toLowerCase()) ||
      song.description.toLowerCase().includes(value.toLowerCase())
  );

  setFilteredSongs(localSongs);

  // YouTube Search
  try {

    const res = await axios.get(
      `https://beatly-efuo.onrender.com/api/youtube?q=${value}`
    );

    console.log("YouTube:", res.data);

    setYoutubeSongs(res.data);

  } catch (error) {

    console.log(error);

  }

};


  const addToPlaylist=async(songId)=>{
    try{
      const playlistId="6a400a4dfd916e3a8d5cc4fc"
      const res=await axios.post(`https://beatly-efuo.onrender.com/api/playlist/${playlistId}/song`,{songId})
      console.log(res.data)
      alert ("song added  to playlist")
    }
    catch (error ){
      console.log(error.response?.data)
    }
  }

  const openPlaylistModal = async (song) => {

   setSelectedSong(song);

   const res = await axios.get(
      "https://beatly-efuo.onrender.com/api/playlist"
   );

   setPlaylists(res.data);

   setShowModal(true);

}

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <Navbar />
        {/* <main className="p-8">
    {children}
  </main> */}

      <div className="max-w-7xl mx-auto px-8 py-8 pb-36">

        

<h1 className="text-5xl font-extrabold tracking-tight text-white">
  Welcome {user?.name||"User"}👋
</h1>

<p className="text-zinc-400 mb-8 mt-2">
Enjoy your favourite music, {user?.name}

</p>


<div className="mb-8">
  <input type="text" placeholder="🔍 Search songs..." value={searchTerm} 
  onChange={(e)=>searchSongs(e.target.value)}
 className="
w-full
h-14
rounded-full
bg-zinc-900
border
border-zinc-700
px-8
text-lg
outline-none
focus:border-green-500
transition
"/>
</div>
        {/* CATEGORY BUTTONS */}

        <div className="flex gap-4 mb-10 flex-wrap">

          <button 
            onClick={() => filterSongs("All")}
            className={`px-6
py-3
rounded-full
font-semibold
transition-all
duration-300
shadow-md ${
              activeCategory === "All"
                ? "bg-green-500 scale-105"
                : "bg-zinc-800 hover:bg-zinc-700 hover:scale-105"
            }`}
          >
            All
          </button>

          <button
            onClick={() => filterSongs("Trending")}
            className={`px-5 py-2 rounded-full transition ${
              activeCategory === "Trending"
                ? "bg-pink-500"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Trending
          </button>

          <button
            onClick={() => filterSongs("Workout")}
            className={`px-5 py-2 rounded-full transition ${
              activeCategory === "Workout"
                ? "bg-orange-500"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Workout
          </button>

          <button
            onClick={() => filterSongs("Love")}
            className={`px-5 py-2 rounded-full transition ${
              activeCategory === "Love"
                ? "bg-red-500"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Love
          </button>

          <button
            onClick={() => filterSongs("Chill")}
            className={`px-5 py-2 rounded-full transition ${
              activeCategory === "Chill"
                ? "bg-blue-500"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Chill
          </button>
         
        </div>
        {filteredSongs.length === 0 && (

  <h2 className="text-center text-2xl font-bold my-10 text-amber-950">

    No Songs Found 😔

  </h2>

)}

        {/* SONG GRID */}

        <div className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
xl:grid-cols-5
gap-8
mt-10
">

          {filteredSongs.map((song) => (


  <SongCard
      key={song._id}
      song={song}
      onPlay={() => playSong(song)}
      onFavorite={() => addToFavorite(song._id)}
      onPlaylist={() => openPlaylistModal(song)}
    />
          ))}

        </div>


{youtubeSongs.length > 0 && (
  <div className="mt-16">

    <h1 className="text-3xl font-bold mb-8">
      🌍 YouTube Results
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

      {youtubeSongs.map((video, index) => {

        console.log(video);

        return (

          <div
            key={video.videoId || index}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg"
          >

            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold">
                {video.title}
              </h2>

              <p className="text-gray-400 mt-2">
                {video.channel}
              </p>

              <button
                onClick={() => setYoutubePlayer(video.videoId)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-full"
              >
                ▶ Play
              </button>

            </div>

          </div>

        );

      })}

    </div>

  </div>
)}
{youtubePlayer && (
  <div className="fixed bottom-0 left-64 right-0 bg-black p-4 z-50">

  <iframe
  width="100%"
  height="220"
  src={`https://www.youtube.com/embed/${youtubePlayer}?autoplay=1&playsinline=1`}
  title="YouTube Player"
  referrerPolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
/>

  </div>
)}

</div>

{
showModal && (

<PlaylistModal

playlists={playlists}

song={selectedSong}

closeModal={()=>setShowModal(false)}

/>

)
}

      {currentSong && (
        <Player currentSong={currentSong} />
      )}

    </div>
  );
}
