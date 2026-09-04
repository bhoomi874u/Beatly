"use client";
import axios from "axios";
import React, { useEffect, useState  } from "react";
import Player from "../component/Player";
import {useRouter} from "next/navigation"
// import { deleteRecent } from "../../../server/controllers/recentController";
// import { addSongToPlaylist } from "../../../server/controllers/playlistController";
// import playlist from "../../../server/models/playlist";
 export default function Library(){
const[favorites,setFavorites]=useState([])
 const [recent, setRecent]=useState([])
 const[playlists, setPlaylists]=useState([])
const [currentSong,setCurrentSong]=useState(null)
const[loading,setLoading]=useState(true)
const router=useRouter();
 useEffect ( ()=>{
  const token=localStorage.getItem("token");
  if(!token){
    router.push("/login");
    return;
  }

 fetchLibrary ()
 },[])
 const  fetchLibrary=async(req,res)=>{
try{
  setLoading(true)
   const favoriteRes=await axios.get("http://localhost:5000/api/favorite")
const recentRes=await axios.get( "http://localhost:5000/api/recent")
 const playlistRes = await axios.get(
      "http://localhost:5000/api/playlist"
    );
setFavorites(favoriteRes.data);
setRecent(recentRes.data);
setPlaylists(playlistRes.data);
}
catch(error){
    console.log(error)
}
finally{
  setLoading(false)
}
 }
 const playSong= (song)=>{
    setCurrentSong(song);
 }
 const removeSong = async (playlistId, songId) => {
try{
  await axios.delete(
    `http://localhost:5000/api/playlist/${playlistId}/song`,
    {
      data: { songId }
    }
  );
alert("Song Removed");
  fetchLibrary();

}
 
 catch (error){
    console.log(error);

 }
}
const favoriteSong=async (songId)=>{
await axios.delete( `http://localhost:5000/api/favorite/${songId}/song`,)
}

const deleteFavorite=async (songId)=>{
  try{
  await axios.delete(`http://localhost:5000/api/favorite/${songId}`)
  fetchLibrary();
  }
  catch(error){
    console.log(error)
  }
}

const deleteRecent=async (recentId)=>{
  await axios.delete(`http://localhost:5000/api/recent/${recentId}`)
  fetchLibrary();
}
// setLoading(true)
// await axios.get("http://localhost:5000/api/loading")
// setLoading(false)
if (loading){
  return <div className="min-h-screen flex items-center justify-center text-white text-3xl">Loading...</div>
}

 return(
    <>
    <div className="min-h-screen bg-black text-white p-8">
    <h1 className="text-5xl font-bold">Your Library 🎵</h1>
    <h2 className="mt-10">
        Favorites:{favorites.length}   </h2>
        <h2> Recent:{recent.length}</h2>
        <h2> Playlists:{playlists.length}</h2>
<h2 className="text-3xl font-bold mt-10"> ❤️ Liked Songs
</h2>
      {favorites.filter((item) =>item.songId).map((item)=> (

<div
key={item._id}
className="bg-zinc-900 p-4 mt-3 rounded-lg"
>
<img src= {item.songId.image} className="w-16 h-16 rounded-lg mb-2"/>
<h3>{item.songId.title}</h3>

<p>{item.songId.description}</p>
 <button onClick={()=>playSong(item.songId)} className="bg-green-500 px-3 py-1 rounded">
          ▶ Play
           </button>
           <button onClick={()=>deleteFavorite(item._id)}
           className="bg-red-500 px-3 py-1 rounded"
            >🗑 Remove</button>
</div>

))}
<h2 className="text-3xl font-bold mt-10"> 🕒 Recently Played </h2>
{recent.filter((item) =>item.songId).map((item)=> (

<div
key={item._id}
className="bg-zinc-900 p-4 mt-3 rounded-lg"
>
<img src={item.songId.image} className="w-16 h-16 rounded-lg mb-2"/>
<h3>{item.songId.title}</h3>

<p>{item.songId.description}</p>
<button onClick={()=>playSong(item.songId)} className="bg-green-500 px-3 py-1 rounded">
          ▶ Play
           </button>
 <button onClick={()=>deleteRecent(item._id)}className="bg-red-500 px-3 py-1 rounded"
            >🗑 Remove</button>
             
</div>

))}
 <h2 className="text-3xl font-bold mt-10"> 🎵 My Playlists </h2>
 {playlists.map((playlist)=>(

    <div key={playlist._id} className="bg-zinc-900 p-4 mt-3 rounded-lg">
        <h3>{playlist.name}</h3>
        <p>
            {playlist.songs.length===0 ? "No songs" : `${playlist.songs.length} Songs`}
        </p>
        <img src={playlist.songs[0]?.image} className="w-20 h-20 rounded-lg"/>
        <div className=" mt-3">
            {playlist.songs.map((song)=>(
                <div key={song._id} className="flex items-center gap-3 mt-2">
                    <img src={song.image} className="w-12 h-12 rounded-lg"></img>

                    <div>
                        <h4> {song.title}</h4>
                          <p>{song.description}</p>
                          duration:{song.duration}
                        </div>
                         < button onClick={()=>playSong(song)}
                          className="bg-green-500 px-3 py-1 rounded">  ▶ Play
                     </button>
                     <button onClick={()=>removeSong(playlist._id,song._id)}>❌ Remove</button>

          
           
          
                    </div>
                
            ))}

            </div>
          
          
        </div>
 ))}
 {currentSong && (
    <Player currentSong={currentSong} />
)}
</div>

    </>
 )
}