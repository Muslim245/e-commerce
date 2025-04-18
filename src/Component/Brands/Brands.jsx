import axios from "axios"
import swal from 'sweetalert';
import { useEffect, useState } from "react"
export function Brands() {
    let [api, setapi] = useState([])
    let [modal, setmodal] = useState(false)
    let [name, setname] = useState("second")
    let [image, setimage] = useState("")
    let [title, settitle] = useState("")
    let [loading, setloading] = useState(true)
    async function getData() {
        try{
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        setapi(data.data)
        setloading(false)
        }
        catch(error)
        {
            setloading(false)
            swal("Oops!", error.message, "error");
        }
    }
    async function getDetails(id)  {

      try{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setimage(data.data.image)
    setname(data.data.name)
    settitle(data.data.slug)
    setmodal(true)
  }
  catch(error) {
    swal("Oops!", error.message, "error");
  }
  }
    useEffect(()=>
      { getData() }
     ,[])
    return <>
    <h2 className="text-[#4fa74f] text-center pt-28 text-4xl font-semibold">All Brands</h2>
   {loading == false ?  <div className="row flex flex-wrap w-3/4 gap-5  mx-auto py-5">
        {api.map((item , index)=>  <div key={index} className=" w-full lg:w-[23%] duration-500 hover:shadow-[1px_1px_10px_1px] hover:shadow-[#4fa74f] p-5 rounded-md border border-gray-400">
        <div data-modal-target="static-modal" data-modal-toggle="static-modal" className="text-center"
        
        onClick={ ()=>{ getDetails(item._id) ;}}>
        <img className="mx-auto" src = {item.image} alt="" />
        <span>{item.name}</span>
        </div>
        </div> 
        )}
    </div> : <div  className="flex justify-center h-screen items-center" role="status">
    <svg aria-hidden="true" className="inline w-20 h-20 animate-spin text-gray-600  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="transparent"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>}

{modal == true ? <div>
  <div onClick={()=>setmodal(false)} id="static-modal" data-modal-backdrop="static" tabIndex={-1} 
    className={`${modal ? "flex" : "hidden"} bg-black overflow-y-auto overflow-x-hidden h-[100%] fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`} >
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      <div className="relative  bottom-24  rounded-lg shadow-sm  bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 ">
          <button onClick={()=>setmodal(false) } type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center bg-gray-600 hover:text-white" data-modal-hide="static-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
        <div className="flex gap-5 justify-between items-center">
            <div>
                <h3 className="text-4xl text-[#4fa74f] py-3">{name}</h3>
                <h4>{title}</h4>
            </div>
            <div>
                <img src = { image} alt="" />
            </div>
        </div>  
        </div>
        <div className="flex justify-end items-center p-4 md:p-5 border-t rounded-b border-gray-600">
          <button onClick={()=>setmodal(false)} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none  rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">Okey</button>
        </div>
      </div>
    </div>
  </div>
</div> : null}
    </>
}



