"use client";
import { useState } from "react";
import Navbar from "../component/Navbar";
export default function SearchPage(){
    const[searchTerm,setSearchTerm]=useState(" ")
   const [song,setSong]=useState([]);
   const[filter,setFilteredSongs]=useState([]);
   const[currentSong,setCurrentSong]=useState(null)

   const searchSongs=(value)=>{
    setSearchTerm(value);
    if(value.trim()===""){
           filterSongs(activeCategory);
        return ;

    }
    const filtered=searchSongs.filter((song)=>{
        song.title.toLowerCase().includes(value.toLowerCase())||song.description.toLowerCase().includes(value.toLowerCase());
        setFilteredSongs(filtered)
    })
   }
    return(
<div className="min-h-screen bg-black text-white ">
            <Navbar />
            <div className="max-w-7xl mx-auto px-8 py-10">
                <h1 className="text-4xl font-bold mb-8">
                    Search Music
                </h1>
                <input 
                type="text"
                placeholder="Search songs, artists..."
                className="w-full p-3 mb-6 rounded bg-zinc-900 text-white outline-none"
                />


            </div>
</div>

    )
}