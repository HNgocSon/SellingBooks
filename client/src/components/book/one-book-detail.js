import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import BookImg from "./book-img";
import OneBookAuthor from "./one-book-author";
import OneBookPrice from "./one-book-price";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../reducers/cartSlice";
import Swal from 'sweetalert2';
import Comment from "../comment/comment";
import RelatedBooks from "./related_books";
import Review from "../review";
import PDFView from "../pdf-view";
import { addToWishList, addComboToWishList } from "../../reducers/wishListSlice";
import { addBookToViewedBook, addComboToViewedBook } from "../../reducers/viewedBooksSlice";


export default function OneBookDetail(product) {
	const [saveId, setSaveId] = useState([]);
	const dispatch = useDispatch();

	//Thêm sản phẩm trong chi tiết vào danh sách đã xem
	useEffect(()=>{
		if(product.data?.book_type !== undefined){
			dispatch(addBookToViewedBook(product?.data));
		}else{
			dispatch(addComboToViewedBook(product?.data));
		}
	
	}, [])
	
	// Hàm thêm sản phẩm vào wishlist 
	const addWishList = () => {
		if (product.data?.book_type !== undefined) {
			dispatch(addToWishList(product.data));
		} else {
			dispatch(addComboToWishList(product.data));
		}
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
		dispatch(add(product.data));
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Sách đã được thêm vào giỏ hàng!",
			showConfirmButton: false,
			timer: 1500
		});
	}

	return (<>
		<div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<PDFView data={product.data.id} />
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
									<div className="tg-productdetail">
										<div className="row">
											<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
												<div className="tg-postbook">
													<figure className="tg-featureimg">
														<BookImg data={product.data.images} />
													</figure>
													<div className="tg-postbookcontent">
														<OneBookPrice data={product.data.unit_price} />
														{product.data.book_type === 0 && product.data.unit_price > 0 ?
															<>
																<ul className="tg-delevrystock">
																	<li><i className="icon-rocket"></i><span>Miễn phí vận chuyển toàn quốc</span></li>
																	<li><i className="icon-checkmark-circle"></i><span>Dispatch from the USA in 2 working days </span></li>
																	<li><i className="icon-store"></i><span>Trạng thái: <em>{product.data.quantity > 0 ? 'Còn hàng' : 'Đã hết hàng'}</em></span></li>
																</ul>
																<div className="tg-quantityholder">
																	<em className="minus">-</em>
																	<input type="text" className="result" value="1" id="quantity1" name="quantity" />
																	<em className="plus">+</em>
																</div>
																<button className="tg-btn tg-active tg-btn-lg" onClick={addToCart}>Thêm vào giỏ hàng</button>
																<a className="tg-btnaddtowishlist" href="#">
																	<span onClick={addWishList}>Thêm vào wishlist</span>
																</a>
															</> :
															product.data.book_type === 0 && product.data.unit_price <= 0 ?
																<><ul className="tg-delevrystock">
																	<li><i className="icon-rocket"></i><span>Miễn phí vận chuyển toàn quốc</span></li>
																	<li><i className="icon-checkmark-circle"></i><span>Dispatch from the USA in 2 working days </span></li>
																	<li><i className="icon-store"></i><span>Trạng thái: <em>{product.data.quantity > 0 ? 'Còn hàng' : 'Đã hết hàng'}</em></span></li>
																</ul>
																	<div className="tg-quantityholder">
																		<em className="minus">-</em>
																		<input type="text" className="result" value="1" id="quantity1" name="quantity" />
																		<em className="plus">+</em>
																	</div>
																	<a className="tg-btnaddtowishlist" href="#">
																		<span onClick={addWishList}>Thêm vào wishlist</span>
																	</a>
																</> :
																product.data.book_type === 1 ?
																	<>
																		<button className="tg-btn tg-active tg-btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg">Xem trước</button>
																		<a className="tg-btnaddtowishlist" href="#">
																			<span>Đọc online</span>
																		</a>
																	</> : <></>
														}
													</div>
												</div>
											</div>
											<div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
												<div className="tg-productcontent">
													<ul className="tg-bookscategories">
														<li><a href="#">{product.data.categories?.[0]?.name}</a></li>
													</ul>
													<div className="tg-themetagbox"><span className="tg-themetag">sale</span></div>
													<div className="tg-booktitle">
														<h3>{product.data.name}</h3>
													</div>
													<OneBookAuthor data={product.data.authors} />
													<span className="tg-stars"><span></span></span>
													<span className="tg-addreviews"><a href="#">Đánh giá </a></span>
													
													{/* <div className="tg-description">
														<p>{product.data.description} <a href="#">...</a></p>
													</div> */}
													<div className="tg-sectionhead">
														<h2>Thông tin sản phẩm</h2>
													</div>
													<ul className="tg-productinfo">
														<li><span>Mã hàng:</span><span>{product.data.code}</span></li>
														<li><span>Định dạng:</span><span>{product.data.format}</span></li>
														<li><span>Số trang:</span><span>{product.data.num_pages}</span></li>
														<li><span>Kích cỡ:</span><span>{product.data.size}</span></li>
														<li><span>Trọng lượng:</span><span>{product.data.weight} g</span></li>
														<li><span>Năm xuất bản:</span><span>{product.data.year}</span></li>
														<li><span>Nhà xuất bản:</span><span>{product.data.publisher?.name}</span></li>
														<li><span>Ngôn ngữ:</span><span>{product.data.language}</span></li>
														<li><span>Người phiên dịch:</span><span>{product.data.translator}</span></li>
													</ul>
												</div>
											</div>
											<div className="tg-productdescription">
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
																{product.data.description}
															</div>
														</div>
														<div role="tabpanel" className="tg-tab-pane tab-pane" id="comment">
															<div className="tg-description">
																<Comment id={product.data.id} isCombo={false} />
															</div>
														</div>
														<div role="tabpanel" className="tg-tab-pane tab-pane" id="review">
															<div className="tg-description">
																<Review id={product.data.id} overrate={product.data.overrate} isCombo={false} />
															</div>
														</div>
													</div>
												</div>
											</div>
											<RelatedBooks data={product.data.id} />
										</div>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 pull-left">
								{product.data.images?.map(item => (<div key={item} className="col-xs-7 col-md-7">
									<a href="#" className="thumbnail">
										<img src={`http://localhost:8000/` + item.front_cover} alt="Ảnh chi tiết sản phẩm" />
									</a>
								</div>))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main >
	</>)
}