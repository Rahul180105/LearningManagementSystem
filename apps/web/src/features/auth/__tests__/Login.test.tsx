import {render,screen} from "@testing-library/react";
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";

describe("Login Page",()=>{
    it("renders login form",()=>{
        render(<MemoryRouter><Login/></MemoryRouter>)
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
})