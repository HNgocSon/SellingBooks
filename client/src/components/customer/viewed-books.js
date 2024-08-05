import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { add, addCombo } from "../../reducers/cartSlice";
import { addComboToWishList, addToWishList } from "../../reducers/wishListSlice";
import { deleteAllViewedBooks } from "../../reducers/viewedBooksSlice";

export default function ViewedBooks() {
    const dispatch = useDispatch();
    const viewedBooks = useSelector(state => state.viewedBooks.items);
    const currentDate = new Date();

    //Hiển thị số sao người dùng đánh giá
    const renderStars = (value) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i <= value ? 'gold' : 'grey',
                        cursor: 'pointer',
                        height: '90px'
                    }}>★</span>
            );
        }
        return stars;
    };

    const addToCart = (book) => {
        if (book.book_type !== undefined) {
			dispatch(add(book));
		} else {
			dispatch(addCombo(book));
		}
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào giỏ hàng!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    
    const addWishList = (book) => {
        if (book.book_type !== undefined) {
			dispatch(addToWishList(book));
		} else {
			dispatch(addComboToWishList(book));
		}
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    //cấu hình react-slicker
    var settings = {
        dots: true,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    //Xóa toàn bộ danh sách đã xem
    const handleDeleteVB = () => {
        dispatch(deleteAllViewedBooks());

    }

    return (<><section className="tg-sectionspace tg-haslayout">
        <div className="container">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="tg-sectionhead">
                    <h2><span>Danh sách</span>Sách đã xem gần đây</h2>
                    <button className="tg-btn" onClick={handleDeleteVB}>Xóa tất cả</button>
                </div>
            </div>
            <div>
                <h6 style={{ color: 'white' }}>Sách đang giảm giá</h6>
                <Slider {...settings}>
                    {viewedBooks?.map(book => {
                        return (<div>
                            <div className="item" style={{ width: 200 }}>
                                <div className="tg-postbook">
                                    <figure className="tg-featureimg">
                                        <div className="tg-bookimg">
                                            <div className="tg-frontcover"><img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.images?.[0]?.front_cover} alt="image description" /></div>
                                            <div className="tg-backcover"><img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.images?.[0]?.front_cover} alt="image description" /></div>
                                        </div>
                                        <a onClick={() => addWishList(book)} href="javascript:void(0);" className="tg-btnaddtowishlist" >
                                            <i className="icon-heart"></i>
                                            <span>Thêm vào wishlist</span>
                                        </a>
                                    </figure>
                                    <div className="tg-postbookcontent">
                                        {currentDate.toISOString().split('T')[0] < book?.discounts?.[0]?.end_date ? <><div class="tg-themetagbox"><span class="tg-themetag">Giảm {book?.discounts?.[0]?.percent} %</span></div></> : ''}
                                        <div className="tg-booktitle">
                                            <h3><NavLink to={`/product/detail/${book?.id}`}>{book?.name}</NavLink></h3>
                                        </div>
                                        {renderStars(book?.overrate)}
                                        {book?.unit_price !== undefined ?
                                            <><span className="tg-bookprice">
                                                {currentDate.toISOString().split('T')[0] < book?.discounts?.[0]?.end_date ? <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.unit_price - (book?.discounts?.[0]?.percent * book?.unit_price) / 100)}</ins>
                                                    <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</del></> : <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.unit_price)}</ins></>}
                                            </span></> :
                                            <><span className="tg-bookprice">
                                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.price)}</ins>
                                            </span></>}
                                        <a onClick={() => addToCart(book)} className="tg-btn tg-btnstyletwo" >
                                            <i className="fa fa-shopping-basket"></i>
                                            <em>Thêm vào giỏ hàng</em>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>);
                    })}
                </Slider>
            </div>
        </div>
    </section></>);
}