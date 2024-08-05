import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addCombo } from "../../reducers/cartSlice";
import { addComboToWishList } from "../../reducers/wishListSlice";

export default function ListCombo(){
    const [combos, setCombos] = useState([]);
    const dispatch = useDispatch();
	const [newPage, setNewPage] = useState(0);
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

    return (<><section className="tg-parallax tg-bgcalltoaction tg-haslayout" data-z-index="-100" data-appear-top-offset="600" data-parallax="scroll" data-image-src="./assets_2/images/parallax/bgparallax-06.jpg">
        <div className="tg-sectionspace tg-haslayout">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="tg-calltoaction">
                            <h2>Combo sách</h2>
                       
                            {/* <NavLink className="tg-btn tg-active" to={'/product'}>Xem tất cả</NavLink> */}
                        </div>
                    </div>
                </div>
                <div>
                    <h6 style={{ color: 'white' }}>_</h6>
                    <Slider {...settings}>
                        {combos?.map(combo => {
                            return (<div key={combo.id || combo}>
                                <div className="item" style={{ width: 200 }}>
                                    <div className="tg-postbook">
                                        <figure className="tg-featureimg">
                                            <div ><img style={{ height: '300px'}} src={`http://localhost:8000/` + combo?.image} alt="image description" /></div>
                                            <a onClick={() => addWishList(combo)} href="#" className="tg-btnaddtowishlist" >
                                                <i className="icon-heart"></i>
                                                <span>Thêm vào wishlist</span>
                                            </a>
                                        </figure>
                                        <div className="tg-postbookcontent">
                                            <div className="tg-booktitle">
                                                <h3><NavLink to={`combo/detail/${combo?.id}`}>{combo?.name}</NavLink></h3>
                                            </div>
                                            {renderStars(combo?.overrate)}
                                            <span className="tg-bookprice">
                                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(combo?.price)}</ins>
                                            </span>
                                            <a onClick={() => addToCart(combo)} className="tg-btn tg-btnstyletwo" >
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