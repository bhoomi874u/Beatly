"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        " https://beatly-efuo.onrender.com/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken",res.data.token);
      localStorage.setItem("admin",JSON.stringify(res.data.admin))
alert ("Admin Login Successful")
      router.push("/admin/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
        onSubmit={login}
        className="bg-zinc-900 p-10 rounded-xl w-[420px]"
      >

        <h1 className="text-4xl text-center text-green-500 font-bold mb-8">

          Beatly Admin

        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-4 rounded-lg bg-zinc-800 text-white mb-5 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-4 rounded-lg bg-zinc-800 text-white mb-6 outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-lg font-bold"
        >

          {loading ? "Logging In..." : "Login"}

        </button>

      </form>

    </div>

  );

}
