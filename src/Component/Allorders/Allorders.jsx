import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
export default function Allorders() {
   const [arr, setarr] = useState([])
   let {id} = jwtDecode(localStorage.getItem("Token"))
   async function getOrdres() {
    try{
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      setarr(res.data)
    }
    catch(error){
      swal("Oops!", error.message, "error");

    }
   }
   useEffect(()=>{
    getOrdres()
   },[])

  return <>
  <div className='pt-28 w-3/4 mx-auto pb-5'>
    {arr.map((item , index)=> <div key={index} >
    <div className='flex flex-col mt-10 mb-5'>
    <span className='capitalize'> paymentMethodType : {item.paymentMethodType}</span>
    <span className='capitalize'> totalOrderPrice : {item.totalOrderPrice}</span>
    </div>
      <div className='flex flex-wrap gap-5'>
      {item.cartItems.map((product , index) => <div key={index} className='w-full sm:w-[48%] lg:w-[23%] flex flex-col gap-3'>
        <img className='w-full' src = {product.product.imageCover} alt="" />
        <span className='text-[#4fa74f]'>{product.product.category.name}</span>
        <div className='flex justify-between '>
        <span className=''>{product.product.title.split(" ").slice(0,2).join(" ")}</span>
        <div>
        <span ><i className="fa-solid fa-star text-[#daa520]"></i> {item.ratingsAverage}</span>
        <span>{product.product.ratingsAverage}</span>
        </div>
        </div>

        {/* {console.log(product.product)} */}
      </div> )  }
      </div>
      <div className="  after:content[''] after:w-[98%] mt-5 after:h-[0.5px] after:absolute after:bg-slate-300 relative"></div>

     </div> )}
     
</div>
  
   </>
    
  
}
// item.paymentMethodType   item.totalOrderPrice   item.cartItems

 