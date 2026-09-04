"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/home");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex flex-col justify-center items-center text-white">

      <h1 className="text-7xl font-bold mb-5 text-green-500">
        🎵 Beatly
      </h1>

      <p className="text-2xl text-gray-300 mb-10">
        Listen to your favorite songs anytime.
      </p>

      <div className="flex gap-6">

        <button
          onClick={() => router.push("/login")}
          className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl text-xl"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl text-xl"
        >
          Register
        </button>

      </div>

    </div>
  );
}