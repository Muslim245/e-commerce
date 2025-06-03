import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext , useState } from "react";
import toast , { Toaster } from "react-hot-toast";
export let ContextList = createContext()
export function ContextListProvider(props) {
   let headers = {
   token : localStorage.getItem("Token")
    }
   let [idList , setidList] = useState(0)
   let [arr, setarr] = useState([])
   let user , userId
   if (localStorage.getItem("Token")) {
      user = jwtDecode(localStorage.getItem("Token"))
      userId = user.id
   }
   async function addList(id) {
      setidList(id)
      arr.push(id)
      localStorage.setItem( `arr-${userId}` , JSON.stringify(arr))
     
   try{
   let res =await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers})
   toast.success(res.data.message)
   }
   catch(error){
   toast.error(res.data.message)
   }
}

   return <ContextList.Provider value={{addList , headers , idList , arr , setarr }}>
    {props.children}
   </ContextList.Provider>
}
