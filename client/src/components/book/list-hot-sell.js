import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { add } from "../../reducers/cartSlice";
import { addToWishList } from "../../reducers/wishListSlice";
// import '../../bootstrap/css/bootstrap.min.css';

export default function ListHotSell() {
    const [hotSelling, setHotSelling] = useState([]);
    const dispatch = useDispatch();
    const currentDate = new Date();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/hot-selling-books`)
            .then(res => setHotSelling(res.data.data))
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
    };

    const addWishList = (book) => {
        dispatch(addToWishList(book));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <section className="tg-parallax tg-bgcalltoaction tg-haslayout" data-z-index="-100" data-appear-top-offset="600" data-parallax="scroll" data-image-src="images/parallax/bgparallax-06.jpg">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="tg-calltoaction">
                                <h2>Sách bán chạy</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 style={{ color: 'white' }}>Sách bán chạy</h6>
                        <div className="row">
                            {hotSelling.length > 0 ? hotSelling.map(book => (
                                <div key={book?.book?.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <div className="item">
                                        <div className="tg-postbook">
                                            <figure className="tg-featureimg">
                                                <div className="tg-bookimg">
                                                    <div className="tg-frontcover">
                                                        <img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.book?.images[0]?.front_cover} alt="image description" />
                                                    </div>
                                                    <div className="tg-backcover">
                                                        <img style={{ height: '300px' }} src={`http://localhost:8000/` + book?.book?.images[0]?.front_cover} alt="image description" />
                                                    </div>
                                                </div>
                                                <a onClick={() => addWishList(book?.book)} href="#" className="tg-btnaddtowishlist">
                                                    <i className="icon-heart"></i>
                                                    <span>Thêm vào wishlist</span>
                                                </a>
                                            </figure>
                                            <div className="tg-postbookcontent">
                                                {currentDate.toISOString().split('T')[0] < book?.book?.discounts?.[0]?.end_date && (
                                                    <div className="tg-themetagbox">
                                                        <span className="tg-themetag">Giảm {book?.book?.discounts?.[0]?.percent} %</span>
                                                    </div>
                                                )}
                                                <div className="tg-booktitle">
                                                    <h3><NavLink to={`/product/detail/${book?.book?.id}`}>{book?.book?.name}</NavLink></h3>
                                                </div>
                                                <span className="tg-stars"><span></span></span>
                                                {book?.unit_price !== undefined ? (
                                                    <span className="tg-bookprice">
                                                        {currentDate.toISOString().split('T')[0] < book?.book?.discounts?.[0]?.end_date ? (
                                                            <>
                                                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.unit_price - (book?.book?.discounts?.[0]?.percent * book?.book?.unit_price) / 100)}</ins>
                                                                <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</del>
                                                            </>
                                                        ) : (
                                                            <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.unit_price)}</ins>
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span className="tg-bookprice">
                                                        <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.price)}</ins>
                                                    </span>
                                                )}
                                                <a onClick={() => addToCart(book?.book)} className="tg-btn tg-btnstyletwo">
                                                    <i className="fa fa-shopping-basket"></i>
                                                    <em>Thêm vào giỏ hàng</em>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : "Không tìm thấy sản phẩm!"}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
