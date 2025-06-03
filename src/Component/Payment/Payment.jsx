import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { CartContext } from '../../Context/CartContext';
export default function Payment() {
    let { cartID , headers , setProducts , setnumCartIerm , settotalPrice , setnumCartItem  } = useContext(CartContext  )
    let navigate = useNavigate()
    let [loading, setloading] = useState(false)
    let [load, setload] = useState(false)
    let [cashoronline, setcashoronline] = useState("cash")
    let validationSchema = yup.object().shape({
        details : yup.string().required("details is required").matches(/^[a-zA-Z]{0,50}$/,"You details is Not Vaild"),
        phone : yup.string().required("phone is required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,"You phone is Not Vaild"),
        city : yup.string().required("city is required").matches(/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/,"You city is Not Vaild"),
    })
    async function cashOrder(values) {
      setloading(true)
      console.log(cartID)
        try{
            let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, 
            {shippingAddress : values} , {headers})
            setloading(false)
            console.log("cartID:", cartID);
            console.log("headers:", headers);
            setnumCartIerm(0)
            settotalPrice(0)
            setProducts([])
            console.log("Response from cash order:", res);
            localStorage.setItem("numCart" , 0)
            localStorage.removeItem("array")
            navigate("/allorders")
           }
           catch(error) {
            setloading(false)
            swal("Oops!", error.message, "error");
            console.log(error.message)
           }
           
     }
     async function onlineOrder(values) {
      setload(true)
        try{
            let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://e-commerce-eight-sandy.vercel.app/`, 
            {shippingAddress : values} , {headers} ,)
            setload(false)
            localStorage.setItem("numCart" , 0)
            localStorage.removeItem("array")
            window.location.href = res.data.session.url
           }
           catch(error) {
            setload(false)
            swal("Oops!", error.message, "error");
           }
     }
   let formik = useFormik ({
    initialValues :{
        details : "" ,
        phone : "" ,
        city : ""
    } ,
    validationSchema ,
    onSubmit :  async function (values) {
    if (cashoronline == "cash") {
       await cashOrder(values)
    } 
    else if (cashoronline == "online") {
        await onlineOrder(values)
    } 
    }
   })
  return (
    <div className='pt-28 w-3/4 mx-auto pb-10 h-screen flex items-center justify-center '>
       <div className='w-full'>
       <form onSubmit={formik.handleSubmit} >
  <div className="mb-5 ms-2">
    <label htmlFor="details"  className="block mb-2 text-sm font-medium text-gray-900 ">Your details</label>
    <input type="text" id="details"
     name = 'details'
     value = {formik.values.details}
     onChange = {formik.handleChange}
     onBlur = {formik.handleBlur}
     className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="Your Details" required />
  </div>
  {formik.errors.details && formik.touched.details ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.details}
</div> : null}



<div className="mb-5 ms-2">
    <label htmlFor="phone"  className="block mb-2 text-sm font-medium text-gray-900 ">Your phone</label>
    <input type='tel' id="phone"
     name = 'phone'
     value = {formik.values.phone}
     onChange = {formik.handleChange}
     onBlur = {formik.handleBlur}
     className=" outline-none shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="Your Phone" required />
  </div>
  {formik.errors.phone && formik.touched.phone ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.phone}
</div> : null}



<div className="mb-5 ms-2">
    <label htmlFor="city"  className="block mb-2 text-sm font-medium text-gray-900 ">Your city</label>
    <input type="text" id="city"
     name = 'city'
     value = {formik.values.city}
     onChange = {formik.handleChange}
     onBlur = {formik.handleBlur}
     className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="Your City" required />
  </div>
  {formik.errors.city && formik.touched.city ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.city}
</div> : null}
   <button onClick={()=> setcashoronline("cash")} type=" submit " className=" ms-2  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-800">
    {loading ? <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> : "PayCash"   }
  </button>
   
  <button onClick={()=> setcashoronline("online")} type=" submit " className=" ms-2  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-800">
    {load ? <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> : "PayOnline"  }
  </button>
</form>
       </div>
    </div>
  )
}

// 