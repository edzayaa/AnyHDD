import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../../Common/components/Buttons";
import './index.css'
import TestimonialCard from "../TestimonialCard";
import { EffectCards, Pagination } from "swiper/modules";
//@ts-expect-error Even if the css exist isnt detected
import 'swiper/css/effect-cards';
//@ts-expect-error Even if the css exist isnt detected
import 'swiper/css/pagination';
//@ts-expect-error Even if the css exist isnt detected
import 'swiper/css/navigation';
const mockTestimonials = [
    {
        id: 1,
        text: "This product has changed my life for the better!",
        author: "Happy Customer"
    },
    {
        id: 2,
        text: "I can't imagine my life without this product!",
        author: "Satisfied Client"
    },
    {
        id: 3,
        text: "The best investment I've ever made!",
        author: "Loyal User"
    }
];
const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonial-head">
            <div className="head">
                <h2>Satisfied Clients</h2>
                <h2 className="gradient">Trusted by Over 2k+</h2>
            </div>
            <div className="text">
                <p>
                    We are proud to have served over 2,000 satisfied clients who trust us for their docking station needs.
                </p>
                <Button commonStyles={true}>
                    Get Started
                </Button>
            </div>
        </div>
        <div className="testimonial-carousel">
            <Swiper
                pagination={{
                    type: "progressbar"
                }}
                modules={[EffectCards, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                effect={"cards"}
                loop={true}
                className="swiper-container"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
            >
                {mockTestimonials.map((testimonial, index) => (
                    <SwiperSlide key={testimonial.id}>
                        <TestimonialCard testimonial={testimonial} testimonialBlue={index % 2 !== 0} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </section>
  );
};

export default Testimonials;
