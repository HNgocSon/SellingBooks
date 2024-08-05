import "../App.css";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, quantityChange, deleteCart } from "../reducers/cartSlice";
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from "react-router-dom";
import { addComboToWishList } from "../reducers/wishListSlice";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Cart() {
    const [salesBooks, setSalesBooks] = useState([]);
    const navigate = useNavigate();
    var color = { color: 'white' };
    const cartItems = useSelector(state => state.cart.carts);
    const checkLogin = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sales-books`)
            .then(res => setSalesBooks(res.data.data))
            .catch(error => console.log(error));
    }, []);

    const addWishList = (book) => {
        dispatch(addComboToWishList(book));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Combo đã được thêm vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    
    const deleteHandler = (id) => {
        Swal.fire({
            title: "Bạn có chắc chứ?",
            text: "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Không xóa",
            confirmButtonText: "Xóa khỏi giỏ hàng!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCart(id));
                Swal.fire({ title: "Xóa thành công!", text: "Sản phẩm đã được xóa khỏi giỏ hàng.", icon: "success" });
            }
        });
    }

    const checkLoggedIn = () => {
        if (checkLogin !== null) {
            navigate('/checkout');
        } else {
            Swal.fire({ title: "Rất tiếc!", text: "Bạn cần đăng nhập để thanh toán.", icon: "warning" });
        }
    }

    const calculateDiscountedPrice = (item) => {
        const saleItem = salesBooks.find(book => book.book.id === item.id);
        if (saleItem) {
            return parseFloat(item.unit_price) - (saleItem.percent * parseFloat(item.unit_price) / 100);
        }
        return parseFloat(item.unit_price) || 0;
    }

    const totalUI = () => {
        var total = 0;
        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const discountedPrice = calculateDiscountedPrice(item);
                total += item.quantity * discountedPrice;
            });
            return (
                <table className="table border-top-0">
                    <tbody>
                        <tr>
                            <td className="border-top-0">Tổng tiền:</td>
                            <td className="text-end border-top-0" style={{ fontWeight: 'bold' }}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                            </td>
                        </tr>
                        <tr>
                            <td className="border-top-0">Phí giao hàng:</td>
                            <td className="text-end border-top-0" style={{ fontWeight: 'bold' }}>30.000 đ</td>
                        </tr>
                        <tr>
                            <td className="fs-20 border-top-0">Tổng tiền thực tế:</td>
                            <td className="text-end fs-20 border-top-0" style={{ fontWeight: 'bold', color: 'red' }}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + 30000)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }

    const cartUI = () => {
        if (cartItems.length > 0) {
            return (
                <table className="table table-bordered table-vcenter mb-0">
                    <thead>
                        <tr className="border-top">
                            <th className="text-center">#</th>
                            <th>Ảnh</th>
                            <th>Tên sách</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => {
                            const discountedPrice = calculateDiscountedPrice(item);
                            return (
                                <tr key={item.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <img src={`http://localhost:8000/${item.image}`} style={{ height: '120px', width: '120px' }} alt={item.name} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountedPrice)}
                                    </td>
                                    <td>
                                        <div className="tg-quantityholder">
                                            <em className="minus" style={{ width: '25px' }} onClick={() => dispatch(quantityChange({ id: item.id, quantity: item.quantity - 1 }))}>-</em>
                                            <input type="text" style={{ width: '60px' }} className="result" value={item.quantity} id="quantity1" name="quantity" readOnly />
                                            <em className="plus" style={{ width: '25px' }} onClick={() => dispatch(quantityChange({ id: item.id, quantity: item.quantity + 1 }))}>+</em>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="#" onClick={() => addWishList(item)} className="btn btn-square btn-danger-light me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Save for Wishlist"><i className="icon icon-heart fs-13"></i></a>
                                        <a href="#" onClick={() => deleteHandler(item.id)} className="btn btn-square btn-info-light me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove"><i className="icon icon-trash fs-13"></i></a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
        return (
            <div className="tg-404errorcontent">
                <h2>Ooops! Không có sách trong giỏ hàng của bạn.</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="app-content main-content mt-0 mb-3">
                <div className="side-app">
                    <div className="main-container container-fluid">
                        <div className="row">
                            <div className="page-header">
                                <div>
                                    <h1 className="page-title">Giỏ hàng</h1>
                                    <ol className="tg-breadcrumb">
                                        <li><NavLink to={'/'}>Trang chủ</NavLink></li>
                                        <li className="tg-active">Giỏ hàng</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-8 col-md-12">
                                <div className="card cart">
                                    <div className="card-header border-bottom">
                                        {cartItems.length > 0 ? <h3 className="card-title">Thông tin giỏ hàng</h3> : ''}
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {cartUI()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-12">
                                <div className="card">
                                    <div className="card-header border-bottom">
                                        {cartItems.length > 0 ? <h3 className="card-title">Thông tin chi tiết</h3> : ''}
                                    </div>
                                    <div className="card-body">
                                        {totalUI()}
                                    </div>
                                    <div className="card-footer">
                                        <div className="step-footer text-end">
                                            <section className="container">
                                                <div className="d-flex justify-content-start row">
                                                    <div className="col-md-6">
                                                        <NavLink to="/product" className="btn btn-primary">{cartItems.length > 0 ? 'Tiếp tục mua hàng' : 'Mua hàng thui nào'}</NavLink>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {cartItems.length > 0 ? <a onClick={checkLoggedIn} className="btn btn-danger">Thanh toán</a> : ''}
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={color}>
                00
            </div>
        </div>
    );
}
