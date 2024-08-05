import { useEffect, useState, useRef } from "react"
import axios from "axios";
import React from 'react'
import { NavLink } from "react-router-dom";
import OneBookPrice from "../book/one-book-price";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { add, addCombo } from "../../reducers/cartSlice";
import { addToWishList, addComboToWishList } from "../../reducers/wishListSlice";
import Swal from 'sweetalert2';

export default function SidebarCategories(props) {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.carts);
	const wishLists = useSelector((state) => state.wishList.wishListItem);
	// Lấy tất cả các ô checkbox và thêm sự kiện change để thực hiện hàm tick
	let boxes = document.querySelectorAll("input[type=checkbox]");
	boxes.forEach(b => b.addEventListener("change", tick));

	// Hàm thực hiện việc giữ cho chỉ một checkbox được chọn tại một thời điểm
	function tick(e) {
		let state = e.target.checked; // Lưu trạng thái của ô checkbox đã thay đổi
		boxes.forEach(b => b.checked = false); // Xóa chọn tất cả các ô checkbox
		e.target.checked = state; // Khôi phục trạng thái của ô checkbox đã thay đổi
	}
	// State và effect hooks để quản lý danh sách thể loại sách và các thông tin liên quan
	const [listCategories, setListCategories] = useState([]); // Danh sách thể loại sách
	const [selectedCategory, setSelectedCategory] = useState(null); // Thể loại đang được chọn
	const [filteredBooks, setFilteredBooks] = useState([]); // Danh sách sách sau khi lọc
	const [minPrice, setMinPrice] = useState(0); // Giá sách tối thiểu
	const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER); // Giá sách tối đa
	const [totalPages, setTotalPages] = useState(0);
	const [newPage, setNewPage] = useState(0);
	const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
	const [selectedType, setSelectedType] = useState(null); // Loại sách đang được chọn

	// Khai báo state và hàm để lựa chọn thứ tự sắp xếp sách
	const [sortOrder, setSortOrder] = useState("asc");
	const handleSortChange = (value) => {
		setSortOrder(value);
		let sortedBooks = [...filteredBooks];
		// Sắp xếp sách dựa trên thứ tự đã chọn
		if (value === "asc") {
			sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
		} else if (value === "desc") {
			sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
		} else if (value === "priceAsc") {
			sortedBooks.sort((a, b) => a.unit_price - b.unit_price);
		} else if (value === "priceDesc") {
			sortedBooks.sort((a, b) => b.unit_price - a.unit_price);
		} else if (value === "ebook") {
			sortedBooks.filter(item => item.book_type === 1);
		}
		setFilteredBooks(sortedBooks);
	};
	// useEffect hook để thêm sự kiện change cho tất cả các ô checkbox khi component được render
	useEffect(() => {
		let boxes = document.querySelectorAll("input[type=checkbox]");
		boxes.forEach(b => b.addEventListener("change", tick));
		return () => {
			boxes.forEach(b => b.removeEventListener("change", tick));
		};
	}, []);
	// useEffect hook để fetch danh sách thể loại từ API khi component được render
	useEffect(() => {
		axios.get('http://127.0.0.1:8000/api/category')
			.then(response => response.data)
			.then(json => setListCategories(json.data))
			.catch(error => console.log(error));
	}, []);

	const handleBookClick = async () => {
		setNewPage(1); // Set lại trang là 1
		setSelectedCategory(null); // Đặt lại thể loại là rỗng
		setMinPrice(0); // Set giá nhỏ nhất là 0
		setMaxPrice(Number.MAX_SAFE_INTEGER); // Set giá lớn nhất
		setSelectedPriceRange({ min: 0, max: Number.MAX_SAFE_INTEGER });
		try {
			const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${newPage}`);
			if (response?.data) {
				setFilteredBooks(response.data.data || []);
				setTotalPages(response.data.total_pages || 0);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const bookTypeClickHandler = async (type) => {
		
		setNewPage(1); // Set lại trang là 1
		setSelectedCategory(null); // Đặt lại thể loại là rỗng
		setMinPrice(0); // Set giá nhỏ nhất là 0
		setMaxPrice(Number.MAX_SAFE_INTEGER); // Set giá lớn nhất
		setSelectedType(type);
		try {
			const response = await axios.get(`http://127.0.0.1:8000/api/filter-books-by-type/${type}?page=${newPage}`);
			if (response?.data) {
				if (response?.data.data[0].book_type === 0 || response?.data.data[0].book_type == 1) {
					setFilteredBooks(response.data.data || []);
					setTotalPages(response.data.total_pages || 0);
				} else {
					setFilteredBooks(Object.values(response.data.data) || []);
					setTotalPages(response.data.total_pages || 0);
				}
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	// Hàm xử lý khi người dùng click vào một thể loại sách cụ thể
	const handleCategoryClick = async (categoryId) => {
		
	  const scrollPosition = window.scrollY; // Lưu vị trí cuộn hiện tại
    
    setNewPage(1);
    setSelectedCategory(categoryId);
    setSelectedPriceRange({ min: 0, max: Number.MAX_SAFE_INTEGER });

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/filter-books-by-category/${categoryId}?page=${newPage}`);
        if (response?.data) {
            // Xử lý dữ liệu từ API
            setFilteredBooks(response.data.data || []);
            setTotalPages(response.data.total_pages || 0);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        window.scrollTo(0, scrollPosition); // Khôi phục lại vị trí cuộn
    }
	};

	// Hàm xử lý khi người dùng thay đổi khoảng giá sách
	const handlePriceRangeChange = async (min, max) => {
		setMinPrice(min);
		setMaxPrice(max);
		setNewPage(1);
		setSelectedCategory(null);
		setSelectedPriceRange({ min, max });
	};

	// Hàm xử lý khi người dùng click vào một trang cụ thể
	const handlePageClick = ({ selected }) => {
		const nextPage = selected + 1;
		setNewPage(nextPage);
	};
	// useEffect hook để fetch dữ liệu sách dựa trên các thay đổi trong trạng thái
	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = `http://127.0.0.1:8000/api/books?page=${newPage}`;
				//console.log(selectedCategory);
				if (selectedCategory) {
					url = `http://127.0.0.1:8000/api/filter-books/${selectedCategory}?page=${newPage}`;
				} else if (selectedPriceRange.min !== 0 || selectedPriceRange.max !== Number.MAX_SAFE_INTEGER) {
					url = `http://127.0.0.1:8000/api/filter-books-by-price/${selectedPriceRange.min}/${selectedPriceRange.max}?page=${newPage}`;
				} else if (selectedType !== null) {
					url = `http://127.0.0.1:8000/api/filter-books-by-type/${selectedType}?page=${newPage}`
				}
				const response = await axios.get(url);
				if (response?.data) {
					if (response?.data?.data?.[0]?.book_type !== undefined) {
						setFilteredBooks(response.data.data || []);
						setTotalPages(response.data.total_pages || 0);
					} else {
						setFilteredBooks(Object.values(response.data.data) || []);
						setTotalPages(response.data.total_pages || 0);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [selectedCategory, selectedPriceRange, selectedType, newPage]);

	// Tạo các phần tử thể loại sách từ danh sách thể loại
	const categoryItems = listCategories.map(item => (
		<li key={item.id}>
			<a href="#"  onClick={() => handleCategoryClick(item.id)}>
				<span>{item.name}</span>
				<em>{item.books_count}</em>
			</a>
		</li>
	));

	// Hàm thêm sản phẩm vào wishlist 
	const addWishList = (id) => {
		const result = filteredBooks.find(item => item.id === id);
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
		const result = filteredBooks.find(item => item.id === id);
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


	const bookItems = () => {
		const currentDate = new Date(); //Lấy ngày hiện tại
		return (filteredBooks.map(book =>
		(<>
			<div key={book.id} class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
				<div class="tg-postbook">
					<figure class="tg-featureimg">
						<div className="tg-bookimg">
							{book?.images?.[0]?.front_cover !== undefined ?
								<><div class="tg-frontcover"><img loading="lazy" style={{ width: '300px', height: '270px' }} src={`http://localhost:8000/` + book.images[0].front_cover} alt="image description" /></div>
									<div class="tg-backcover"><img loading="lazy" src={`http://localhost:8000/` + book.images[0].front_cover} alt="image description" /></div></> :
								<><div class="tg-frontcover"><img loading="lazy" style={{ width: '300px', height: '270px' }} src={`http://localhost:8000/` + book.image} alt="image description" /></div>
									<div class="tg-backcover"><img loading="lazy" src={`http://localhost:8000/` + book.image} alt="image description" /></div></>}
						</div>
						<a class="tg-btnaddtowishlist" onClick={() => addWishList(book.id)} href="#">
							<i class="icon-heart"></i>
							<span>Thêm vào wishlist</span>
						</a>
					</figure>
					<div class="tg-postbookcontent">
						{currentDate.toISOString().split('T')[0] < book?.discounts?.[0]?.end_date ? <><div class="tg-themetagbox"><span class="tg-themetag">Giảm {book?.discounts?.[0]?.percent} %</span></div></> : ''}
						<div class="tg-booktitle">
							<h3>{book?.book_type === 0 || book?.book_type === 1 ? <NavLink to={`detail/${book.id}`} >{book.name}</NavLink> : <NavLink to={`/combo/detail/${book.id}`} >{book.name}</NavLink>}</h3>
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
							<a class="tg-btn tg-btnstyletwo" onClick={() => addBookToCart(book.id)} href="#">
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
		<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 pull-left">
			<aside id="tg-sidebar" className="tg-sidebar">
				<div className="tg-widget tg-catagories">
					<div className="tg-widgettitle">
						<h3>Thể loại</h3>
					</div>
					<div className="tg-widgetcontent">
						<ul>
							<li>
								<a href="#" onClick={() => handleCategoryClick()}>
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
								<input onClick={() => handlePriceRangeChange(0, 150000)} type="checkbox" ></input>
								<a onClick={() => handlePriceRangeChange(0, 150000)}>0đ - 150,000đ</a>
							</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(150000, 300000)} type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(150000, 300000)}>150,000đ - 300,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(300000, 500000)} type="checkbox"  ></input>
									<a onClick={() => handlePriceRangeChange(300000, 500000)}>300,000đ - 500,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(500000, 700000)} type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(500000, 700000)}>500,000đ - 700,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(700000, Number.MAX_SAFE_INTEGER)} type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(700000, Number.MAX_SAFE_INTEGER)}>700,000đ Trở lên</a>
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
									<input type="checkbox" onClick={() => bookTypeClickHandler(0)}></input>
									<a>Sách in</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input type="checkbox" onClick={() => bookTypeClickHandler(1)}></input>
									<a>E-book</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input type="checkbox" onClick={() => bookTypeClickHandler(2)}></input>
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
						<h2><span>Bạn vừa chọn</span>Lọc theo thể loại</h2>
					</div>
					<div class="tg-productgrid">
						<div class="tg-refinesearch">
							<span>Hiển thị 9 sản phẩm mỗi trang</span>
							<form class="tg-formtheme tg-formsortshoitems">
								<fieldset>
									<div class="form-group">
										<label>Sắp xếp:</label>
										<span class="tg-select">
											<select onChange={(e) => handleSortChange(e.target.value)}>
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
						{filteredBooks.length > 0 ? bookItems() : "Không tìm thấy sản phẩm!"}

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
	</>);
}