import img1 from '../../assets/Images/WhatsApp Image 2025-02-25 at 11.21.24 PM (1).jpeg' 
import img2 from '../../assets/Images/WhatsApp Image 2025-02-25 at 11.21.24 PM.jpeg' 
import img3 from '../../assets/Images/WhatsApp Image 2025-02-25 at 11.21.29 PM.jpeg' 
export function Footer() {
    return <>
    <footer className="bg-slate-100">
        <div className="py-5 flex flex-col w-[90%]  mx-auto">
            <h3 className="text-xl">Get the Fresh Cart App</h3>
            <p className="text-slate-500">We will Send you link , open it on your phone to download the app</p>
                <div className="my-2">
                <form className=" flex items-center gap-5" action="#">
                 <input className=" w-[85%] px-2  py-1 rounded-md ms-5  outline-0" type="email" name="email" placeholder="Email" />
                 <button className="bg-green-600 py-1 px-5 rounded-md text-slate-50 ">Share App Link</button>
                </form>
                <div className=" after:content[''] after:w-[98%] ms-3 mt-5 after:h-[0.5px] after:absolute after:bg-slate-300 relative"></div>
                </div>
            <div className='flex flex-col lg:flex-row gap-5  items-center justify-between'>
                <div className='flex flex-col lg:flex-row items-center gap-5'>
                     <span>Payment Partners</span>
                     <div className='flex mx-auto gap-2 items-center'>
                        <img className='w-10 h-10 ' src = {img1} alt="" />
                        <img className='w-10 h-10' src = {img2} alt="" />
                        <img className='w-10 h-10' src = {img3} alt="" />
                     </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5 items-center'>
                    <span>Get deliveries with freshCart</span>
                    

    <a href="#" className="w-full sm:w-auto  focus:ring-4 focus:outline-none  text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 ">
      <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
      <div className="text-left rtl:text-right">
        <div className="mb-1 text-xs">Download on the</div>
        <div className="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>
      </div>
    </a>
    <a href="#" className="w-full sm:w-auto  hover:bg-gray-700 focus:ring-4 focus:outline-none  text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 focus:ring-gray-700 bg-gray-600  ">
      <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
      <div className="text-left rtl:text-right">
        <div className="mb-1 text-xs">Get in on</div>
        <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
      </div>
    </a>
                </div>
            </div>
            
        </div>
    </footer>
    </>
}