import { Link } from 'react-router';
import messageIcon from './assets/message.svg';
import visa from './assets/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg.png';
import paypal from './assets/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg.png';
import maestro from './assets/maestro-d2055c6b416c46cf134f393e1df6e0ba31722b623870f954afd392092207889c.svg.png';
import americaExpres from './assets/american_express-12858714bc10cdf384b62b8f41d20f56d8c32c1b8fed98b662f2bfc158dcbcf0.svg.png';
import discover from './assets/discover-cc9808e50193c7496e7a5245eb86d5e06f02e2476c0fe70f2c40016707d35461.svg.png';
import applepay from './assets/apple_pay-f6db0077dc7c325b436ecbdcf254239100b35b70b1663bc7523d7c424901fa09.svg.png';
import dinnerClubs from './assets/diners_club-16436b9fb6dd9060edb51f1c7c44e23941e544ad798282d6aef1604319562fba.svg.png';
import afterPay from './assets/afterpay-c814f73b45b605f4c618ce52eb8c67427d3ae3cb8addb872e621dfbabae0b5f0.svg.png';
import shopifyPay from './assets/shopify_pay-957a48d1202dc65a7890b292de764ee886f7e64cea486ae82e291e9dc824c914.svg.png';
import klarna from './assets/klarna-389801c6056cb5600b4f05f72ebc2c58e4947688c6c4f5e6ccea41f7973d3a28.svg.png';
import usaFlag from './assets/usa_flag.svg';
import './index.css';
    
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="first-divider"></div>
        <div className="content">
            <ul className='footer-list products'>
                <li className='header'>Products</li>
                <li>
                    <Link to="/shop/monitors">
                        Monitors
                    </Link>
                </li>
                <li>
                    <Link to="/shop/docking-stations">
                        Docking Stations
                    </Link>
                </li>
                <li>
                    <Link to="/shop/thermals">
                        Thermal Printers
                    </Link>
                </li>
                <li>
                    <Link to="/shop/scanners">
                        Scanners
                    </Link>
                </li>
                <li>
                    <Link to="/shop/cables">
                        Cables
                    </Link>
                </li>
            </ul>
            <ul className="footer-list about">
                <li className='header'>About</li>
                <li>
                    <Link to="/about">About AnyHDD</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                </li>
                <li>
                    <Link to="/global-privacy-policy">Global Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/join-us">Join Us</Link>
                </li>
            </ul>
            <ul className='footer-list services'>
                <li className='header'>Services</li>
                <li>
                    <Link to="/payment">Payment</Link>
                </li>
                <li>
                    <Link to="/warranty">Warranty</Link>
                </li>
                <li>
                    <Link to="/order-tracking">Order Tracking</Link>
                </li>
                <li>
                    <Link to="/shipping-and-delivery">Shipping & Delivery</Link>
                </li>
                <li>
                    <Link to="/returns-and-exchanges">Return & Exchanges</Link>
                </li>
            </ul>
            <ul className='footer-list'>
                <li className='header'>Contact Us</li>
                <li className='footer-contact-item'>
                    <img src={messageIcon} alt="Message Icon" />
                    <div>
                        <span className='light-green'>Our Response time</span><br />
                        Mon-Sun 9AM-5PM(PT)
                    </div>
                </li>
                <li className='footer-contact-item'>
                    <img src={messageIcon} alt="Message Icon" />
                    <Link to="mailto:sales@anyhdd.com">sales@anyhdd.com</Link>
                </li>
                
                <li className='header'>Payment Methods</li>
                <li className='icon-list'>
                    <img src={visa} alt="Visa" />
                    <img src={paypal} alt="PayPal" />
                    <img src={maestro} alt="Maestro" />
                    <img src={americaExpres} alt="American Express" />
                    <img src={discover} alt="Discover" />
                    <img src={applepay} alt="Apple Pay" />
                    <img src={dinnerClubs} alt="Diners Club" />
                    <img src={afterPay} alt="AfterPay" />
                    <img src={shopifyPay} alt="Shopify Pay" />
                    <img src={klarna} alt="Klarna" />
                </li>
            </ul>
        </div>
        <div className="second-divider"></div>
        <div className="footer-bottom">
          <p>© 2023 AnyHDD. All rights reserved.</p>
          <p>Select Your Region: <img src={usaFlag} alt="USA Flag" /> United States / English</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
