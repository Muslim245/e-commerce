
import img1 from '../../assets/Images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img2 from '../../assets/Images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import img3 from '../../assets/Images/61cSNgtEISL._AC_SY200_.jpg'
import img4 from '../../assets/Images/41nN4nvKaAL._AC_SY200_.jpg'
import { Products } from "../Products/Products";
import Slider from 'react-slick'
import Slide from '../Slide/Slide';
export function Home() {
   var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows : false
    };
    
   
    return <>

<div className="carousel  flex flex-col md:flex-row gap-10 items-center w-full md:w-1/2 mx-auto pt-28 pb-5">
 <div className="md:w-1/2 w-full mx-auto ">
<Slider {...settings}>
      <div >
        <img className="w-full" src = {img3} alt="" />
      </div>
      <div>
      <img className="w-full" src = {img4} alt="" />
      </div>
</Slider>
</div>
<div className="images flex-col">
<img src = {img1} alt="" />
<img src = {img2} alt="" />
</div>
</div>
<Slide/>
<Products/>
    </>
}