import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default function DashboardLayout(){
    return (
        <div className="flex h-screen bg-white text-black">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Navbar/>
                <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}