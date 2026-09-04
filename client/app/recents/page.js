"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Recents() {

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {

    try {

      const res = await axios.get(
        " https://beatly-efuo.onrender.com/api/recent"
      );

      setRecent(res.data);

    } catch (error) {

      console.log(error);

    }

  };
 
   
  const removeRecent = async (id) => {

  try {

    await axios.delete(
      ` https://beatly-efuo.onrender.com/api/recent/${id}`
    );

    fetchRecent();

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="p-8 text-black">

      <h1 className="text-4xl font-bold mb-8">
        Recently Played 🕒
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {recent.map((item) => (

          <div
            key={item._id}
            className="bg-zinc-900 p-4 rounded-xl"
          >

            <img
              src={item.songId.image}
              alt={item.songId.title}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-2xl mt-4">
              {item.songId.title}
            </h2>

            <p className="text-gray-400">
              {item.songId.description}
            </p>
 
 <button onClick={()=>removeRecent(item._id)}
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

    </div>
  );
}
