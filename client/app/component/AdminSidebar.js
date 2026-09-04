"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AdminSidebar(){
    const pathname=usePathname();
    const menu=[
        {
            title:"Dashboard",
            path:"/admin/dashboard",

        },
        {
            title:"Songs",
            path:"/admin/songs",

        },
        {
            title:"Users",
            path:"/admin/users",
        },

    ];
    return (
        <div className="w-64 bg-zinc-950 border-r border-zinc-800 p-6 ">
            <h1 className="text-3xl font-bold text-green-500 mb-10">
                Beatly Admin
            </h1>
            <div className="space-y-13">
                {menu.map((item)=>(
                    <Link key={item.path} href={item.path} className={`block px-4 py-3 rounded-lg transition ${pathname===item.path ? "bg-green-600":"hover:bg-zinc-800"}`}>
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}