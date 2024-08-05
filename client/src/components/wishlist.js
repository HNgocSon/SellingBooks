import { useDispatch, useSelector } from "react-redux";
import { deleteWishList } from "../reducers/wishListSlice";
import { add, addCombo } from "../reducers/cartSlice";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export default function Wishlist() {
    const dispatch = useDispatch();
    const wishListItems = useSelector(state => state.wishList.wishListItem);

    const deleteItemInWishList = (id) => {
        dispatch(deleteWishList(id));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sác đã được xóa khỏi wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const addToCart = (item) => {
        if (item.book_type !== undefined) {
            dispatch(add(item));
        } else {
            dispatch(addCombo(item));
        }
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đã thêm sách vào giỏ hàng!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const wishlistUI = () => {
        const currentDate = new Date(); //Lấy ngày hiện tại
        if (wishListItems.length > 0) {
            return (<>
                {
                    wishListItems.map(function (item) {
                        return (
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                                <div className="tg-postbook">
                                    <figure className="tg-featureimg">
                                        <div className="tg-bookimg">
                                            {item?.images?.[0]?.front_cover !== undefined ?
                                                <><div class="tg-frontcover"><img style={{width: '450px', height: '300px'}} src={`http://localhost:8000/` + item.images[0].front_cover} alt="image description" /></div>
                                                    <div class="tg-backcover"><img src={`http://localhost:8000/` + item.images[0].front_cover} alt="image description" /></div></> :
                                                <><div class="tg-frontcover"><img style={{width: '450px', height: '300px'}} src={`http://localhost:8000/` + item.image} alt="image description" /></div>
                                                    <div class="tg-backcover"><img src={`http://localhost:8000/` + item.image} alt="image description" /></div></>}
                                        </div>
                                        <a class="tg-btnaddtowishlist" onClick={() => deleteItemInWishList(item.id)} href="javascript:void(0);">
                                            <i class="icon-heart"></i>
                                            <span>Xóa khỏi wishlist</span>
                                        </a>
                                    </figure>
                                    <div className="tg-postbookcontent">
                                        <ul className="tg-bookscategories">
                                            <li><a href="javascript:void(0);">{item.categories?.[0].name}</a></li>
                                        </ul>
                                        {currentDate.toISOString().split('T')[0] < item?.discounts?.[0]?.end_date ? <><div class="tg-themetagbox"><span class="tg-themetag">Giảm {item?.discounts?.[0]?.percent} %</span></div></> : ''}
                                        <div class="tg-booktitle">
                                            <h3><NavLink to={`/product/detail/${item.id}`} >{item.name}</NavLink></h3>
                                        </div>
                                        <span className="tg-stars"><span></span></span>
                                        {item?.unit_price !== undefined ?
                                            <><span className="tg-bookprice">
                                                {currentDate.toISOString().split('T')[0] < item?.discounts?.[0]?.end_date ? <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price - (item?.discounts?.[0]?.percent * item.unit_price) / 100)}</ins>
                                                    <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price)}</del></> : <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price)}</ins></>}
                                            </span></> :
                                            <><span className="tg-bookprice">
                                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</ins>
                                            </span></>}
                                        <a className="tg-btn tg-btnstyletwo" onClick={() => addToCart(item)} href="javascript:void(0);">
                                            <i className="fa fa-shopping-basket"></i>
                                            <em>Thêm vào giỏ hàng</em>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </>);
        }

        return (<><main id="tg-main" className="tg-main tg-haslayout">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div className="tg-404error">
                            <div className="col-xs-12 col-sm-12 col-md-8 col-md-push-2 col-lg-6 col-lg-push-3">
                                <div className="tg-404errorcontent">
                                    <h2>Ooops! Không có sách trong wishList</h2>
                                </div>
                                <div>
                                    <NavLink to="/product"><i className="fa fa-arrow-left"></i> Thêm sách nào</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main></>);
    }

    return (<>
        <section className="mb-5">
            <div className="container py-5 mb-3">
                <div className="row">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Danh sách yêu thích</h1>
                            <ol className="tg-breadcrumb">
                                <li><NavLink to={'/'}>Trang chủ</NavLink></li>
                                <li className="tg-active">Danh sách yêu thích</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {wishlistUI()}
                </div>
            </div>
        </section>
        <div style={{ color: 'white' }}>__</div>
    </>);
}