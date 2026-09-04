"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
const router =useRouter();
  useEffect(() => {
  
    const token=localStorage.getItem("adminToken");
    if(!token){
      router.push("/admin/login");
    }
      fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        All Users
      </h1>
    <div>Admin Dashboard</div>
      <div className="overflow-x-auto rounded-xl">

        <table className="w-full bg-zinc-800 text-white  rounded-xl overflow-hidden">

          <thead className="bg-zinc-700 text-white">

            <tr>

              <th className="p-4 text-left ">#</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Joined</th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-6 text-white"
                >
                  No Users Found
                </td>

              </tr>

            ) : (

              users.map((user, index) => (

                <tr
                  key={user._id}
                  className="border-b border-zinc-700 hover:bg-zinc-800"
                >

                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}