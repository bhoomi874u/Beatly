"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

const router=useRouter();
const [user,setUser]=useState(null);

useEffect(()=>{
const data=localStorage.getItem("user");
if(data){
setUser(JSON.parse(data));
}
},[])

const logout=()=>{
localStorage.clear();
router.push("/login");
}

return(

<nav className="
sticky
top-0
z-50
w-full
bg-black/90
backdrop-blur-lg
border-b
border-zinc-800
px-10
py-4

items-center
">

<div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20">

<div className="flex items-center gap-3">

<h1 className="text-4xl font-extrabold text-green-500">

🎵 Beatly

</h1>

</div>

<div className="flex gap-10 text-lg font-medium">

<Link href="/home" className="transition
hover:text-green-400
hover:scale-105">Home</Link>

<Link href="/search" className="transition
hover:text-green-400
hover:scale-105">Search</Link>

<Link href="/library" className="transition
hover:text-green-400
hover:scale-105">Library</Link>

<Link href="/favorites" className="transition
hover:text-green-400
hover:scale-105">Favorites</Link>

<Link href="/recents" className="transition
hover:text-green-400
hover:scale-105">Recent</Link>

<Link href="/playlist" className="transition
hover:text-green-400
hover:scale-105">Playlist</Link>

{user?.role==="admin" && (

<Link
href="/admin/dashboard"
className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2">

Admin Panel

</Link>

)}

</div>

<div className="flex gap-4">

<button
onClick={()=>router.push("/profile")}
className="bg-zinc-800  shadow-lg hover:bg-zinc-700 px-5 py-2 rounded-lg">

👤 Profile

</button>

<button


onClick={logout}
className="bg-red-600 hover:bg-red-700 shadow-lg px-5 py-2 rounded-lg">

Logout

</button>

</div>

</div>

</nav>

)

}