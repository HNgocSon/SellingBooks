import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addCombo } from "../../reducers/cartSlice";
import { addComboToWishList } from "../../reducers/wishListSlice";
// import '../../bootstrap/css/bootstrap.min.css';

export default function Combo() {
    const [combos, setCombos] = useState([]);
    const dispatch = useDispatch();
    const currentDate = new Date();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/combo`)
            .then(res => setCombos(res.data.data))
            .catch(error => console.log(error));
    }, []);

    const addToCart = (combo) => {
        dispatch(addCombo(combo));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Combo đã được thêm vào giỏ hàng!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const addWishList = (combo) => {
        dispatch(addComboToWishList(combo));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Combo đã được thêm vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    // Hiển thị số sao người dùng đánh giá
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

    return (
        <section className="tg-parallax tg-bgcalltoaction tg-haslayout" data-z-index="-100" data-appear-top-offset="600" data-parallax="scroll" data-image-src="./assets_2/images/parallax/bgparallax-06.jpg">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="tg-calltoaction">
                                <h2>Combo sách</h2>
                                <h3>Combo giảm 15%</h3>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 style={{ color: 'white' }}>_</h6>
                        <div className="row">
                            {combos?.map(combo => (
                                <div key={combo.id || combo} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <div className="tg-postbook"><figure className="tg-featureimg">
                                            <div>
                                                <img style={{ height: '300px' }} src={`http://localhost:8000/` + combo?.image} alt="image description" />
                                            </div>
                                            <a onClick={() => addWishList(combo)} href="#" className="tg-btnaddtowishlist">
                                                <i className="icon-heart"></i>
                                                <span>Thêm vào wishlist</span>
                                            </a>
                                        </figure>
                                        <div className="tg-postbookcontent">
                                            <div className="tg-booktitle">
                                                <h3><NavLink to={`/combo/detail/${combo?.id}`}>{combo?.name}</NavLink></h3>
                                            </div>
                                            {renderStars(combo?.overrate)}
                                            <span className="tg-bookprice">
                                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(combo?.price)}</ins>
                                            </span>
                                            <a onClick={() => addToCart(combo)} className="tg-btn tg-btnstyletwo">
                                                <i className="fa fa-shopping-basket"></i>
                                                <em>Thêm vào giỏ hàng</em>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}