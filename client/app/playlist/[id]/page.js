"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function PlaylistDetails() {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        ` https://beatly-efuo.onrender.com/api/playlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlaylist(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!playlist) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        {playlist.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {playlist.songs.map((song) => (

          <div
            key={song._id}
            className="bg-zinc-900 rounded-xl p-4"
          >

            <img
              src={song.image}
              className="w-full h-52 rounded-xl object-cover"
            />

            <h2 className="mt-4 font-bold">
              {song.title}
            </h2>

            <p className="text-gray-400">
              {song.description}
            </p>
<button
  className="mt-6 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-xl font-bold"
>
  ▶ Play All
</button>
          </div>

        ))}

      </div>

    </div>
  );
}