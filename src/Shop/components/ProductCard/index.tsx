import { Link } from 'react-router';
import './index.css';

interface ProductCardProps {
    name: string;
    category: string;
    img: string;
    price: number;
    id: string;
}

const ProductCard = ({ img, name, category, price, id }: ProductCardProps) => {
    const addToCart = (productId: string) => {
        console.log(`Adding product ${productId} to cart`);
    }
    return (
        <div className="product-card">
            <div className="product-card-top">
                <h3>{name}</h3>
                <Link to='/shop/category' >{category}</Link>
            </div>
            <div className='product-card-img'>
                <img src={img} alt={name} />
            </div>
            <div className="product-card-details">
                <a href={`/product/${id}`}>See Details</a>
                <div>
                    <button onClick={() => addToCart(id)}>
                        <img src="/img/plus-button.svg" alt="Add to Cart" />
                    </button>
                    <span>{price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
