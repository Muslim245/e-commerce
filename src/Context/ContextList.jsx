import axios from "axios";
import { createContext , useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export let ContextList = createContext()
export function ContextListProvider(props) {
    let headers = {
   token : localStorage.getItem("Token")
    }
   async function addList(id) {
   try{
   let res =await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers})


   toast.success(res.data.message)
   }
   catch(error){
   toast.error(res.data.message)
   }
}
   return <ContextList.Provider value={{addList , headers  }}>
    {props.children}
   </ContextList.Provider>
}
