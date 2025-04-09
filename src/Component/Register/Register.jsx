import axios from "axios"
import { Formik, useFormik } from "formik"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import swal from 'sweetalert';
import { UserContext } from "../../Context/Context"
useContext
export function Register() {
  let [Loading, setLoading] = useState("")
  let navigate = useNavigate()
  let {userLogin , setuserLogin} = useContext(UserContext)
    let validationSchema = yup.object().shape({
      name : yup.string().required("name is required").matches(/^[a-zA-Z]{3,15}$/,"Your Name is Not Vaild") ,
      email : yup.string().required("email is required").matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,"You email is Not Vaild"),
      password : yup.string().required("password is required").matches(/^[0-9]{3,15}$/,"You email is Not Vaild"),
      rePassword : yup.string().required("rePassword is required").oneOf([yup.ref("password")] , "The password must be identical"),
      phone : yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,"You Phone is Not Vaild").required("Phone is required")
    })
    let formik = useFormik({
    initialValues:{
        name : "",
        email : "",
        password : "",
        rePassword : "",
        phone : ""
    },
    validationSchema ,
    onSubmit : function submit(val) {
      console.log(val)
      let Api = axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , val)
      .then( (res)=> {
        localStorage.setItem("Token" , res.data.token)
        setuserLogin(res.data.token)
        setLoading("loading")
        navigate("/")
      }) 

     .catch((res)=> {
      setLoading("loading")
      if (res.response.data.message != null) {
        swal("Oops!", res.response.data.message, "error");
      }
     }
    )
     setLoading("no-loading")
    }
  
    })
    return <>
<section className=" w-[90%] mx-auto h-screen py-5">
  <div className="container pt-16 text-3xl font-bold">
    <h1>Register Now</h1>
    <form  onSubmit={formik.handleSubmit} className="w-full py-5">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
        <input type="text" id="name"
        name = "name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="Write your Name" required />
      </div>
      {formik.errors.name && formik.touched.name ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100  capitalize" role="alert">
      <span className="font-medium"></span> {formik.errors.name}
      </div> :null}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
        <input type="email" id="email"
        name = "email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="Write your Email" required />
      </div>
      {formik.errors.email && formik.touched.email ? <div className="p-4 text-sm text-red-500 mb-4 rounded-lg bg-gray-100 capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.email}
</div> : null}
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
        <input type="password" id="password"
        name = "password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="write your Password" required />
      </div>
      {formik.errors.password && formik.touched.password ? <div className="p-4 text-sm mb-4 text-red-500 rounded-lg bg-gray-100  capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.password}
</div> : null}
      <div className="mb-5">
        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">Passward Again</label>
        <input type="password" id="rePassword"
        name = "rePassword"
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="Write Password Again" required />
      </div>
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-500 rounded-lg bg-gray-100  capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.rePassword}
</div> : null}

      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Your Phone</label>
        <input type="tel" id="phone"
        name = "phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="shadow-xs bg-gray-50 border text-sm rounded-lg text-black block w-full p-2.5 outline-none border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-xs-light" placeholder="write your Phone" required />
      </div>
      {formik.errors.phone && formik.touched.phone ? <div className="mb-4 p-4 text-sm text-red-500 rounded-lg bg-gray-100  capitalize" role="alert">
  <span className="font-medium"></span> {formik.errors.phone}
</div> : null}
     <div className="flex justify-end">
     <button type="submit" className = "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-14 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"  > 
     {Loading == "no-loading" ? <i className="fa-solid fa-spinner"></i> : "Submit"}
      </button>
     </div>
    </form>
  </div>
</section>
    </>
}

