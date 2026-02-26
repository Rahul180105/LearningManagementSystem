import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "../ProtectedRoute"
import * as authStore from "@/features/auth/auth.store"
import {describe,it,expect,vi} from 'vitest'



describe("ProtectedRoute", () => {
  it("redirects to login if user not authenticated", () => {

    vi.spyOn(authStore,"useAuthStore").mockImplementation((selector:any)=>
      selector({
        user:null,
        accessToken:null,
      })
    )

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })
})