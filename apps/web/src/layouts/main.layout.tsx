import { Outlet } from "react-router-dom";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const MainLayout=()=>{
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar/>
            <div className='flex flex-col flex-1'>
                <Navbar/>
                <main className='p-6 overflow-y-auto flex-1'>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default MainLayout;