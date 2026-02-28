import axios from "axios"

export const authApi = axios.create({
  baseURL: "http://localhost:3001/api/auth",
})

export const userApi = axios.create({
  baseURL: "http://localhost:3002/api",
})

const attachToken = (config: any) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

authApi.interceptors.request.use(attachToken)
userApi.interceptors.request.use(attachToken)