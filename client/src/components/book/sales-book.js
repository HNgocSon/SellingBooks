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

export default function SalesBook() {
    const [salesBooks, setSalesBooks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sales-books`)
            .then(res => setSalesBooks(res.data.data))
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
    return (<><section className="tg-parallax tg-bgcalltoaction tg-haslayout" data-z-index="-100" data-appear-top-offset="600" data-parallax="scroll" data-image-src="images/parallax/bgparallax-06.jpg">
        <div className="tg-sectionspace tg-haslayout">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="tg-calltoaction">
                            <h2>Sách đang giảm giá</h2>
                           <NavLink className="tg-btn tg-active" to={'/sales-books'}>Xem tất cả</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 style={{ color: 'white' }}>Sách đang giảm giá</h6>
                    <Slider {...settings}>
                        {salesBooks?.map(book => {
                            return (<div key={book.id || book}>
                                <div className="item" style={{ width: 200 }}>
                                    <div className="tg-postbook">
                                        <figure className="tg-featureimg">
                                            <div className="tg-bookimg">
                                                <div className="tg-frontcover"><img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.book?.images[0]?.front_cover} alt="image description" /></div>
                                                <div className="tg-backcover"><img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.book?.images[0]?.front_cover} alt="image description" /></div>
                                            </div>
                                            <a onClick={() => addWishList(book?.book)} href="#" className="tg-btnaddtowishlist" >
                                                <i className="icon-heart"></i>
                                                <span>Thêm vào wishlist</span>
                                            </a>
                                        </figure>
                                        <div className="tg-postbookcontent">
                                            <div class="tg-themetagbox"><span class="tg-themetag">Giảm {book?.percent} %</span></div>
                                            <div className="tg-booktitle">
                                                <h3><NavLink to={`product/detail/${book?.book?.id}`}>{book?.book?.name}</NavLink></h3>
                                            </div>
                                            <span className="tg-stars"><span></span></span>
                                            <span className="tg-bookprice">
                                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.unit_price - (book?.percent * book?.book?.unit_price) / 100)}</ins>
                                                <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.unit_price)}</del>
                                            </span>
                                            <a onClick={() => addToCart(book?.book)} className="tg-btn tg-btnstyletwo" >
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
    </section></>)
}