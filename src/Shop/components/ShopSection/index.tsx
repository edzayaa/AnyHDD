import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css'
import ProductCard from '../ProductCard';
import { mockProducts } from '../../mock/products';
import Button from '../../../Common/components/Buttons';
import CustomSelect from '../../../Common/components/CustomSelect/indext';
import { useState } from 'react';
import Pagination from '../../../Common/components/Pagination';
import Filter from '../../../Common/components/Filters';
const ShopSection = () => {
    const [sortOption, setSortOption] = useState({
        value: '',
        label: 'Sort by'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const filterOptions = [
        {
            header: "Price",
            options: [
                { value: "80", label: "$ 25.00 - $80.00" },
                { value: "150", label: "$ 80.00 - $150.00" },
                { value: "200", label: "$ 150.00 - $200.00" },
            ],
        },
        {
            header: "Status",
            options: [
                { value: "on-sale", label: "On Sale" },
            ],
        },
        {
            header: "Number of Ports",
            options: [
                { value: "1", label: "1 Port" },
                { value: "2", label: "2 -3 Ports" },
                { value: "+3", label: "More than 3 Ports" },
            ],
        },
        {
            header: "Charging Type",
            options: [
                { value: "Built-in Battery", label: "Built-in Battery" },
                { value: "Magnetic", label: "Magnetic" },
            ],
        }
    ];
    return (
        <div className="shop-section">
            <div className="headers">
                <div className="top-title">
                    <h2>Best sellers</h2>
                    <div className="slider-controls">
                        <button>
                        <img src="/img/prev-arrow.svg" alt="" />
                        </button>
                        <button>
                        <img src="/img/next-arrow.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="best-sellers-slide">
                <Swiper
                    slidesPerView={4.1}
                    spaceBetween={20}
                >
                    {mockProducts.map(product => (
                        <SwiperSlide key={product.id}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="sort-container">
                <div className="search-container">
                    <input className='search-input' type="text" placeholder='Search on Docking Stations'/>
                    <Button onClick={() => {}} className='search-button' commonStyles={true} commonWithoutIcon={true}>
                        Search
                        <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M6.84245 10.7083C9.23424 10.7083 11.1732 8.7694 11.1732 6.3776C11.1732 3.98581 9.23424 2.04688 6.84245 2.04688C4.45065 2.04688 2.51172 3.98581 2.51172 6.3776C2.51172 8.7694 4.45065 10.7083 6.84245 10.7083Z" stroke="#052F5A" stroke-width="1.08268" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.2572 11.7923L9.90234 9.4375" stroke="#052F5A" stroke-width="1.08268" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                </div>
                <div className="sort">
                    <CustomSelect
                        options={[
                            { value: 'popularity', label: 'Most Popular' },
                            { value: 'priceLowToHigh', label: 'Price: Low to High' },
                            { value: 'priceHighToLow', label: 'Price: High to Low' },
                        ]}
                        placeholder="Sort by"
                        value={sortOption}
                        onChange={(option) => {
                            if (option) setSortOption(option);
                        }}
                    />
                </div>
            </div>
            <div className="divider-shop"></div>
            <div className="shop">
                <div className="filters">
                    <div className='filter-head'>
                        <img src="/img/all-categories.svg" alt="Filters Icon" />
                        <h3>
                            Filters
                        </h3>
                    </div>
                    <Filter options={filterOptions} />
                </div>
                <div className="products-container">
                    <h5>Docking Stations / 33 Item(s) Found</h5>
                    <div className="products">
                        {
                            mockProducts.map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))
                        }
                    </div>
                    <div className="pagination-container">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={10}
                            onPageChange={(page) => setCurrentPage(page)}
                        />  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopSection;
