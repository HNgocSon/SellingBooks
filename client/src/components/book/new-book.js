import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { add } from "../../reducers/cartSlice";
import { addToWishList } from "../../reducers/wishListSlice";

export default function NewBook() {
    const [newBooks, setNewBooks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/new-books`)
            .then(res => setNewBooks(res.data.data))
            .catch(error => console.log(error));
    }, []);

    const addToCart = (book) => {
        dispatch(add(book));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào giỏ hàng!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const addWishList = (book) => {
        dispatch(addToWishList(book));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }
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

    return (<><section className="tg-sectionspace tg-haslayout">
        <div className="container">
            <div className="row">
                <div className="tg-newrelease">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="tg-sectionhead">
                            <h2><span>Taste The New Spice</span>Sách mới ra mắt</h2>
                        </div>
                        <div className="tg-description">
                            <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt labore toloregna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoiars nisiuip commodo consequat aute irure dolor in aprehenderit aveli esseati cillum dolor fugiat nulla pariatur cepteur sint occaecat cupidatat.</p>
                        </div>
                        <div className="tg-btns">
                            <a className="tg-btn tg-active" href="javascript:void(0);">Xem tất cả</a>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="row">
                            <div className="tg-newreleasebooks">
                                <div >
                                    <h6 style={{ color: 'white' }}>Sách đang giảm giá</h6>
                                    <Slider {...settings}>
                                        {newBooks?.map(book => {
                                            return (<div>
                                                <div className="item" style={{ width: 300 }}>
                                                    <div className="tg-postbook">
                                                        <figure className="tg-featureimg">
                                                            <div className="tg-bookimg">
                                                                <div className="tg-frontcover"><img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.images[0]?.front_cover} alt="image description" /></div>
                                                                <div className="tg-backcover"><img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.images[0]?.front_cover} alt="image description" /></div>
                                                            </div>
                                                            <a onClick={() => addWishList(book)} href="javascript:void(0);" className="tg-btnaddtowishlist" >
                                                                <i className="icon-heart"></i>
                                                                <span>Thêm vào wishlist</span>
                                                            </a>
                                                        </figure>
                                                        <div className="tg-postbookcontent">
                                                            <div className="tg-themetagbox"><span className="tg-themetag">sale</span></div>
                                                            <div className="tg-booktitle">
                                                                <h3><NavLink to={`product/detail/${book?.id}`}>{book?.name}</NavLink></h3>
                                                            </div>
                                                            <span className="tg-stars"><span></span></span>
                                                            <span className="tg-bookprice" >
                                                                <ins style={{ fontSize: '2rem' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</ins>
                                                            </span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section></>)
}