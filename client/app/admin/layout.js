"use client"
import AdminSidebar from "../component/AdminSidebar";
import AdminNavbar from "../component/AdminNavbar";
export default function AdminLayout({children}){
    return (
        <div className="flex min-h-screen bg-black text-white">
            <AdminSidebar/>
            <div className="flex-1 flex flex-col">
                <AdminNavbar/>
                <main className="p-8 bg-zinc-900 flex-1 overflow-y-auto">
          {children}
        </main>
            </div>
        </div>
    )
}