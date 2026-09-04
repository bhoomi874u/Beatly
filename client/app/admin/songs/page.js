"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function SongsPage() {

 
  const [form, setForm] = useState({
    title: "",
    artist: "",
    image: "",
    audio: "",
    description: ""
  });
  const router=useRouter();
   useEffect(()=>{
    const token=localStorage.getItem("adminToken");
    if(!token){
      router.push("/admin/login");
    }
  },[]);
   
const [image ,setImage]=useState(null);
const [audio, setAudio] = useState(null);
const handleImageChange=(e)=>{
  setImage(e.target.files[0]);
}
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
 if (!image) {
    alert("Please select an image");
    return;
  }

  if (!audio) {
    alert("Please select an audio file");
    return;
  }
  
  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("artist", form.artist);
    formData.append("description", form.description);

    if (image) {
      formData.append("image", image);
    }

    if (audio) {
      formData.append("audio", audio);
    }

    console.log("Sending data...");
    console.log("Image:", image);
    console.log("Audio:", audio);

    const response = await axios.post(
      "https://beatly-efuo.onrender.com/api/admin/add",
      formData,
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      //   },
      // }
    );

    console.log("SUCCESS:", response.data);

    alert("Song Uploaded Successfully");

  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.message);
  }
};
  return (

    <div className="max-w-3xl mx-auto p-10 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Add New Song
      </h1>
<div>Admin Dashboard</div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        
      >
       

        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={form.artist}
          onChange={handleChange}
          className="w-full p-4 rounded bg-zinc-800"
        />

        <input
          type="file"
          name="image"
          placeholder="Image URL"
         accept="image/*"
          onChange={handleImageChange}
          className="w-full p-4 rounded bg-zinc-800"
        />

        <input
          type="file"
          name="audio"
          placeholder="Audio URL"
           accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          className="w-full p-4 rounded bg-zinc-800"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-4 rounded bg-zinc-800"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg"
        >
          Add Song
        </button>

      </form>

    </div>

  );

}