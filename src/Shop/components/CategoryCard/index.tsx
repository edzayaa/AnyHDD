import { Link } from "react-router"
import './index.css'

interface CategoryCardProps {
    title: string;
    description: string;
    uri: string;
    img: string;
}

const CategoryCard = ({ title, description, uri, img }: CategoryCardProps) => {
    return (
        <div className="category-card">
            <img src="/img/category-bg.png" alt="Category" className="category-bg" />
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={uri}>
                    <span>Explore Category</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path d="M15.4178 5.29061C15.6613 5.04705 15.6613 4.65217 15.4178 4.40861L11.4488 0.439595C11.2052 0.196036 10.8103 0.196036 10.5668 0.439595C10.3232 0.683153 10.3232 1.07804 10.5668 1.3216L14.0948 4.84961L10.5668 8.37762C10.3232 8.62118 10.3232 9.01607 10.5668 9.25962C10.8103 9.50318 11.2052 9.50318 11.4488 9.25962L15.4178 5.29061ZM0.0742188 4.84961L0.0742188 5.47328L14.9768 5.47328V4.84961V4.22594L0.0742187 4.22594L0.0742188 4.84961Z" fill="black"/>
                    </svg>
                </Link>
                <img src={img} alt={title} className="category-img" />
            </div>
        </div>
    )
}

export default CategoryCard;