import { useState } from "react";

const Login=()=>{
    const [isRegister,setIsRegister] = useState(false);
    return (
        <div className='bg-white/20 backdrop-blur-lg shadow-2xl rounded-xl p-8 text-white'>
            <h2 className='text-2xl font-bold text-center mb-6'>
                {isRegister?'Register':'Login'}
            </h2>
            <div className='space-y-4'>
                <input type='email' placeholder='Email' className='w-full p-3 rounded bg-white/30 placeholder-white outline-none'/>
                <input type='password' placeholder='Password' className='w-full p-3 rounded bg-white/30 placeholder-white outline-none'/>
                <button className='w-gull bg-white-600 hover:bg-blue-700 transition rounded p-3 font-semibold'>
                    {isRegister?'Create Account':'Login'}
                </button>
            </div>
            <p className='mt-4 text-center text-sm'>
                {isRegister?'Already have an account?':'Do not have an account'}
                <span className='ml-2 underline cursor-pointer' onClick={()=>setIsRegister(!isRegister)}>
                    {isRegister?'Login':'Register'}
                </span>
            </p>
        </div>
    )

}
export default Login;