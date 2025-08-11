import CategoryCard from "../CategoryCard";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import './index.css'
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import type SwiperType from 'swiper';

const categories = [
    {
        title: "Monitor",
        description: "Lorem ipsum dolor sit amet consectetur. A odio dictum cras",
        uri: "/shop/monitor",
        img: "/img/monitors.png"
    },
    {
        title: "Scanners",
        description: "Lorem ipsum dolor sit amet consectetur. A odio dictum cras",
        uri: "/shop/monitor",
        img: "/img/scanners.png"
    },{
        title: "Docking Stations",
        description: "Lorem ipsum dolor sit amet consectetur. A odio dictum cras",
        uri: "/shop/monitor",
        img: "/img/docking-stations.png"
    },{
        title: "Thermal Printers",
        description: "Lorem ipsum dolor sit amet consectetur. A odio dictum cras",
        uri: "/shop/monitor",
        img: "/img/scanners.png"
    },{
        title: "Docking Stations",
        description: "Lorem ipsum dolor sit amet consectetur. A odio dictum cras",
        uri: "/shop/monitor",
        img: "/img/docking-stations.png"
    }
]

interface CategoriesSliderProps {
    prevRef: React.RefObject<HTMLButtonElement | null>;
    nextRef: React.RefObject<HTMLButtonElement | null>;
}

const CategoriesSlider = ({prevRef, nextRef}: CategoriesSliderProps) => { 
    const swiperRef = useRef<SwiperType | null>(null);
    const settings: SwiperProps = {
        modules: [Navigation],
        slidesPerView: 5,
        loop: true,
        spaceBetween: 20,
        breakpoints: {
            10: {
                slidesPerView: 1.8,
                spaceBetween: 10,
            },
            768: {
                
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 20,
            }
        },
        onInit: (swiper) => {
            swiperRef.current = swiper;
            // Update navigation after init
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
            }
        },
    }

    useEffect(() => {
        // Update navigation when refs change
        if (swiperRef.current) {
            const swiper = swiperRef.current;
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
            }
        }
    }, [prevRef, nextRef]);
    return (
        <Swiper {...settings}
            navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
            }}
        >
            {categories.map((category, index) => (
                <SwiperSlide key={index} className="category-slide">
                    <CategoryCard 
                        title={category.title} 
                        description={category.description} 
                        uri={category.uri} 
                        img={category.img}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CategoriesSlider;
