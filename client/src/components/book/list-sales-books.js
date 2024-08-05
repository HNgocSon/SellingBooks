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
import { add } from "../../reducers/cartSlice";
import ReactPaginate from 'react-paginate';

export default function Sales() {
    const [salesBooks, setSalesBooks] = useState([]);
    const dispatch = useDispatch();
	const [newPage, setNewPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sales-books`)
            .then(res => setSalesBooks(res.data.data))
            .catch(error => console.log(error));
    }, []);

	const handlePageClick = ({ selected }) => {
		const nextPage = selected + 1;
		setNewPage(nextPage);
	};

useEffect(() => {
		const fetchData = async () => {
			try {
				let url = `http://127.0.0.1:8000/api/sales-books?page=${newPage}`;
				//console.log(selectedCategory);
			
			
                const response = await axios.get(url);
				if (response?.data) {
					if (response?.data?.data?.[0] !== undefined) {
						setSalesBooks(response.data.data || []);
						setTotalPages(response.data.total_pages || 0);
					} else {
						setSalesBooks(Object.values(response.data.data) || []);
						setTotalPages(response.data.total_pages || 0);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [newPage]);

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
        dispatch(addComboToWishList(book));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sách đã được thêm vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <section className="tg-parallax tg-bgcalltoaction tg-haslayout" data-z-index="-100" data-appear-top-offset="600" data-parallax="scroll" data-image-src="images/parallax/bgparallax-06.jpg">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="tg-calltoaction">
                                <h2>Sách đang giảm giá</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 style={{ color: 'white' }}>Sách đang giảm giá</h6>
                        <div className="row">
                            {salesBooks?.map(book => {
                                return (
                                    <div key={book.id || book} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
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
                                                    <div className="tg-themetagbox">
                                                        <span className="tg-themetag">Giảm {book?.percent} %</span>
                                                    </div>
                                                    <div className="tg-booktitle">
                                                        <h3>
                                                            <NavLink to={`/product/detail/${book?.book?.id}`}>{book?.book?.name}</NavLink>
                                                        </h3>
                                                    </div>
                                                    <span className="tg-stars"><span></span></span>
                                                    <span className="tg-bookprice">
                                                        <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.unit_price - (book?.percent * book?.book?.unit_price) / 100)}</ins>
                                                        <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.book?.unit_price)}</del>
                                                    </span>
                                                    <a onClick={() => addToCart(book?.book)} className="tg-btn tg-btnstyletwo">
                                                        <i className="fa fa-shopping-basket"></i>
                                                        <em>Thêm vào giỏ hàng</em>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
										<ReactPaginate
						nextLabel="Sau >"
						onPageChange={handlePageClick}
						pageCount={totalPages}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						previousLabel="< Trước"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						containerClassName="pagination"
						activeClassName="active"
						renderOnZeroPageCount={null}
					/>
                                    </div>
									
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}