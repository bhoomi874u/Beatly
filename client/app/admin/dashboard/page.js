"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
export default function AdminDashboard() {
  const router=useRouter();
    const [stats,setStats]=useState({songs: 0,
  users: 0,
  playlists: 0,
  favorites: 0,})
  useEffect(() => {

  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) {

    alert("Please login as Admin");

    router.push("/admin/login");

    return;
  }

  if (admin.role !== "admin") {

    alert("Access Denied");

    router.push("/home");

    return;
  }

  fetchStats();

}, []);

 const fetchStats = async () => {

  try {

    // const token = localStorage.getItem("adminToken");

    // const res = await axios.get(
    //   " https://beatly-efuo.onrender.comlocalhost:5000/api/admin/stats",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    const token =localStorage.getItem("adminToken");
    await axios.post(" https://beatly-efuo.onrender.com/api/admin/add",formData,{
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
    })

    setStats(res.data);

  } catch (error) {

    console.log(error);

  }

};
  return (
    <div>

      {/* Heading */}

      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-zinc-800  p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-lg">
            Total Songs
          </h2>

          <p className="text-4xl  text-amber-50 font-bold mt-4">
            {stats.songs}
          </p>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-lg">
            Total Users
          </h2>

          <p className="text-4xl text-amber-50 font-bold mt-4">
            {stats.users}
          </p>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-lg">
            Playlists
          </h2>

          <p className="text-4xl  text-amber-50 font-bold mt-4">
            {stats.playlists}
          </p>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-400 text-lg">
            Favorites
          </h2>

          <p className="text-4xl  text-amber-50 font-bold mt-4">
            {stats.favorites}
          </p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-5">

          <Link
            href="/admin/songs"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
          >
            Add Song
          </Link>

          <Link
            href="/admin/songs"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Manage Songs
          </Link>

          <Link
            href="/admin/users"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
          >
            View Users
          </Link>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="bg-zinc-800 rounded-xl p-6">

          <p className="text-gray-400">
            No Recent Activity
          </p>

        </div>

      </div>

    </div>
  );
}