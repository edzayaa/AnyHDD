import { Autoplay, FreeMode, Thumbs } from 'swiper/modules';
import './index.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react';
import type SwiperType from 'swiper';

const mockData = [
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    }
]

const Hero = () => {
    const [thumbsSwiper,] = useState<SwiperType | null>(null);

    return (
        <div className="hero-container">
            <Swiper 
                className='hero-swiper'
                slidesPerView={1}
                loop={ true}
                navigation={true}
                spaceBetween={30}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Autoplay, Thumbs, FreeMode]}
            >
                {mockData.map((item, index) => (
                    <SwiperSlide key={index} className="hero-slide">
                        <div className="hero-bg-img">
                            <img src={item.image1} alt={item.title1} />
                        </div>
                        <div className="overlay"></div>
                        <div className="content">
                            <div className="titles">
                                <h1 className="hero-title">{item.title1}</h1>
                                <h1 className="hero-title hero-title-2">{item.title2}</h1>
                            </div>
                            <div className="card">
                                <img src={item.subimg} alt={item.title2} />
                                <div>
                                    <h3>{item.subtitle}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-hero-thumbnail-container">
               {/*  <Swiper
                    onSwiper={(swiper) => setThumbsSwiper(swiper)}
                    loop={true}
                    centeredSlides={true}
                    freeMode={false}
                    modules={[FreeMode, Thumbs]}
                    slidesPerView={5}
                    spaceBetween={0}
                    className='pagination-hero'
                >
                    {
                        mockData.map((_, index) => (
                            <SwiperSlide key={index} className="hero-thumb">
                                <span className={`pagination-hero-item`}>{index + 1}</span>
                            </SwiperSlide>
                        ))
                    }
                </Swiper> */}
            </div>
        </div>
    )
}

export default Hero;