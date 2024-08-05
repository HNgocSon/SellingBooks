import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { add } from "../../reducers/cartSlice";
import { addToWishList } from "../../reducers/wishListSlice";

export default function RelatedBooks(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [relatedBooks, setRelatedBooks] = useState([]);
    var id = props.data;
    var settings = {
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
    useEffect(() => {
        if (id !== undefined) {
            axios.get(`http://127.0.0.1:8000/api/related-books/${id}`, { 'Accept': 'Application/json' })
                .then(response => response.data)
                .then(json => setRelatedBooks(json.data))
                .catch(error => console.log(error));
        }
    }, [id]);

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

    const reloadPage = (id) => {
        navigate(`/product/detail/${id}`);
        window.location.reload(false);
    }

    if (relatedBooks?.books?.length > 0) {
        return (<>
            <div className="tg-booksfromauthor">
                <div className="tg-sectionhead">
                    <h2>Sách liên quan</h2>
                </div>
                <div className="row">
                    <div>
                        <h5 style={{ color: 'white' }}>Sách đang giảm giá</h5>
                        <Slider {...settings}>
                            {relatedBooks?.books.map(book => {
                                return (<div key={book.id}>
                                    <div className="item" style={{ width: 200}}>
                                        <div className="tg-postbook">
                                            <figure className="tg-featureimg">
                                                <div className="tg-bookimg">
                                                    <div className="tg-frontcover"><img style={{height: '200px', width: '100%'}} src={`http://localhost:8000/` + book?.images[0]?.front_cover} alt="image description" /></div>
                                                    <div className="tg-backcover"><img style={{height: '200px'}} src={`http://localhost:8000/` + book?.images[0]?.front_cover} alt="image description" /></div>
                                                </div>
                                                <a onClick={()=>addWishList(book)} href="#" className="tg-btnaddtowishlist" >
                                                    <i className="icon-heart"></i>
                                                    <span>Thêm vào wishlist</span>
                                                </a>
                                            </figure>
                                            <div className="tg-postbookcontent">
                                                <div className="tg-themetagbox"><span className="tg-themetag">sale</span></div>
                                                <div className="tg-booktitle">
                                                    <h3><NavLink onClick={() => reloadPage(book.id)}>{book.name}</NavLink></h3>
                                                </div>
                                                <span className="tg-stars"><span></span></span>
                                                <span className="tg-bookprice" >
                                                    <ins style={{ fontSize: '2rem' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</ins>
                                                </span>
                                                <a onClick={()=>addToCart(book)} className="tg-btn tg-btnstyletwo" >
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
        </>)
    }
    else {
        return (<>
            <div className="tg-booksfromauthor">
                <div className="tg-sectionhead">
                    <h2>Sách liên quan</h2>
                </div>
                <div className="row">
                    Loading....
                </div>
            </div>
        </>)
    }

}