import axios from "axios";
import { createContext ,  useState } from "react";
import toast from 'react-hot-toast';
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
    async function getCardData(id) {
        setidProduct(id)
        array.push(id)
        localStorage.setItem("array" , JSON.stringify(array))
        try{
            let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},{headers})
            let count = res.data.data.products.reduce((acc, item) => acc + item.count , 0);
            localStorage.setItem( "count" , count)
            setnumCartItem(localStorage.getItem("count"))
            toast.success(res.data.message)
            setcartID(res.data.cartId)
        }
        catch(error) {
            toast.error(error.message)
        }
    }

    return <CartContext.Provider  value={{  getCardData , headers , cartID , setcartID , Products , setProducts ,
        settotalPrice  , totalPrice , idProduct ,  numCartItem , setnumCartItem , array, setarray
      }}>
        {props.children}
    </CartContext.Provider>

  }
