import axios from "axios"
import { Formik, useFormik } from "formik"
import { useContext, useState } from "react"
import {  Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import swal from 'sweetalert';
import { UserContext } from "../../Context/Context"

export function Login() {
  let [Loading, setLoading] = useState("")
  let navigate = useNavigate()
    let validationSchema = yup.object().shape({
    email : yup.string().required("email is required").matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,"You email is Not Vaild"),
    password : yup.string().required("password is required").matches(/^[0-9]{3,15}$/,"You password is Not Vaild"),
    })
    let formik = useFormik({
    initialValues:{
        email : "",
        password : ""
    },
    validationSchema ,
    onSubmit : function submit(val) {
      let api = axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , val)
      .then( (res)=> {
        localStorage.setItem("Token" , res.data.token)
        setLoading("loading")
        navigate("/")
      }) 

     .catch((res)=> {
      setLoading("loading")

      if (res.response.data.message != null) {
        swal("Oops!", res.response.data.message, "error");
      }
     })
     setLoading("no-loading")
    }
    })
    return <>
<section className=" w-[90%] mx-auto h-screen flex items-center">
  <div className="container pt-10 text-3xl font-bold">
    <h1 className="ms-2 py-2">Login Now</h1>
    <form  onSubmit={formik.handleSubmit} className="w-full">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-black m-2">Your Email</label>
        <input type="email" id="email"
        name = "email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className=" outline-none text-sm rounded-lg   block w-full p-2.5 border bg-gray-50 border-gray-300 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" placeholder="Write your Email" required />
      </div>
      {formik.errors.email && formik.touched.email ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.email}
</div> : null}
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black m-2">Your Password</label>
        <input type="password" id="password"
        name = "password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className=" outline-none text-sm rounded-lg  block w-full p-2.5 border bg-gray-50 border-gray-300 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500" placeholder="write your Password" required />
      </div>
      {formik.errors.password && formik.touched.password ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.password}
</div> : null}
     <div className="flex justify-between items-center">
     {<Link to={"/Verify"} className="ms-2 text-xl font-semibold hover:text-[#5aa84f] duration-500">Forget Your Password ?</Link>}
     <button type="submit" className = "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-14 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"  > 
     {Loading == "no-loading" ? <i className="fa-solid fa-spinner"></i> : "Submit"}
      </button>
     </div>
    </form>
  </div>
</section>
    </>
}

