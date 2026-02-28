import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import { ProtectedRoute } from "./layout/ProtectedRoute"

import LoginPage from "@/features/auth/pages/LoginPage"
import RegisterPage from "@/features/auth/pages/RegisterPage"
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"

import DashboardPage from "@/features/dashboard/DashboardPage"
import UsersPage from "@/features/users/UsersPage"
import ProfilePage from "@/features/profile/ProfilePage"
// (UsersPage will be added later)

export const router = createBrowserRouter([
  // 🔓 Public Routes
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },

  // 🔐 Protected Layout Routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      // Future:
      // {
      //   path: "users",
      //   element: <UsersPage />,
      // },
    ],
  },

  // Optional: redirect unknown routes to login
  {
    path: "*",
    element: <LoginPage />,
  },
  {
    path:"profile",
    element:<ProfilePage/>
  },
  {
    path:"users",
    element:<UsersPage/>
  }
])