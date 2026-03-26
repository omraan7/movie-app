import { Outlet } from "react-router";
import NavBar from "../NavBar/NavBar";

 
export default function Layout() {
  return (
   <>
   <NavBar />
   <div className=" bg-black mt-14"><Outlet /></div>
   </>
  )
}
