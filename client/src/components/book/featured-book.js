import axios from "axios";
import { useEffect, useState } from "react";
import AddToCart from "./add-to-cart";
import { NavLink } from "react-router-dom";

export default function FeaturedBook() {
    const [featuredBook, setFeaturedBook] = useState();
    const currentDate = new Date();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/featured-book')
            .then((res) => setFeaturedBook(res.data.data[0]))
            .catch((error) => console.log(error));
    }, []);

    return (<> <section className="tg-bglight tg-haslayout">
        <div className="container">
            <div className="row">
                <div className="tg-featureditm">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 hidden-sm hidden-xs">
                        <figure><img src={`http://127.0.0.1:8000/${featuredBook?.images?.[0]?.front_cover}`} alt="image description" style={{height: '400px'}}/></figure>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <div className="tg-featureditmcontent">
                            <div className="tg-themetagbox"><span className="tg-themetag">Sách nổi bật</span></div>
                            <div className="tg-booktitle">
                                <h3><NavLink to={`/product/detail/${featuredBook?.id}`}>{featuredBook?.name}</NavLink></h3>
                            </div>
                            <span className="tg-bookwriter">Tác giả: <a href="#">{featuredBook?.authors?.map(item => item.name)}</a></span>
                            <span className="tg-stars"><span></span></span>
                            <div className="tg-priceandbtn">
                                <span className="tg-bookprice">
                                    {currentDate.toISOString().split('T')[0] < featuredBook?.discounts?.[0]?.end_date ? <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(featuredBook?.unit_price - (featuredBook?.discounts?.[0]?.percent * featuredBook?.unit_price) / 100)}</ins>
                                        <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(featuredBook?.unit_price)}</del></> : <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(featuredBook?.unit_price)}</ins></>}
                                </span>
                                <AddToCart data={featuredBook}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section></>);
}