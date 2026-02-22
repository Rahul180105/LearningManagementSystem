import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/auth.store";
import type { JSX } from "react";

export const ProtectedRoute=({children}:
    {children:JSX.Element})=>{
        const user=useAuthStore((s)=>s.user)
        if (!user) return <Navigate to='/login'/>
        return children;
    }