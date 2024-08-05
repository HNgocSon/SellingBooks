import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
export default function NavigationHeader(props) {

    const [author,setAuthor] = useState(null);
    const navigate = useNavigate();
    const handleNavigate = (id) => {
        navigate(`/product`);
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/')
        .then((res) => {
            console.log(res.data.data); // Kiểm tra dữ liệu
            setAuthor(res.data.data);
        })
        .catch((error) => console.log(error));
    },[]);


    return (<><div className="tg-navigationarea">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <nav id="tg-nav" className="tg-nav">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#tg-navigation" aria-expanded="false">
                                <span className="sr-only"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
                            <ul><li className=" current-menu-item">
                                <NavLink to={'/'}>TRANG CHỦ</NavLink>
                            </li>
                                <li><NavLink to={'/product'}>SẢN PHẨM</NavLink></li>
                        
                                <li><NavLink to={'/hot-selling-books'}>BÁN CHẠY</NavLink></li>
                                <li><NavLink to={'/sales-books'}>GIẢM GIÁ</NavLink></li>
                                <li >
                                    <NavLink to={'/combo-books'}>COMBO</NavLink>
                                </li>
                                <li><NavLink to={'/contact-us'}>LIÊN HỆ</NavLink></li>
                                <li><NavLink to={'/contact-us'}>VỀ CHÚNG TÔI</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div >
    </div ></>)
}