import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
export default function Verify() {
  let navigate = useNavigate()
    let validationSchema = yup.object().shape({
        email : yup.string().required("email is required").matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,"You email is Not Vaild"),
    })
   let formik = useFormik ({
    initialValues :{
     email : "" ,
     newPassword : ""
    } ,
    validationSchema ,
    onSubmit :  async function forgetPassword (values) {
      try{
           let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
           navigate("/Code")
          }
          catch(error) {
            swal("Oops!", error.response.data.message, "error");
          }
    }
   })

  return (
    <div className='pt-28 w-3/4 mx-auto h-screen '>
       <div>
       <h3 className='ms-2 capitalize text-2xl'>please enter your verification code</h3>
       <form onSubmit={formik.handleSubmit} >
  <div className="mb-5 ms-2">
    <label htmlFor="email"  className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input type="email" id="email"
     name = 'email'
     value = {formik.values.email}
     onChange = {formik.handleChange}
     onBlur = {formik.handleBlur}
     className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="enter your email " required />
  </div>
  {formik.errors.email && formik.touched.email ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.email}
</div> : null}
  <button type=" submit " className="ms-2  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-800">Verify</button>
</form>

       </div>
    </div>
  )
}
