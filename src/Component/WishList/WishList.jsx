import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ContextList } from "../../Context/ContextList"
import toast from "react-hot-toast"
import { CartContext } from "../../Context/CartContext"
import { Link } from "react-router-dom"
export function WishList() {
    let [wishList, setwishList] = useState([])
    let { getCardData , idProduct , array  } =useContext(CartContext)
    let {headers , arr , setarr } = useContext(ContextList)
    let [loading, setloading] = useState(true)
    let [loadAdd, setloadAdd] = useState(false)
    let [idList, setidList] = useState(0)
    let [loadList, setloadList] = useState(false)
    let updatearr = []
    async function getList() {
       try{
        let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{headers}) 
        setwishList(res.data.data)
        setloading(false)
       }
       catch(error) {
        toast.error(error.message)
        setloading(false)
       }
    }
    async function removeWishlist(id) {
        updatearr = arr.filter((item)=> item !=id)
        setarr(updatearr)
        localStorage.setItem( "arrayList" , JSON.stringify(updatearr))
        setloadList(true)
        setidList(id)
        try{
          let res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
          getList()
        }
        catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
           getList() 
     }, [])
     
    return <>
    {loading == true ? <div  className="flex justify-center h-screen items-center" role="status">
    <svg aria-hidden="true" className="inline w-20 h-20 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="transparent"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>  :  wishList.length > 0 ?  <div className="mx-auto w-[80%] py-5">
    <h2 className="pt-28 font-bold text-2xl text-center text-[#5aa84f]">My Wish List</h2>
    <div className="flex flex-wrap gap-5">
    {wishList.map((item , index)=> <div key={index} className="flex flex-col sm:gap-0 gap-5 sm:flex-row w-full ">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full" >
       <div className="flex justify-between sm:justify-start items-center w-full">
       <img className="w-1/2 sm:w-1/3 " src = {item.imageCover} alt="" />
       <div className="flex flex-col gap-2">
        <h3>Title : {item.title.split(" ").slice(0,2).join(" ")}</h3>
        <h4 className="text-[#5aa84f]">Price : {item.price}EGP</h4>
        </div>
       </div>
           
        <div className="flex flex-col gap-2 w-full sm:w-fit">
        <button onClick={async ()=> {setloadAdd(true) ; await getCardData(item.id) ; setloadAdd(false)}} type="button" className=" w-full  border  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-15 py-2.5 text-center  border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-800">
        {loadAdd && idProduct == item.id ? <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> 
        : JSON.parse(localStorage.getItem("array"))?.includes(item.id) ? "Add more" : "Add To Cart"}
        </button>
        <button onClick={()=>{removeWishlist(item.id)}}  type="button" className=" w-full  border  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-2.5 text-center  border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-800">
        {loadList && idList == item.id ? <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i>
        : <div className="flex items-center justify-center gap-2">
           <i className="fa-solid fa-trash"></i> 
           <span>Remove</span>
        </div> }
        </button>
        </div>
        </div>
       
    </div> )}
    </div>
    </div> :  <div className='h-screen flex justify-center items-center'>
  <h3 className='text-center py-5 capitalize'>Sorry Wish List is empty ... you can buy any thing from <Link className='text-blue-600  underline' to={"/"}>Home</Link> or {<Link className='text-blue-600  underline' to={"/Products"} >Products</Link>} </h3>
 </div>  }
    </>
}
