import axios from "axios";
import { useAuthStore } from "@/features/auth/auth.store";

export const AUTH_BASE='http://localhost:3001/api';
export const USER_BASE='http://localhost:3002/api';

export const api=axios.create();

api.interceptors.request.use((config)=>{
    const token =useAuthStore.getState().accessToken;
    if (token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use((res)=>res,(err)=>{
    if(err.response?.status===401){
        useAuthStore.getState().logout();
    }
    return Promise.reject(err);
})