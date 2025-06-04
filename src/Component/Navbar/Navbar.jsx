import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext, useEffect } from "react";
export function Navbar() {
    let {numCartItem , setnumCartItem} = useContext(CartContext)
    let navigate = useNavigate();
    useEffect(() => {
        let count = localStorage.getItem("count");
        if (count !== null) {
            setnumCartItem(Number(count)); 
        }
    }, [setnumCartItem]);
    function Logout() {
        localStorage.removeItem("Token");
        navigate("/Login");
    }

    return (
        <nav className="bg-gray-900 border-gray-200 fixed w-full z-50">
            <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <i className="text-main text-3xl fa-solid fa-cart-shopping"></i>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Fresh Cart</span>
                </a>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                    <div id="navbar-solid-bg">
                        <ul className=" bg-gray-900 flex gap-2">
                            {localStorage.getItem("Token") != null ? (
                                <div className="flex items-center gap-2">
                                    <Link to={"/Cart"}>
                                    <button type="button" className="relative inline-flex items-center p-1 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        <div>
                                            
                                                <i className="fa-solid fa-cart-shopping text-xl" />
                                                <span className="sr-only"></span>
                                            
                                        </div>
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#4fa74f] border-2 rounded-lg -top-2 -end-2 border-gray-900">
                                            {numCartItem}
                                            {/* ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
                                            </div>
                                    </button>
                                    </Link>
                                    <li onClick={Logout} className="cursor-pointer block py-2 px-2 md:p-0 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 ">
                                        Logout
                                    </li>
                                </div>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/Register" className="block py-2 px-3 md:p-0 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/Login" className="block py-2 px-3 md:p-0 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    {localStorage.getItem("Token") != null ? (
                        <button data-collapse-toggle="navbar-language" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-language" aria-expanded="false">
                            <span className="sr-only bg-transparent">Open main menu</span>
                            <svg className="w-5 h-5 text-white bg-transparent " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    ) : null}
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                    {localStorage.getItem("Token") != null ? (
                        <ul className="text-second items-center flex flex-col lg:space-x-8 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg   rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                            <li className="mx-1">
                                <NavLink to="/" className="block py-2 px-2 text-white md:p-0 md:hover:text-[#4fa74f]" aria-current="page">
                                    Home
                                </NavLink>
                            </li>
                            <li className="mx-1">
                                <NavLink to="/Cart" className="block py-2 px-2 md:p-0 text-white rounded-sm  md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                    Cart
                                </NavLink>
                            </li>
                            <li className="mx-1">
                                <NavLink to="/WishList" className="block py-2 px-2 md:p-0 text-white rounded-sm  md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                    Wish List
                                </NavLink>
                            </li>
                            <li className="mx-1">
                                <NavLink to="/Products" className="block py-2 px-2 md:p-0 text-white rounded-sm  md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                    Products
                                </NavLink>
                            </li>
                            <li className="mx-1">
                                <NavLink to="/Catrgories" className="block px-2 py-2 md:p-0 text-white rounded-sm  md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                    Categories
                                </NavLink>
                            </li>
                            <li className="mx-1">
                                <NavLink to="/Brands" className="block px-2 py-2 md:p-0 text-white rounded-sm  md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                    Brands
                                </NavLink>
                            </li>
                            <li className="mx-1">
                                <NavLink to="/allorders" className="block py-2 px-2 mx-0 md:p-0 text-white rounded-sm  md:hover:bg-transparent md:hover:text-[#4fa74f]">
                                    All Orders
                                </NavLink>
                            </li>
                        </ul>
                    ) : null}
                </div>
            </div>
        </nav>
    );
}
