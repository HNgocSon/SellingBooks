import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteAll } from "../reducers/cartSlice";
import Swal from 'sweetalert2';
import SearchBar from "./search-bar";
import axios from "axios";

export default function MiddleContainerHeader() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.carts);
    const wishListItems = useSelector(state => state.wishList.wishListItem);
    const token = useSelector(state => state.auth.token);
    const [salesBooks, setSalesBooks] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sales-books`)
            .then(res => setSalesBooks(res.data.data))
            .catch(error => console.log(error));
    }, []);

    const calculateDiscountedPrice = (item) => {
        const saleItem = salesBooks.find(book => book.book.id === item.id);
        if (saleItem) {
            return parseFloat(item.unit_price) - (saleItem.percent * parseFloat(item.unit_price) / 100);
        }
        return parseFloat(item.unit_price) || 0;
    };

    const clearCartHandler = () => {
        Swal.fire({
            title: "Bạn chắc chứ?",
            text: "Bạn có muốn xóa toàn bộ sản phẩm khỏi giỏ hàng!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Hủy",
            confirmButtonText: "Xóa!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAll());
                Swal.fire({ title: "Xóa thành công!", text: "Sản phẩm đã được xóa khỏi giỏ hàng.", icon: "success" });
            }
        });
    };

    const renderIconUser = () => {
        if (token !== null) {
            return (
                <div className="dropdown tg-themedropdown tg-miniuserdropdown">
                    <NavLink to={'/account'} id="tg-miniuser" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="tg-themebadge"></span>
                        <i className="icon-user"></i>
                    </NavLink>
                </div>
            );
        }
    };

    const cartUI = () => {
        var total = 0;
        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const discountedPrice = calculateDiscountedPrice(item);
                total += item.quantity * discountedPrice;
            });
            return (
                <div className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-minicart">
                    <div className="tg-minicartbody">
                        {
                            cartItems.map((item, index) => {
                                if (index <= 2) {
                                    const discountedPrice = calculateDiscountedPrice(item);
                                    return (
                                        <div key={item.id || item} className="tg-minicarproduct">
                                            <img src={`http://localhost:8000/${item.image}`} style={{ width: '150px', height: '150px' }} />
                                            <div className="tg-minicarproductdata">
                                                <h5><a href="#">{item.name}</a></h5>
                                                <h6><a href="#">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountedPrice)}</a></h6>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    <div className="tg-minicartfoot">
                        <a className="tg-btnemptycart" onClick={clearCartHandler} href="#">
                            <i className="fa fa-trash-o"></i>
                            <span>Xóa toàn bộ</span>
                        </a>
                        <span className="tg-subtotal">Tổng tiền: <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</strong></span>
                        <div className="tg-btns">
                            <NavLink to="/cart" className="tg-btn tg-active">Xem giỏ hàng</NavLink>
                            <NavLink to="/checkout" className="tg-btn">Thanh toán</NavLink>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-minicart">
                    <div className="tg-minicartbody">
                        Không có sản phẩm nào trong giỏ hàng!
                    </div>
                    <div className="tg-minicartfoot">
                        <a className="tg-btnemptycart" onClick={clearCartHandler} href="#">
                            <i className="fa fa-trash-o"></i>
                            <span>Xóa toàn bộ</span>
                        </a>
                        <span className="tg-subtotal">Tổng tiền: <strong>0</strong></span>
                        <div className="tg-btns">
                            <NavLink to="/cart" className="tg-btn tg-active">Xem giỏ hàng</NavLink>
                            <a className="tg-btn" href="#">Thanh toán</a>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="tg-middlecontainer">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <strong className="tg-logo"><NavLink to={'/'}><img src={`${process.env.PUBLIC_URL}/assets_2/images/logo.png`} alt="company name here" /></NavLink></strong>
                        <div className="tg-wishlistandcart">
                            <div className="dropdown tg-themedropdown tg-wishlistdropdown">
                                <NavLink to="/wishlist">
                                    <a href="#" id="tg-wishlisst" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="tg-themebadge">{wishListItems.length}</span>
                                        <i className="icon-heart"></i>
                                        <span></span>
                                    </a>
                                </NavLink>
                                <div className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-wishlisst">
                                    <div className="tg-description"><p>Không có sản phẩm nào trong wishlist!</p></div>
                                </div>
                            </div>
                            <div className="dropdown tg-themedropdown tg-minicartdropdown">
                                <a href="#" id="tg-minicart" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="tg-themebadge">{cartItems.length}</span>
                                    <i className="icon-cart"></i>
                                    <span></span>
                                </a>
                                {cartUI()}
                            </div>
                            {renderIconUser()}
                        </div>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
