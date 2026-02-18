const Navbar=()=>{
    return(
        <div className='bg-white shadow px-6 py-4 flex justify-between items-center'>
            <h1 className='font-bold text-lg'>LMS</h1>
            <div>
                <span className='mr-4'>Rahul</span>
                <button className='bg-red-500 text-white px-3 py-1 rounded'>
                    Logout
                </button>
            </div>
        </div>
    )
}
export default Navbar;