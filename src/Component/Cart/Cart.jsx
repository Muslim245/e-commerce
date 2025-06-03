import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export function Cart() {
    let {headers , setnumCartItem , totalPrice , Products ,  setProducts , settotalPrice , setcartID , array, setarray  } = useContext(CartContext)
    let [loading, setloading] = useState(true)
    let [idUpdate, setidUpdate] = useState(0)
    let [idRemove, setidRemove] = useState(0)
    let [loadUpdate, setloadUpdate] = useState(false)
    let [loadRemove, setloadRemove] = useState(false)
    let [loadClear, setloadClear] = useState(false)
    let user = jwtDecode(localStorage.getItem("Token"))
    let userId = user.id
    let updatearr = []
   async function getData() {
        try{
        let res =  await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        setProducts(res.data.data.products)
        settotalPrice(res.data.data.totalCartPrice)
        setloading(false)
        setcartID(res.data.cartId)
        let count = res.data.data.products.reduce((acc, item) => acc + item.count , 0);
        localStorage.setItem( `cart-${userId}` , count)
        setnumCartItem(count)
        }
        catch(error){
         toast(error.message)
         setloading(false)
        }
    }
    async function removeCart (id) {
      updatearr = array.filter((item)=> item != id)
      setarray(updatearr)
      localStorage.setItem("array" , JSON.stringify(updatearr))
      setidRemove(id)
      setloadRemove(true)
      try {
        let res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers})
        setProducts(res.data.data.products)
        settotalPrice(res.data.data.totalCartPrice)
        toast.success("The item is removed")
        let count = res.data.data.products.reduce((acc, item) => acc + item.count , 0);
        localStorage.setItem( `cart-${userId}` , count)
        setnumCartItem(count)
        setcartID(res.data.cartId)
        setloadRemove(false)

      }
       catch(error){
        setloadRemove(false)
        toast.error(error.message)
       }
    }
    async function updateCart (id , newcount) {
      setloadUpdate(true)
      setidUpdate(id)
     try{
        let res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count : newcount} , {headers})
        setProducts(res.data.data.products)
        settotalPrice(res.data.data.totalCartPrice)
        toast.success("The item has been updated ")
        let count = res.data.data.products.reduce((acc, item) => acc + item.count , 0);
        localStorage.setItem( `cart-${userId}` , count)
        setnumCartItem(count)
        setcartID(res.data.cartId)
        setloadUpdate(false)
     }
     catch(error){
      setloadUpdate(false)
      toast.error(error.message)
     }
    }
    async function clearCart() {
      setarray([])
      localStorage.removeItem("array")
      try{
      let res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
      settotalPrice(0)
      toast.success("the Product has been cleared")
      getData()
      }
      catch(error) {
        toast.error(error.message)
      }
    }
    
    useEffect(() => {
      let storedCount = localStorage.getItem(`cart-${userId}`);
      if (storedCount !== null) {
        setnumCartItem(parseInt(storedCount));
      } else {
        setnumCartItem(0);
      }
      getData();
    }, [userId]);
    
    return <>
    {loading == true ? <div  className="flex justify-center h-screen items-center" role="status">
    <svg aria-hidden="true" className="inline w-20 h-20  animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="transparent"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>  :  Products.length > 0 ? <div className='pt-28'>
<h2 className='text-center text-3xl py-5'>Total Price : {totalPrice}</h2>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-400">
    <thead className=" text-xs uppercase  bg-gray-700 text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {Products.map((item,index)=>  <tr key={index} className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
        <td className="px-6 py-4">
          <img  src = {item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full sm:mx-auto" alt="" />
        </td>
        <td className="px-6 py-4 font-semibold text-white">
          {item.product.title.split(" ").slice(0,2).join(" ")}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=> updateCart(item.product.id , item.count - 1) } className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 border  rounded-full focus:outline-none  focus:ring-4  bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
             {loadUpdate &&  item.product.id == idUpdate ?  <i className="fa-solid fa-circle-notch fa-spin text-blue-600"></i> : item.count }
            </div>
            <button onClick={()=> {updateCart(item.product.id , item.count + 1)}  } className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium  border  rounded-full focus:outline-none gray-100 focus:ring-4  bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold  text-white">
         {item.price}
        </td>
        <td className="px-6 py-4">
          <button onClick={()=> removeCart(item.product.id)}  className=" border  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-2.5 text-center  border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-800">
          {loadRemove && idRemove == item.product.id ? <i className="fa-solid fa-circle-notch fa-spin text-blue-600"></i>  : 
          <div className='flex items-center gap-1'>
            <i className="fa-solid fa-trash"></i>
            <span>Remove</span>
          </div>
         
           }
          </button>
        </td>
      </tr> )}
    </tbody>
  </table>
</div>
<div className=' me-5 gap-3 flex justify-end py-5'>
<Link to={"/Payment"}>
<button type="button" className="px-10  border  font-medium rounded-lg text-sm py-2.5 text-center me-2 mb-2 border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-900">Payment</button>
</Link>
<button onClick={()=> {clearCart() ; setloadClear(true)}} type="button" className="px-10  border   font-medium rounded-lg text-sm py-2.5 text-center me-2 mb-2 border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">
  {loadClear ? <i className="fa-solid fa-circle-notch fa-spin text-blue-600"></i> : "Clear"}
  </button>
</div>
</div>


 : <div className='h-screen flex justify-center items-center'>
  <h3 className='text-center py-5'>Sorry Card is empty ... you can buy any thing from <Link className='text-blue-600  underline' to={"/"}>Home</Link> or {<Link className='text-blue-600  underline' to={"/Products"} >Products</Link>} </h3>
 </div>
 }
    
    </>
}