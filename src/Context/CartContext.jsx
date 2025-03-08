import axios from "axios";
import { createContext, useState } from "react";
import toast from 'react-hot-toast';

export let CartContext = createContext()
export function CartContextProvider(props) {
    let [numCartItem, setnumCartIerm] = useState(0)
    let [cartID, setcartID] = useState("")
    let [totalPrice, settotalPrice] = useState(0)
    let [Products, setProducts] = useState([])
    let headers = {
        token : localStorage.getItem("Token")
    }
    async function getCardData(id) {
        try{
            let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},{headers})
             let count = res.data.data.products.reduce((acc, item) => acc + item.count , 0);
            localStorage.setItem("numCart" , count)
            setnumCartIerm(count)
            toast.success(res.data.message)
            setcartID(res.data.cartId)
        }
        catch(error) {
            toast.error(error.message)
        }
    }

    return <CartContext.Provider  value={{  getCardData , headers , numCartItem , setnumCartIerm , cartID , setcartID ,
        settotalPrice , setProducts , Products , totalPrice
      }}>
        {props.children}
    </CartContext.Provider>

  }
