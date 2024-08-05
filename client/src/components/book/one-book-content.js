import AddToCart from "./add-to-cart";
import OneBookAuthor from "./one-book-author";
import OneBookCategories from "./one-book-categories";
import OneBookPrice from "./one-book-price";
import OneBookRating from "./one-book-rating";
import OneBookThemeTag from "./one-book-theme-tag";
import OneBookTitle from "./one-book-title";

export default function OneBookContent(props) {
    return (<>
        <div className="tg-postbookcontent">
            <OneBookCategories data={props.data}/>
            <OneBookThemeTag data={props.data}/>
            <OneBookTitle data={props.data}/>
            <OneBookAuthor data={props.data}/>
            <OneBookRating data={props.data}/>
            <OneBookPrice data={props.data}/>
            <AddToCart />
        </div>
    </>);
}