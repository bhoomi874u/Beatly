"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged-in user ko redirect karo
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);

        if (parsedUser?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/home");
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password: password,
        }
      );

      console.log("LOGIN SUCCESS:", res.data);

      // Token save
      localStorage.setItem("token", res.data.token);

      // User data save
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      alert("Login Successful");

      // Normal user
      router.push("/home");

    } catch (error) {
      console.log("LOGIN STATUS:", error.response?.status);
      console.log("LOGIN DATA:", error.response?.data);
      console.log("LOGIN MESSAGE:", error.message);

      alert(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 flex items-center justify-center px-6">

      <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl w-full">

        {/* LEFT */}
        <div className="hidden lg:block">

          <h1 className="text-7xl font-extrabold text-green-500">
            🎵 Beatly
          </h1>

          <p className="text-zinc-400 text-xl mt-8 leading-9 max-w-xl">
            Stream your favourite songs, create playlists,
            discover trending music and enjoy your music
            anywhere.
          </p>

          <div className="flex gap-4 mt-8">
            <span className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300">
              🎧 Music
            </span>

            <span className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300">
              🎵 Playlists
            </span>

            <span className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300">
              ❤️ Favorites
            </span>
          </div>

        </div>

        {/* LOGIN CARD */}
        <form
          onSubmit={handleLogin}
          className="bg-white/5 backdrop-blur-xl border border-zinc-700 rounded-3xl p-10 shadow-2xl w-full max-w-md mx-auto"
        >

          <h1 className="text-4xl font-bold text-center mb-3 text-white">
            Welcome Back 👋
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Login to continue listening
          </p>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="block text-zinc-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-5 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:border-green-500 text-white transition"
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="mb-8">

            <label className="block text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 px-5 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:border-green-500 text-white transition"
              required
            />

          </div>

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold text-lg text-white hover:scale-[1.02] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* REGISTER */}
          <div className="text-center mt-8">

            <p className="text-zinc-400">
              Don't have an account?
            </p>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="mt-4 w-full border border-green-500 text-green-400 hover:bg-green-500 hover:text-white py-3 rounded-xl transition duration-300"
            >
              Create Account
            </button>

          </div>

          {/* ADMIN LOGIN */}
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">

            <p className="text-zinc-500 text-sm mb-3">
              Are you an administrator?
            </p>

            <button
              type="button"
              onClick={() => router.push("/admin/login")}
              className="text-sm text-zinc-300 hover:text-green-400 transition"
            >
              Admin Login →
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}