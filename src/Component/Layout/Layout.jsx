import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Outlet , useNavigate } from "react-router-dom"
import { useState } from "react"
import { Offline, Online } from "react-detect-offline";
import { Helmet } from "react-helmet";
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
     <Helmet>
    <meta charSet="utf-8" />
    <title>Fresh Cart</title>    
    </Helmet>
     <Navbar/>
      <Offline>
        <div className="fixed inset-0 h-screen bg-black z-50 flex justify-center items-center ">
        <p className="text-white text-2xl ">Make Sure You Are Online</p>
        </div>
    </Offline>
    <Outlet/>
   {localStorage.getItem("Token") && scroll  ? <div onClick = {()=>goTotop()} className =" size-12 bg-[#5aa84f]  rounded-full fixed right-10 bottom-10 flex justify-center items-center cursor-pointer">
        <i className="fa-solid fa-arrow-up text-white"></i> 
    </div>:null}
    
    <Footer/>
    </>
}