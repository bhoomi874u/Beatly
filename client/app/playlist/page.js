"use client"
import { useEffect,useState  } from "react";
import Player from "../component/Player"
import axios from "axios";
export default function Playlist(){
const [playlists,setPlaylists]=useState([]);
const [currentSong,setCurrentSong]=useState(null);
const [playlistName, setPlaylistName] = useState("");
useEffect (()=>{
fetchPlaylist();
},[])
const createPlaylist = async () => {

  try {
 
    await axios.post( "https://beatly-efuo.onrender.com/api/playlist",{ name: playlistName})
     if(!playlistName.trim()){
      alert("Please enter playlist name")
      return ;
     }
       // Input box ko empty karega
    setPlaylistName("");

    // Nayi playlist list me turant dikh jayegi
    fetchPlaylist();

  } catch (error) {

    console.log(error);

  }

};
 const fetchPlaylist =
    async () => {

      const res =
        await axios.get(
          "https://beatly-efuo.onrender.com/api/playlist"
        );

      setPlaylists(
        res.data
      );

    };
const removeSong = async (playlistId, songId) => {

  try {

    await axios.delete(

      `https://beatly-efuo.onrender.com/api/playlist/${playlistId}/song`,

      {

        data: {
          songId,
        },

      }

    );

    alert("Song Removed");

    fetchPlaylist();

  } catch (error) {

    console.log(error);

  }

};
const deletePlaylist =async (id)=>{
    try{
        const res=await axios.delete(`https://beatly-efuo.onrender.com/api/playlist/${id}`)
        fetchPlaylist();
    }
    catch(error){
        console.log("not deleted wrong" )
    }
}
const playSong=(song)=>{
  setCurrentSong(song);
}

    
     return (

    <div className="p-8 text-black">

      <h1 className="text-4xl font-bold mb-8">
        My Playlists 🎵
      </h1>

      {/* Create Playlist */}

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Enter Playlist Name"
          value={playlistName}
          onChange={(e) =>
            setPlaylistName(e.target.value)
          }
          className="flex-1 p-3 rounded-lg bg-zinc-800 outline-none"
        />

        <button
          onClick={createPlaylist}
          className="bg-green-500 px-6 rounded-lg"
        >
          Create
        </button>

      </div>

      {/* Playlist List */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {playlists.map((playlist) => (

          <div
            key={playlist._id}
            className="bg-zinc-900 p-5 rounded-xl"
          >

            <h2 className="text-2xl font-bold">
              {playlist.name}
            </h2>

            <p className="text-gray-400 mt-2">
              {playlist.songs.length} Songs </p>
             <p className="text-gray-400 mt-2">
  {playlist.songs.length} Songs
</p>

<div className="mt-4 space-y-3">

  {playlist.songs?.map((song) => (

    <div
    
      key={song._id}
    
      className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg"
    > 
    

      <div className="flex items-center gap-3">

        <img
          src={song.image}
          alt={song.title}
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div>

          <h3 className="font-bold">
            {song.title}
          </h3>

          <p className="text-sm text-gray-400">
            {song.description}
          </p>

        </div>
        <button onClick={()=>removeSong(playlist._id,song._id)}
  className="bg-red-500 px-3 py-2 rounded-lg"
      >
        ❌ Remove
      </button>
      </div>

      <button onClick={()=>playSong(song)}
        className="bg-green-500 px-4 py-2 rounded-lg"
      >
        ▶ Play
      </button>

    </div>

  ))}

</div>
            

            <button
              onClick={() =>
                deletePlaylist(playlist._id)
              }
              className="bg-red-500 px-4 py-2 rounded-lg mt-5"
            >
              Delete Playlist
            </button>


          </div>

        ))}

      </div>
{currentSong && (<Player currentSong={currentSong}/>)}
    </div>

  );


}