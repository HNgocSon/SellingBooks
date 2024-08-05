import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";
import ProductList from "../components/product-list";
import LoginForm from "../components/login-form";
import { useEffect, useState } from 'react';
import RegisterForm from "../components/register-form";
import ForgotPasswordForm from "../components/forgot-password-form";

export default function ProductPage() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios('http://127.0.0.1:8000/api/book')
            .then(response => response.data)
            .then(json => setProductList(json.data))
            .catch((error) => {
                console.log(error)
            })
    }, []);
        
    return (<>
        <Header />
        <ProductList data={productList} />
        <Footer />
    </>)
}