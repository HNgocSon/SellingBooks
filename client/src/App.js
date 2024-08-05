//import "./App.css";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Page404 from "./pages/Page404.js";
import DetailPage from "./pages/DetailPage.js";
import ContactPage from "./pages/ContactPage.js";
import WishListPage from './pages/WishListPage.js';
import CartPage from './pages/CartPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import ProductPage from './pages/ProductPage.js';
import AccountPage from './pages/AccountPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import ListOrderPage from "./pages/ListOrderPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import ComboDetailPage from "./pages/ComboDetailPage.js";
import CategoryProductPage from "./pages/CategoryProductPage.js";
import OrderDetailPage from "./pages/OrderDetailPage.js";
import GoogleCallback from "./pages/GoogleCallback.js";
import VnPayCallback from "./pages/VnPayCallBack.js";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.js";
import PasswordResetPage from "./pages/PasswordResetPage.js";
import PageHotSellingBook from "./pages/HotSellingBooks.js"
import PageSaleBooks from "./pages/PageSalesBooks.js"
import PageComboBooks from "./pages/PageComboBooks.js"
import ReturnPolicyPage from "./pages/ReturnPolicyPage.js";
export default function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="/password-reset/:token" element={<PasswordResetPage />}></Route>
          <Route path="/auth/google/callback" element={<GoogleCallback />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/product" element={<ProductPage/>}></Route>
          <Route path="/product/detail/:id" element={<DetailPage />}></Route>
          <Route path="/product/category/:id" element={<CategoryProductPage />}></Route>
          <Route path="/combo/detail/:id" element={<ComboDetailPage />}></Route>
          <Route path="/contact-us" element={<ContactPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path='/wishlist' element={<WishListPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/orders" element={<ListOrderPage />}></Route>
          <Route path="/vnp/callback" element={<VnPayCallback />}></Route>
          <Route path="/order/detail" element={<OrderDetailPage />}></Route>
          <Route path="/hot-selling-books" element={<PageHotSellingBook />}></Route>
          <Route path="/sales-books" element={<PageSaleBooks/>}></Route>
          <Route path="/combo-books" element={<PageComboBooks/>}></Route>
          <Route path="/return-policy" element={<ReturnPolicyPage/>}></Route>
          <Route path="/not-found" element={<Page404 />}></Route>
         
        </Routes>
    </>
  );
};
