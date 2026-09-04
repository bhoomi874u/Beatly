"use client";

import axios from "axios";

export default function PlaylistModal({
  playlists,
  song,
  closeModal,
}) {
  console.log(playlists)
  const selectPlaylist=async(playlistId)=>{
    await axios.post(`http://localhost:5000/api/playlist/${playlistId}/song`,{songId:song._id})
alert("Song Added")
closeModal ();
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-80">

        <h2 className="text-2xl font-bold mb-4">
          Choose Playlist
        </h2>

        {playlists.map((playlist) => (
          <button
            key={playlist._id}
            onClick={()=>selectPlaylist(playlist._id)}

            className="block w-full bg-gray-200 p-3 rounded mb-2"
          >

            {playlist.name}
            
          </button>
        ))}

        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
        {/* <button key={playlist._id} onClick={()=>selectPlaylist(playlist._id)}>{playlist.name}</button> */}

      </div>

    </div>
  );
}