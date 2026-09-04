"use client"
import { useRouter } from "next/navigation"
export default function AdminNavbar(){
    const router=useRouter();
    const logout=()=>{
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };
    return (
         <div className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold">

        Admin Dashboard

      </h2>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
    )
}