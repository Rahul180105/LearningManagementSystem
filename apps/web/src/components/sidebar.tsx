import {Link} from 'react-router-dom';

const Sidebar=()=>{
    return (
        <div className='w-64 bg-gray-900 text-white p-6'>
            <nav className='space-y-4'>
                <Link to='/dashboard' className='block hover:text-blue-400'>
                    Dashboard
                </Link>
                <Link to='/auth' className='block hover:text-blue-400'>
                    Auth Service
                </Link>
                <Link to='/users' className='block hover:text-blue-400'>
                    User Service
                </Link>
            </nav>
        </div>
    )
}
export default Sidebar;