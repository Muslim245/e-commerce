import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
export default function Verify() {
  let navigate = useNavigate()
    let validationSchema = yup.object().shape({
      resetCode : yup.string().required("Code is required").matches(/^[0-9]{0,6}$/,"You Code is Not Vaild it must be six numbers "),
    })
   let formik = useFormik ({
    initialValues :{
      resetCode : ""
    } ,
    validationSchema ,
    onSubmit :  async function forgetPassword (code) {
      try{
           let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, code )
            navigate("/ResetPassword")
          }
          catch(error) {
            swal("Oops!", error.response.data.message, "error");
          }
    }
   })

  return (
    <div className='pt-28 w-3/4 mx-auto h-screen '>
       <div className='bg-second'>
       <h3 className='ms-2 capitalize text-2xl'>pleasssse enter your verification code</h3>
       <form onSubmit={formik.handleSubmit} >
  <div className="mb-5 ms-2">
    <label htmlFor="text"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Code</label>
    <input type="text" id="text"
     name = 'resetCode'
     value = {formik.values.resetCode}
     onChange = {formik.handleChange}
     onBlur = {formik.handleBlur}
     className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  required />
  </div>
  {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg  dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"></span> {formik.errors.resetCode}
</div> : null}
  <button type=" submit " className="text-green-700 ms-2 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Verify</button>
</form>

       </div>
    </div>
  )
}
