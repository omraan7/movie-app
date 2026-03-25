import { Outlet } from "react-router";
import NavBar from "../NavBar/NavBar";

 
export default function Layout() {
  return (
   <>
   <NavBar />
   <div className="pt-17 bg-blue-900"><Outlet /></div>
   </>
  )
}
