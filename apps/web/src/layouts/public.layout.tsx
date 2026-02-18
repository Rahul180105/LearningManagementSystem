import { Outlet } from "react-router-dom";

const PublicLayout=()=>{
    return(
        <div className='min-h-screen bg-gradient-to-br form-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center'>
            <div className='absolute inset-0 backdrop-blur-sm bg-black/30'></div>
            <div className='relative z-10 w-full max-w-md'>
                <Outlet></Outlet>
            </div>
        </div>
        
    )
}
export default PublicLayout;