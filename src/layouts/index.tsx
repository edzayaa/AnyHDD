import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScrollComponent from "../Common/components/SmoothScroll";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <SmoothScrollComponent>
                <Outlet />
                <Footer />
            </SmoothScrollComponent>
        </div>
    );
}

export default Layout;