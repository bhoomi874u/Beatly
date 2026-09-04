"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {

  const [form, setForm] = useState({
    secretKey: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://beatly-efuo.onrender.com/api/admin/register",
        form
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response?.data?.message || "Registration Failed");

    }

  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl w-[400px]"
      >

        <h1 className="text-white text-3xl font-bold mb-6">
          Admin Registration
        </h1>

        <input
          name="secretKey"
          placeholder="Secret Key"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded"
        />

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded"
        />

        <button
          className="w-full bg-green-500 p-3 rounded text-white"
        >
          Register Admin
        </button>

      </form>

    </div>
  );
}
