import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert';
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext';
import { ContextList } from '../../Context/ContextList';
export default function Details() {
    let {getCardData , idProduct} = useContext(CartContext)
    let {addList , idList} = useContext(ContextList)
    let [api, setapi] = useState(null)
    let [loading, setloading] = useState(true)
    let [related, setrelated] = useState([])
    let {id , name } = useParams()
    let [itemId, setitemId] = useState("")
    let [loadAdd, setloadAdd] = useState(false)
    let [loadRelatedadd, setloadRelatedadd] = useState(false)
    let [loadList, setloadList] = useState(false)
    let [loadRelatedlist, setloadRelatedlist] = useState(false)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    async function getData() {
        try{
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            setitemId(data.data.id)
            setapi(data.data)
            setloading(false)
        }
        catch(error) {
            swal("Oops!", error.message, "error");
        }
    }
    async function getRelated() {
        try{
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
       let res = data.data.filter((item)=> item.category.name == name )
       setrelated(res)
        }
        catch(error){
        swal("Oops!", error.message, "error");
        }
    }
    useEffect(()=> {
        getData() ,
        getRelated() 
    } , [ id , name])
  return <>
  {loading == true ? <div  className="flex justify-center h-screen items-center" role="status">
    <svg aria-hidden="true" className="inline w-20 h-20 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="transparent"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div> :  <div className='flex gap-5 flex-col md:flex-row items-center w-3/4 mx-auto pt-28 pb-10 justify-center '>
    <div className='w-full md:w-1/3 '>
    <Slider {...settings}> 
        {api?.images.map((item , index)=>  <img key={index} className="w-full" src = {item} alt="" /> )}
     </Slider> 
    </div>

    <div className='w-full md:w-2/3'>
      <h3 className='font-bold text-3xl'>{api?.title}</h3>
      <h4 className='py-5'>{ api?.description}</h4>
      <div className="flex justify-between">
      <span  >{api?.price}EGP</span>
      <span ><i className="fa-solid fa-star text-[#daa520]"></i> {api?.ratingsAverage}</span>
     </div>
     
    </div>
      
  </div>}
  <div className='flex flex-col justify-between items-center py-5'>
     <button onClick={async ()=>{setloadAdd(true) ; await getCardData(itemId) ; setloadAdd(false)}} className=" w-3/4  bg-[#5aa84f] text-slate-50 py-1 mt-2 rounded-md">
    { loadAdd ?  <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> : "Add To Cart"}
    </button>
     <button onClick={ async ()=> {setloadList(true) ; await addList(itemId) ; setloadList(false)  }} className="  w-3/4 my-5 bg-[#5aa84f] text-slate-50 p-1 rounded-md">
    {loadList ? <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> :"Add To wish List"}
    </button>
     </div>
  <div className='flex  flex-wrap w-3/4 mx-auto'>
   {related.map((item , index)=> <div key={index} className='w-full md:w-1/2 lg:w-1/4 p-2'>
   <Link to={`/Details/${item.id}/${item.category.name}`}>
      <div>
      <img src = {item.imageCover} alt="" />
      <h3 className="  text-[#5aa84f] py-2">{item.category.name}</h3>
      <h3 className=" font-bold">{item.title.split(" ").slice(0,2).join(" ")} </h3>
      <div className="flex justify-between">
      <span  >{item.price}EGP</span>
      <span ><i className="fa-solid fa-star text-[#daa520]"></i> {item.ratingsAverage}</span>
     </div>
      </div></Link>
      <div className='flex flex-col  items-center'>
     <button onClick={async ()=> {setloadRelatedadd(true) ; await getCardData(item.id) ; setloadRelatedadd(false)}} className=" w-3/4 bg-[#5aa84f] text-slate-50 py-1 mt-2 rounded-md">
     { loadRelatedadd && idProduct == item.id ?  <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> : "Add To Cart"}
     </button>
     <button onClick={async ()=> {setloadRelatedlist(true) ; await addList(item.id) ; setloadRelatedlist(false)  }} className="  w-3/4  my-5 bg-[#5aa84f] text-slate-50 p-1 rounded-md">
    {loadRelatedlist && idList == item.id  ? <i className="fa-solid fa-circle-notch fa-spin  text-blue-600"></i> : "Add To wish List"}
    </button>

     </div>

</div> )}
   </div>
   
  </>
}
 
  

