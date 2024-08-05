import { useEffect, useState, useRef } from "react"
import axios from "axios";
import React from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { add, addCombo } from "../reducers/cartSlice";
import { addToWishList, addComboToWishList } from "../reducers/wishListSlice";
import Swal from 'sweetalert2';
import Footer from "../components/footer";
import Header from "../components/header";
import Banner from "../components/banner";

export default function CategoryProductPage() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [newPage, setNewPage] = useState(0);
    const [price, setPrice] = useState(false);
    const [filterText, setFilterText] = useState('tất cả thể loại');

    // Lấy tất cả các ô checkbox và thêm sự kiện change để thực hiện hàm tick
	let boxes = document.querySelectorAll("input[type=checkbox]");
	boxes.forEach(b => b.addEventListener("change", tick));

	// Hàm thực hiện việc giữ cho chỉ một checkbox được chọn tại một thời điểm
	function tick(e) {
		let state = e.target.checked; // Lưu trạng thái của ô checkbox đã thay đổi
		boxes.forEach(b => b.checked = false); // Xóa chọn tất cả các ô checkbox
		e.target.checked = state; // Khôi phục trạng thái của ô checkbox đã thay đổi
	}

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(response => response.data)
            .then(json => setListCategories(json.data))
            .catch((error) => { console.log(error) });
        axios.get(`http://127.0.0.1:8000/api/product/category/${params.id}`)
            .then(response => setBooks(response?.data.data[0]))
            .catch((error) => { console.log(error) })

    }, [filterText]);

    const handleReloadPage = (id, name) => {
        navigate(`/product/category/${id}`);
        window.location.reload(false);
        setFilterText(name);
    }

    const getAllbooks = async () => {
        try {
			const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${newPage}`);
			if (response?.data) {
				setBooks(response.data.data || []);

			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
    }

    // Tạo các phần tử thể loại sách từ danh sách thể loại
    const categoryItems = listCategories.map(item => (
        <li >
            <NavLink onClick={() => handleReloadPage(item.id, item.name)} key={item.id} >
                <span>{item.name}</span>
                <em>{item.books_count}</em>
            </NavLink>
        </li>
    ));

    // Hàm xử lý khi người dùng click vào một trang cụ thể
    const handlePageClick = ({ selected }) => {
        const nextPage = selected + 1;
        setNewPage(nextPage);
    };

    // Hàm thêm sản phẩm vào wishlist 
    const addWishList = (id) => {
        const result = books?.books?.find(item => item.id === id);
        if (result.book_type !== undefined) {
            dispatch(addToWishList(result));
        } else {
            dispatch(addComboToWishList(result));
        }
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đã thêm sách vào wishlist!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    //Hàm thêm sản phẩm vào giỏ hàng
    const addBookToCart = (id) => {
        const result = books?.books?.find(item => item.id === id);
        if (result.book_type !== undefined) {
            dispatch(add(result));
        } else {
            dispatch(addCombo(result));
        }
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đã thêm vào giỏ hàng!",
            showConfirmButton: false,
            timer: 1500
        });
    }

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

    const filterByPrice = (min, max) => {
        let filter = books?.books?.filter(item => item.unit_price >= min && item.unit_price < max);
        console.log(filter);
    }

    const bookItems = () => {
        const currentDate = new Date(); //Lấy ngày hiện tại
        return (books?.books?.map(book =>
        (<>
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                <div class="tg-postbook">
                    <figure class="tg-featureimg">
                        <div className="tg-bookimg">
                            {book?.images?.[0]?.front_cover !== undefined ?
                                <><div class="tg-frontcover"><img loading="lazy" style={{ width: '300px', height: '270px' }} src={`http://localhost:8000/` + book.images[0].front_cover} alt="image description" /></div>
                                    <div class="tg-backcover"><img loading="lazy" src={`http://localhost:8000/` + book.images[0].front_cover} alt="image description" /></div></> :
                                <><div class="tg-frontcover"><img loading="lazy" style={{ width: '300px', height: '270px' }} src={`http://localhost:8000/` + book.image} alt="image description" /></div>
                                    <div class="tg-backcover"><img loading="lazy" src={`http://localhost:8000/` + book.image} alt="image description" /></div></>}
                        </div>
                        <a class="tg-btnaddtowishlist" onClick={() => addWishList(book.id)} href="javascript:void(0);">
                            <i class="icon-heart"></i>
                            <span>Thêm vào wishlist</span>
                        </a>
                    </figure>
                    <div class="tg-postbookcontent">
                        {currentDate.toISOString().split('T')[0] < book?.discounts?.[0]?.end_date ? <><div class="tg-themetagbox"><span class="tg-themetag">Giảm {book?.discounts?.[0]?.percent} %</span></div></> : ''}
                        <div class="tg-booktitle">
                            <h3>{book?.book_type === 0 || book?.book_type === 1 ? <NavLink to={`/product/detail/${book.id}`} >{book.name}</NavLink> : <NavLink to={`/combo/detail/${book.id}`} >{book.name}</NavLink>}</h3>
                        </div>
                        {renderStars(book?.overrate)}
                        {book?.unit_price !== undefined ?
                            <><span className="tg-bookprice">
                                {currentDate.toISOString().split('T')[0] < book?.discounts?.[0]?.end_date ? <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price - (book?.discounts?.[0]?.percent * book.unit_price) / 100)}</ins>
                                    <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</del></> : <><ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</ins></>}
                            </span></> :
                            <><span className="tg-bookprice">
                                <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}</ins>
                            </span></>}
                        <div className="but">
                            <a class="tg-btn tg-btnstyletwo" onClick={() => addBookToCart(book.id)} href="javascript:void(0);">
                                <div className="btn">
                                    <i class="fa fa-shopping-basket"></i>
                                    <em>Thêm vào giỏ hàng</em>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )));
    }
    return (<>
        <Header />
        <Banner />
        <main id="tg-main" className="tg-main tg-haslayout">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div id="tg-twocolumns" className="tg-twocolumns">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
                                <div id="tg-content" className="tg-content">
                                    <div className="tg-products">
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 pull-left">
                                <aside id="tg-sidebar" className="tg-sidebar">
                                    <div className="tg-widget tg-catagories">
                                        <div className="tg-widgettitle">
                                            <h3>Thể loại</h3>
                                        </div>
                                        <div className="tg-widgetcontent">
                                            <ul>
                                                <li>
                                                    <a onClick={getAllbooks()} >
                                                        <span>Tất cả thể loại</span>
                                                        <em></em>
                                                    </a>
                                                </li>
                                                {categoryItems}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tg-widget tg-widgettrending">
                                        <div className="tg-widgettitle">
                                            <h3>Giá</h3>
                                        </div>
                                        <div className="tg-widgetcontent">
                                            <ul>
                                                <li><div className="price">
                                                    <input type="checkbox" onClick={() => filterByPrice(0, 150000)}></input>
                                                    <a >0đ - 150,000đ</a>
                                                </div>
                                                </li>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" onClick={() => filterByPrice(150000, 300000)}></input>
                                                        <a >150,000đ - 300,000đ</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" onClick={() => filterByPrice(300000, 500000)} ></input>
                                                        <a >300,000đ - 500,000đ</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" onClick={() => filterByPrice(500000, 700000)}></input>
                                                        <a >500,000đ - 700,000đ</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" onClick={() => filterByPrice(700000, Number.MAX_SAFE_INTEGER)}></input>
                                                        <a >700,000đ Trở lên</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tg-widget tg-widgettrending">
                                        <div className="tg-widgettitle">
                                            <h3>Loại sách</h3>
                                        </div>
                                        <div className="tg-widgetcontent">
                                            <ul>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" ></input>
                                                        <a>Sách in</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" ></input>
                                                        <a>E-book</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="price">
                                                        <input type="checkbox" ></input>
                                                        <a>Combo</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                            <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
                                <div id="tg-content" class="tg-content">
                                    <div class="tg-products">
                                        <div class="tg-sectionhead">
                                            <h2><span>Bạn vừa chọn</span>Lọc theo {filterText}</h2>
                                        </div>
                                        <div class="tg-productgrid">
                                            <div class="tg-refinesearch">
                                                <span>Hiển thị 9 sản phẩm mỗi trang</span>
                                                <form class="tg-formtheme tg-formsortshoitems">
                                                    <fieldset>
                                                        <div class="form-group">
                                                            <label>Sắp xếp:</label>
                                                            <span class="tg-select">
                                                                <select>
                                                                    <option value="asc">Từ A-Z</option>
                                                                    <option value="desc">Từ Z-A</option>
                                                                    <option value="priceAsc">Giá tăng dần</option>
                                                                    <option value="priceDesc">Giá giảm dần</option>
                                                                </select>
                                                            </span>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                            {books?.books?.length > 0 ? bookItems() : "Không tìm thấy sản phẩm!"}

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>);
}