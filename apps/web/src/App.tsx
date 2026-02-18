import { Route,Routes } from "react-router-dom";
import PublicLayout from "./layouts/public.layout";
import MainLayout from "./layouts/main.layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App(){
  return(
    <>
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout/>}>
      <Route path='/' element={<Login/>}/>
      </Route>
      {/* Protected */}
      <Route element={<MainLayout/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      {/* Protected */}
    </Routes>
    </>
  )
}
export default App;