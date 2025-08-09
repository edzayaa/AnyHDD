import { Link } from 'react-router';
import Button from '../../Common/components/Buttons';
import './index.css'
import monitor from './assets/monitor.svg';
import scanners from './assets/scanners.svg';
import thermalPrinters from './assets/printers.svg';
import dockingStation from './assets/docking-stations.svg';
import allCategories from './assets/all-categories.svg';
const Navbar = () => {
  return (
    <nav>
        <div className="desk-navbar">
            <div className="left">
                <img className='logo-navbar' src="/img/anyhdd-logo.png" />
            </div>
            <div className="center">
                <input className='search-input' type="text" placeholder='Find a Specific Product  in Our Store'/>
                <Button onClick={() => {}} className='search-button'>
                    Search
                    <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M6.84245 10.7083C9.23424 10.7083 11.1732 8.7694 11.1732 6.3776C11.1732 3.98581 9.23424 2.04688 6.84245 2.04688C4.45065 2.04688 2.51172 3.98581 2.51172 6.3776C2.51172 8.7694 4.45065 10.7083 6.84245 10.7083Z" stroke="#052F5A" stroke-width="1.08268" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.2572 11.7923L9.90234 9.4375" stroke="#052F5A" stroke-width="1.08268" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
            </div>
            <div className="right">
                <ul className="navbar-links">
                    <li>
                        <Link to="/shop">Products</Link>
                    </li>
                    <li>
                        <Link to="/faq">FAQ</Link>
                    </li>
                    <li>
                        <Link to="/warranty">Warranty</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.13654 6.31836C7.13654 4.73681 8.41863 3.45472 10.0002 3.45472C11.5817 3.45472 12.8638 4.73681 12.8638 6.31836C12.8638 7.8999 11.5817 9.182 10.0002 9.182C8.41863 9.182 7.13654 7.8999 7.13654 6.31836ZM10.0002 1.81836C7.5149 1.81836 5.50018 3.83308 5.50018 6.31836C5.50018 8.80364 7.5149 10.8184 10.0002 10.8184C12.4854 10.8184 14.5002 8.80364 14.5002 6.31836C14.5002 3.83308 12.4854 1.81836 10.0002 1.81836ZM6.72745 12.4547C4.01623 12.4547 1.81836 14.6526 1.81836 17.3638C1.81836 17.8157 2.18467 18.182 2.63654 18.182C3.08841 18.182 3.45472 17.8157 3.45472 17.3638C3.45472 15.5564 4.91997 14.0911 6.72745 14.0911H13.2729C15.0804 14.0911 16.5456 15.5564 16.5456 17.3638C16.5456 17.8157 16.9119 18.182 17.3638 18.182C17.8157 18.182 18.182 17.8157 18.182 17.3638C18.182 14.6526 15.9841 12.4547 13.2729 12.4547H6.72745Z" fill="#052F5A"/>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.70537 3.18414C2.83579 2.90497 3.11605 2.72656 3.42419 2.72656H4.71103C5.07481 2.72656 5.39197 2.97396 5.48055 3.32679L5.88138 4.92364H17.4829C18.518 4.92364 19.2714 5.89701 19.0205 6.89674L17.7311 12.0333C17.4654 13.0918 16.5138 13.834 15.4226 13.834H8.33856C7.24827 13.834 6.29639 13.0945 6.03045 12.035L4.53731 6.08664L2.81591 4.02933C2.61817 3.79301 2.57495 3.46333 2.70537 3.18414ZM6.27968 6.51042L7.56947 11.6487C7.65778 12.0005 7.97375 12.2472 8.33856 12.2472H15.4226C15.7863 12.2472 16.1035 11.9998 16.192 11.647L17.4814 6.51042H6.27968ZM8.05095 17.2733C8.78124 17.2733 9.37326 16.6812 9.37326 15.9509C9.37326 15.2207 8.78124 14.6287 8.05095 14.6287C7.32065 14.6287 6.72863 15.2207 6.72863 15.9509C6.72863 16.6812 7.32065 17.2733 8.05095 17.2733ZM17.308 15.9509C17.308 16.6812 16.7159 17.2733 15.9857 17.2733C15.2554 17.2733 14.6634 16.6812 14.6634 15.9509C14.6634 15.2207 15.2554 14.6287 15.9857 14.6287C16.7159 14.6287 17.308 15.2207 17.308 15.9509Z" fill="#052F5A"/>
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
        <div className="desk-submenu">
            <ul className=''>
                <li>
                    <Link to="/shop/monitors">
                        <img src={monitor} alt="Monitors" />
                        Monitors
                    </Link>
                </li>
                <li>
                    <Link to="/shop/scanners">
                        <img src={scanners} alt="Scanners" />
                        Scanners
                    </Link>
                </li>
                <li>
                    <Link to="/shop/thermals">
                        <img src={thermalPrinters} alt="Thermal Printers" />
                        Thermal Printers
                    </Link>
                </li>
                <li>
                    <Link to="/shop/docking-stations">
                        <img src={dockingStation} alt="HP & Lenovo Docking Stations" />
                        HP & Lenovo Docking Stations
                    </Link>
                </li>
                <li>
                    <Link to="/shop">
                        <img src={allCategories} alt="All Categories" />
                        All Categories
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;
