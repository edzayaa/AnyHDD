
import './index.css'
interface TestimonialCardProps {
  testimonial: {
    text: string;
    author: string;
  };
  testimonialBlue?: boolean;
}

const TestimonialCard = ({ testimonial, testimonialBlue }: TestimonialCardProps) => {
  return (
    <div className={`testimonial-card ${testimonialBlue ? "testimonial-blue" : ""}`}>
        <div className="bg-img">
            <img src={`/img/${testimonialBlue ? "blue" : "grey"}-testimonial-card.png`} alt={testimonial.author} />
        </div>
        <div className="testimonial-content">
            <p className='text'>{testimonial.text}</p>
            <p className='author'>{testimonial.author}</p>
        </div>
    </div>
  );
};

export default TestimonialCard;