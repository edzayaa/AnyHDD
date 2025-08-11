import Badge from "../../../Common/components/Badge";
import Button from "../../../Common/components/Buttons";
import "./index.css"
const HomeAboutSection = () => {
  return (
    <section className="home-about">
        <div className="overlay-about">
            <img src="/img/about-home-overlay.png" alt="" />
        </div>
        <Badge text="Offering the best products" />
        <div className="home-about-content">
            <h2>About <span>AnyHDD</span></h2>
            <div className="text">
                <p>
                    <span>AnyHDD</span> is dedicated to providing high-quality storage solutions for all your needs. Our products are designed with the user in mind, ensuring reliability and performance.
                </p>
                <Button commonStyles={true}>
                    Shop Now
                </Button>
            </div>
        </div>
        <div className="about-img-container">
            <img src="/img/about-img.png" alt="About AnyHDD" className="about-img" />
        </div>
    </section>
  );
};

export default HomeAboutSection;