
import { useDispatch } from "react-redux";
import { addCombo } from "../../reducers/cartSlice";
import Swal from 'sweetalert2';
import Comment from "../comment/comment";
import RelatedBooks from "../book/related_books";
import Review from "../review";
import PDFView from "../pdf-view";
import { addComboToWishList } from "../../reducers/wishListSlice";
import { addComboToViewedBook } from "../../reducers/viewedBooksSlice";
import OneBookPrice from "../book/one-book-price";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function ComboDetail(props) {

    const { id } = useParams();
    const [comBoDetail, setComBoDetail] = useState(null);

    const dispatch = useDispatch();
    //Thêm sản phẩm trong chi tiết vào danh sách đã xem
    dispatch(addComboToViewedBook(props?.data));
    // Hàm thêm sản phẩm vào wishlist 
    const addWishList = () => {
        dispatch(addComboToWishList(props.data));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đã thêm sách vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    
    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = () => {
        dispatch(addCombo(props.data));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào giỏ hàng!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/combo/detail/${id}`)
            .then((res) => {
                console.log(res.data.data); // Kiểm tra dữ liệu
                setComBoDetail(res.data.data);
            })
            .catch((error) => console.log(error));
    }, [id]);
 
    const listComboBooks = () => {
        if (comBoDetail && comBoDetail.books && comBoDetail.books.length > 0) {
            return (
                <>
                    {comBoDetail.books.map(item => ( 
                        <li>{item.name}</li>
                    ))}
                </>
            );
        } else {
            return <p>Không có dữ liệu</p>;
        }
    };
    

    return (<>
        <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <PDFView data={props.data.id} />
                </div>
            </div>
        </div>
        <main id="tg-main" className="tg-main tg-haslayout">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div id="tg-twocolumns" className="tg-twocolumns">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
                                <div id="tg-content" className="tg-content">
                                    <div className="tg-propsdetail">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                                <div className="tg-postbook">
                                                    <figure className="tg-featureimg">
                                                        <div className="tg-bookimg">
                                                            <div className="tg-frontcover"><img src={`http://localhost:8000/` + props?.data?.image} alt="image description" style={{ height: '250px' }} /></div>
                                                            <div className="tg-backcover"><img src={`http://localhost:8000/` + props?.data?.image} alt="image description" style={{ height: '250px' }} /></div>
                                                        </div>
                                                    </figure>
                                                    <div className="tg-postbookcontent">
                                                        <OneBookPrice data={props.data.price} />
                                                        <ul className="tg-delevrystock">
                                                            <li><i className="icon-rocket"></i><span>Miễn phí vận chuyển toàn quốc</span></li>
                                                            <li><i className="icon-checkmark-circle"></i><span>Dispatch from the USA in 2 working days </span></li>
                                                            <li><i className="icon-store"></i><span>Trạng thái: <em>{props.data.quantity > 0 ? 'Còn hàng' : 'Đã hết hàng'}</em></span></li>
                                                        </ul>
                                                        <div className="tg-quantityholder">
                                                            <em className="minus">-</em>
                                                            <input type="text" className="result" value="1" id="quantity1" name="quantity" />
                                                            <em className="plus">+</em>
                                                        </div>
                                                        <a className="tg-btn tg-active tg-btn-lg" onClick={addToCart} href="javascript:void(0);">Thêm vào giỏ hàng</a>
                                                        <a className="tg-btnaddtowishlist" onClick={addWishList} href="javascript:void(0);">
                                                            <span>Thêm vào wishlist</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                                <div className="tg-propscontent">
                                                    <ul className="tg-bookscategories">
                                                        <li><a href="javascript:void(0);">Combo sách</a></li>
                                                    </ul>
                                                    <div className="tg-themetagbox"><span className="tg-themetag">Giảm 20%</span></div>
                                                    <div className="tg-booktitle">
                                                        <h3>{props.data.name}</h3>
                                                    </div>
                                                    <span className="tg-stars"><span></span></span>
                                                    <span className="tg-addreviews"><a href="javascript:void(0);">Đánh giá </a></span>
                                                    <div className="tg-share">
                                                        <span>Share:</span>
                                                        <ul className="tg-socialicons">
                                                            <li className="tg-facebook"><a href="javascript:void(0);"><i className="fa fa-facebook"></i></a></li>
                                                            <li className="tg-twitter"><a href="javascript:void(0);"><i className="fa fa-twitter"></i></a></li>
                                                            <li className="tg-linkedin"><a href="javascript:void(0);"><i className="fa fa-linkedin"></i></a></li>
                                                            <li className="tg-googleplus"><a href="javascript:void(0);"><i className="fa fa-google-plus"></i></a></li>
                                                            <li className="tg-rss"><a href="javascript:void(0);"><i className="fa fa-rss"></i></a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="tg-sectionhead">
                                                        <h2>Thông tin sản phẩm</h2>
                                                    </div>
                                                    <ul className="tg-propsinfo">
                                              
                                                    {listComboBooks()}

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="tg-propsdescription">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div className="tg-sectionhead">
                                                        <h2>Mô tả & Bình luận về sách</h2>
                                                    </div>
                                                    <ul className="tg-themetabs" role="tablist">
                                                        <li role="presentation" className="active"><a href="#description" data-toggle="tab">Mô tả</a></li>
                                                        <li role="presentation"><a href="#comment" data-toggle="tab">Bình luận</a></li>
                                                        <li role="presentation"><a href="#review" data-toggle="tab">Đánh giá</a></li>
                                                    </ul>
                                                    <div className="tg-tab-content tab-content">
                                                        <div role="tabpanel" className="tg-tab-pane tab-pane active" id="description">
                                                            <div className="tg-description">
                                                                Không có mô tả
                                                            </div>
                                                        </div>
                                                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="comment">
                                                            <div className="tg-description">
                                                                <Comment id={props.data.id} isCombo={true} />
                                                            </div>
                                                        </div>
                                                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="review">
                                                            <div className="tg-description">
                                                                <Review id={props.data.id} overrate={props.data.overrate} isCombo={true} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <RelatedBooks data={props.data.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </main >
    </>)
}