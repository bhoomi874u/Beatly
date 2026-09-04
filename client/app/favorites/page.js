"use client";


import { useEffect, useState } from "react";
import axios from "axios";
export default function Favorites() {

  const [favorites,
    setFavorites] =
    useState([]);
const [search,setSearch]=useState("");

  useEffect(() => {

    fetchFavorites();

  }, []);

console.log(favorites); 
  const fetchFavorites =
    async () => {

      const res =
        await axios.get(
          "https://beatly-efuo.onrender.com/api/favorite"
        );

      setFavorites(
        res.data
      );

    };
    const removeFavorite =async (id) =>{
      try{
        await axios.delete(`https://beatly-efuo.onrender.com/api/favorite/${id}`)
        fetchFavorites();
      }
      catch(error){
        console.log(error )
      }
    }

 const filteredFavorites=favorites
  .filter((fav) => fav.songId)
  .filter((fav) =>
    fav.songId?.title.toLowerCase().includes(search.toLowerCase())
  )

    return (
  <div className="p-8 text-black">

    <h1 className="text-4xl font-bold mb-8">
      Favorite Songs ❤️ ({favorites.length})
    </h1>
<input type="text" placeholder="Search Favorite Song...." value={search}
onChange={(e)=>setSearch(e.target.value)}
 className="w-full p-3 rounded-lg bg-zinc-800 mb-6"/>
    {
      favorites.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-3xl">
            No favorite songs yet ❤️
          </h2>

          <p className="text-gray-400 mt-3">
            Start adding songs to your library
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredFavorites.map((fav) => (

            <div
              key={fav._id}
              className="bg-zinc-900 rounded-xl p-4"
            >

              <img
                src={fav.songId.image}
                alt={fav.songId.title}
                className="w-full h-56 object-cover rounded-lg"
              />

              <h2 className="text-2xl mt-4 font-bold">
                {fav.songId.title}
              </h2>

              <p className="text-gray-400">
                {fav.songId.description}
              </p>
 <button onClick={()=>removeFavorite(fav._id)}
  className="
    bg-red-500
    px-4
    py-2
    rounded-lg
    mt-4
  "
>
  Remove ❌
</button>
            </div>

          ))}

        </div>

      )
    }

  </div>
);
}