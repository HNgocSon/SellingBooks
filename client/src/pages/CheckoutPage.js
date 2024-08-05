import { NavLink } from "react-router-dom";
import Checkout from "../components/checkout";
import Footer from "../components/footer";
import Header from "../components/header";

export default function CheckoutPage() {
    return (<>
        <Header />
        <Checkout/>
        <Footer />
    </>)
}