import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Outlet } from "react-router-dom"

export function Layout() {
    return <>
     <Navbar/>
    <Outlet/>
    <Footer/>
    </>
}