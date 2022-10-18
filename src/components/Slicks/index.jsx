import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.scss'
function SimpleSlider({style,imgItems,setIntroduceSelect,onClick,...props}) {
    const settings = {
        // dots: true,//是否显示小圆点索引
        autoplay: true,//是否自动播放
        infinite: true,//是否无限循环
        autoplaySpeed: 5000,//自动播放的时间
        // vertical: true,
        // fade: true,//是否采用淡入淡出的效果
        // slidesToShow: 1,
        // slidesToScroll: 1
        afterChange:(current)=>{
            setIntroduceSelect&&setIntroduceSelect(current)
        },
        ...props
    };

    const imgData = imgItems || ['http://p1.music.126.net/TAvUKGYb0jL9iUQmLxeSsg==/109951167913048858.jpg','http://p1.music.126.net/Yg2_qzqkNDDL2VeCjCNCPQ==/109951167913039693.jpg','http://p1.music.126.net/z9DHANqpmGiy3EVWG_itCQ==/109951167913078373.jpg']
    return (
        <div className='swiper-content'>
            <Slider  {...settings} className="swiper-container" style={style} >
                {
                    imgData.map((item,index)=><div onClick={()=>{onClick(index)}} >
                        <img src={item} alt=""/>
                    </div>)
                }
                
            </Slider>
        </div>
    )
}
export default SimpleSlider;
