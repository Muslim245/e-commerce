import React from 'react'
import axios from "axios";
import Slider from "react-slick";
import  { useEffect, useState } from "react";
export default function Slide() {
    let [api, setapi] = useState([])
    let [media, setmedia] = useState(7)
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1 ,
      arrows : false ,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 410,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    async function getData() {
        try{
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setapi(data.data)
        }
        catch(error){
          swal("Oops!", error.message, "error");
        }
      }
      useEffect(()=> {
        getData()
      } , [])
  return <>

<Slider {...settings}>

{api.map((item , index)=> <div className='text-center' key={index}>
 <img className=" w-full h-52 object-cover" src = {item.image} alt="" />
 <span className='text-2xl font-semibold '>{item.name}</span>
</div> )}
</Slider> 
  </>
       
  
}
