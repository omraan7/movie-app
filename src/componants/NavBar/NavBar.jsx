import { useState } from "react";
import { NavLink } from "react-router";

 
export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     function toggleMobileMenu() {
     setMobileMenuOpen(!mobileMenuOpen)
     
     

    }function close( ) {
        setMobileMenuOpen(false)
     }
  return (
    
    <>
<nav className="fixed top-0 w-full bg-blue-950 text-white z-50">
    <div className="container mx-auto p-4">



        <div className="flex items-center justify-between  ">

        <div className="  w-1/2  text-2xl bold md:text-3xl">hello</div>

        <div className="w-1/2 hidden md:block">
            <ul className="   flex  space-x-6  mr-20 justify-between">
                <li><NavLink className="text-white hover:text-gray-600 text-xl md:text-2xl "  to="">Home</NavLink></li>
                <li><NavLink className="text-white hover:text-gray-600 text-xl md:text-2xl"  to="people">people</NavLink></li>
                <li><NavLink className="text-white hover:text-gray-600 text-xl md:text-2xl"  to="contact">Contact</NavLink></li>
            </ul>
        </div>
        <div onClick={toggleMobileMenu} className=" z-10 block sm:ml-6 md:hidden place-items-end text-4xl"> <i className="fa-solid fa-bars "></i></div>

    </div>
    </div> 
     {mobileMenuOpen && (
    <div
      className="fixed inset-0  bg-opacity-30 z-2"
      onClick={close}
    />
  )}
     <div className={`fixed z-10 top-18 left-0 h-full w-64 bg-blue-950 transform transition-transform duration-500 ease-in-out rounded-r-1xl   text-white ${mobileMenuOpen?"translate-x-0 ":"-translate-x-full"}`}>
            <ul className={`flex flex-col mt-10  justify-between fixed top-0 left-10   `}>
                <li className="p-4"><NavLink   onClick={close} className={`py-4 px-4  hover:bg-gray-600 text-xl md:text-2xl rounded-2xl  flex flex-col mt-10  justify-between    transform transition-transform duration-2000 ease-in-out    text-white ${mobileMenuOpen?"translate-x-0 ":"-translate-x-full"}`}  to="" >Home</NavLink></li>
                <li className="p-4"><NavLink   onClick={close} className={`py-4 px-4  hover:bg-gray-600 text-xl md:text-2xl rounded-2xl  flex flex-col mt-10  justify-between      transform transition-transform duration-1200 ease-in-out    text-white ${mobileMenuOpen?"translate-x-0 ":"-translate-x-full"}`}   to="about">About</NavLink></li>
                <li className="p-4"><NavLink   onClick={close} className={`py-4 px-4  hover:bg-gray-600 text-xl md:text-2xl rounded-2xl  flex flex-col mt-10  justify-between      transform transition-transform duration-800 ease-in-out    text-white ${mobileMenuOpen?"translate-x-0 ":"-translate-x-full"}`}   to="contact">Contact</NavLink></li>
            </ul>
        </div>
</nav>
    
    </>

  )
}
