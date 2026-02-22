interface Props{
    children:React.ReactNode;
    title:string;
}

export default function AuthCard({children,title}:Props){
    return(
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-gray-50 border border-black/10 rounded-xl shadow-sm p-8 animate-fadeIn">
            <h2 className="text-2xl font-smibold text-center mb-6 text-black">
                {title}
            </h2>
            {children}
            </div>
        </div>
    )
}