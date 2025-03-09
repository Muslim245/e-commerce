
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Component/Home/Home'
import { Cart } from './Component/Cart/Cart'
import { Products } from './Component/Products/Products'
import { Brands } from './Component/Brands/Brands'
import { WishList } from './Component/WishList/WishList'
import { Error } from './Component/Error/Error'
import { Register } from './Component/Register/Register'
import { Login } from './Component/Login/Login'
import { Logout } from './Component/Logout/Logout'
import { UserContextProvider } from './Context/Context'
import { Protectedroute } from './Component/Protectedroute/Protectedroute'
import Details from './Component/Details/Details'
import { Catrgories } from './Component/Catrgories/Catrgories'
import { CartContextProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import { ContextListProvider } from './Context/ContextList'
import { Layout } from './Component/Layout/Layout'
import Verify from './Component/Verify/Verify'
import Code from './Component/Code/Code'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import Payment from './Component/Payment/Payment'
import Allorders from './Component/Allorders/Allorders'
import { DarkModeProvider } from './Context/DarkModeContext'
import { initFlowbite } from 'flowbite'





function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  
 let router = createBrowserRouter([{
  path:"" , element:<Layout/>, children : [
    {index:true , element :<Protectedroute><Home/></Protectedroute> },
    {path:"Cart" , element : <Protectedroute><Cart/></Protectedroute>},
    {path:"WishList" , element : <Protectedroute><WishList/></Protectedroute>},
    {path:"Products" , element : <Protectedroute><Products/></Protectedroute>},
    {path:"Catrgories" , element : <Protectedroute><Catrgories/></Protectedroute>},
    {path:"Brands" , element : <Protectedroute><Brands/></Protectedroute>},
    {path:"Details/:id/:name" , element : <Protectedroute><Details/></Protectedroute>},
    {path:"Register" , element : <Register/>},
    {path:"Login" , element : <Login/>},
    {path:"Logout" , element : <Logout/>},
    {path:"Verify" , element : <Verify/>},
    {path:"Code" , element : <Code/>},
    {path:"ResetPassword" , element : <ResetPassword/>},
    {path:"allorders" , element : <Allorders/>},
    {path:"Payment" , element : <Payment/>},
    {path:"*" , element : <Error/>},
  ]
 }])

  return (
    <>
    <DarkModeProvider>
    <UserContextProvider>
        <CartContextProvider>
          <ContextListProvider>
          <RouterProvider router={router}></RouterProvider>
          </ContextListProvider>
        <Toaster/>
        </CartContextProvider>
      </UserContextProvider>
    </DarkModeProvider>
      
 
      
    
    </>
  )
}

export default App
