import { Autoplay, Pagination } from 'swiper/modules';
import './index.css'
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";

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
    }
]

const Hero = () => {
    const settings: SwiperProps = {
        modules: [Pagination, Autoplay],
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            clickable: false,
            renderBullet: (index, className) => {
                return `<span class="pagination-hero-item ${className}">${index + 1}</span>`;
            }
        }
    };
    return (
        <div className="hero-container">
            <Swiper {...settings} className='hero-swiper'>
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
        </div>
    )
}

export default Hero;