import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Outlet } from "react-router-dom"

export function Layout() {
    function goTotop() {
        window.scrollTo({
            top : 0 ,
            behavior :"smooth" 
        })
    }
    return <>
     <Navbar/>
    <Outlet/>
    <div onClick = {()=>goTotop()} className =" size-12 bg-yellow-300  rounded-full fixed right-10 bottom-10 flex justify-center items-center cursor-pointer">
        <i className="fa-solid fa-arrow-up text-white"></i>
    </div>
    <Footer/>
    </>
}