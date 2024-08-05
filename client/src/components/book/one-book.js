import BookImg from "./book-img";
import OneBookAuthor from "./one-book-author";
import OneBookCategories from "./one-book-categories";
import OneBookPrice from "./one-book-price";
import OneBookRating from "./one-book-rating";
import OneBookThemeTag from "./one-book-theme-tag";
import OneBookTitle from "./one-book-title";
import AddToCart from "./add-to-cart";
import { NavLink } from "react-router-dom";
import AddToWishList from "./add-to-wish-list";

export default function OneBook(props) {
	const bookRender = () => {
		return (<>{
			props.data?.map(book => {
				return (<>
					<div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
						<div className="tg-postbook">
							<figure className="tg-featureimg">
								<BookImg data={book.images} />
								<AddToWishList data={book}/>
							</figure>
							<div className="tg-postbookcontent">
								<OneBookThemeTag />
								<OneBookTitle name={book.name} id={ book.id} />
								<OneBookPrice data={book.unit_price}/>
								<span className="tg-bookprice" >
									<ins style={{ fontSize: '2rem' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.unit_price)}</ins>
								</span>
								<AddToCart data={book}/>
							</div>
						</div>
					</div>
				</>);
			})
		}</>)
	}

	return (<>
		{bookRender()}
	</>);
}