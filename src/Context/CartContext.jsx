import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { UserContext } from "./Context";
import { jwtDecode } from "jwt-decode";
export let CartContext = createContext()
export function CartContextProvider(props) {
    let [cartID, setcartID] = useState("")
    let [totalPrice, settotalPrice] = useState(0)
    let [Products, setProducts] = useState([])
    let [array, setarray] = useState([])
    let [numCartItem, setnumCartItem] = useState(0)
    let headers = {
        token : localStorage.getItem("Token")
    }
    let [idProduct, setidProduct] = useState(0)
    let user , userId
    if (localStorage.getItem("Token")) {
        user = jwtDecode(localStorage.getItem("Token"))
        userId = user.id
    }
   
    async function getCardData(id) {
        setidProduct(id)
        array.push(id)
        try{
            let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},{headers})
            let count = res.data.data.products.reduce((acc, item) => acc + item.count , 0);
            localStorage.setItem( `cart-${userId}` , count)
            setnumCartItem(localStorage.getItem(`cart-${userId}`))
            toast.success(res.data.message)
            setcartID(res.data.cartId)
        }
        catch(error) {
            toast.error(error.message)
        }
    }

    return <CartContext.Provider  value={{  getCardData , headers , cartID , setcartID ,
        settotalPrice , setProducts , Products , totalPrice , idProduct , array, setarray , numCartItem , setnumCartItem
      }}>
        {props.children}
    </CartContext.Provider>

  }
