import Badge from "../Common/components/Badge"
import Hero from "../Home/components/Hero"
import CategoriesSlider from "../Shop/components/CategoriesSlider"
import { useRef } from "react";
import './Home.css'
const Home = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="home-container">
      <div className="top-spacing"></div>
      <div>
        <Hero />
      </div>
      <div className="section-2">
        <Badge text="Bestsellers on AnyHDD" />
        <div className="top-title">
          <h2>Explore our <span>top products</span> by category</h2>
          <div className="slider-controls">
            <button ref={prevRef}>
              <img src="/img/prev-arrow.svg" alt="" />
            </button>
            <button ref={nextRef}>
              <img src="/img/next-arrow.svg" alt="" />
            </button>
          </div>
        </div>
        <CategoriesSlider prevRef={prevRef} nextRef={nextRef} />
      </div>
    </div>
  )
}

export default Home
