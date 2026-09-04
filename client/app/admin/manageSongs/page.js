"use client"
import { useEffect,useState } from "react"
import {useRouter} from "next/navigation"
import axios from "axios";
export default function ManageSongs(){
    const[songs,setSongs]=useState([]);
    const router=useRouter();
    useEffect (()=>{
        const token=localStorage.getItem("adminToken")
        if(!token){
    router.push("/admin/login");
}
fetchSongs();

    },[]);
    const fetchSongs=async ()=>{
        const res=await axios.get( " https://beatly-efuo.onrender.com/api/admin/manageSongs")
        setSongs(res.data);
    }
    const deleteSong=async(id)=>{
        await axios.delete(` https://beatly-efuo.onrender.com/api/admin/song/${id}`)
        fetchSongs();
    }
    // const updateSong=async (id )=>{
    //     try{
    //     await axios.put(`https://beatly-efuo.onrender.com/api/admin/song/${song._id}`,form);
    //     fetchSongs();
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    return(
        <div className="p-10 text-black">
            <h1 className="text-4xl font-bold mb-8">Manage Songs</h1>
             <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map(song=>(
                        <tr key={song._id}>
                            <td>
                                <img src={song.image}width="60"/>
                            </td>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>Delete|Edit</td>
                            <td>

<button
className="bg-blue-600 px-4 py-2 rounded mr-2"
>
Edit
</button>

<button
onClick={()=>deleteSong(song._id)}
className="bg-red-600 px-4 py-2 rounded"
>
Delete
</button>

</td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            <div>Admin Dashboard</div>
        </div>
    )
}