import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import Home from "../components/home";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const params = useLocation();
  const navigate = useNavigate();
  const customerData = useSelector(state => state.customer.customerData);
  const token = useSelector(state => state.auth.token);


  return (
    <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
      <Header />
      <Banner />
      <Home />
      <Footer />
    </div>);
}