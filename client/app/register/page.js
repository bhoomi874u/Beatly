"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        " https://beatly-efuo.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("REGISTER SUCCESS:", res.data);

      alert("Registration Successful");

      router.push("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error);

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl">

          {/* Logo */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="text-black text-2xl font-black">
                B
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Create your account
            </h1>

            <p className="text-zinc-400 mt-2">
              Join Beatly and start listening
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3.5 pr-20 text-white placeholder-zinc-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <p className="text-xs text-zinc-500 mt-2">
                Use at least 6 characters.
              </p>
            </div>

            {/* Register */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-500 hover:bg-green-400 disabled:bg-green-700 disabled:cursor-not-allowed text-black font-bold py-3.5 transition"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 pt-6 border-t border-zinc-800 text-center">

            <p className="text-zinc-400 text-sm">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-2 text-green-400 hover:text-green-300 font-semibold transition"
            >
              Sign in to Beatly →
            </button>

          </div>

        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          © Beatly. Your music, your way.
        </p>

      </div>
    </div>
  );
}