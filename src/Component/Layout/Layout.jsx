import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Outlet , useNavigate } from "react-router-dom"
import { useState } from "react"
export function Layout() {
    let [scroll, setscroll] = useState(false)
    let navigate = useNavigate()
    function goTotop() {
        window.scrollTo({
            top : 0 ,
            behavior :"smooth" 
        })
    }
    window.addEventListener("scroll", function handleScroll() {
    if (this.scrollY > 700) {
      setscroll(true)
    } else{
      setscroll(false)
    }
});
    return <>
     <Navbar/>
    <Outlet/>
   {localStorage.getItem("Token") && scroll  ? <div onClick = {()=>goTotop()} className =" size-12 bg-[#5aa84f]  rounded-full fixed right-10 bottom-10 flex justify-center items-center cursor-pointer">
        <i className="fa-solid fa-arrow-up text-white"></i> 
    </div>:null}
    <Footer/>
    </>
}