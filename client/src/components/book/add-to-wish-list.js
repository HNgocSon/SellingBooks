import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addToWishList } from "../../reducers/wishListSlice";

export default function AddToWishList(props) {
    const dispatch = useDispatch();

    const addWishList = () => {
		dispatch(addToWishList(props.data));
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Sách đã được thêm vào giỏ hàng!",
			showConfirmButton: false,
			timer: 1500
		});
	}
    
    return (<>
        <a className="tg-btnaddtowishlist" href="javascript:void(0);">
            <i className="icon-heart"></i>
            <span onClick={addWishList}>Thêm vào wishlist</span>
        </a>
    </>);
}