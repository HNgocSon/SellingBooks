import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { add } from "../../reducers/cartSlice";

export default function AddToCart(props) {
    const dispatch = useDispatch()
    // Hàm thêm sản phẩm vào giỏ hàng
	const addToCart = () => {
		dispatch(add(props.data));
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Sách đã được thêm vào giỏ hàng!",
			showConfirmButton: false,
			timer: 1500
		});
	}
    return (<>
        <a onClick={addToCart} className="tg-btn tg-btnstyletwo" href="#">
            <i className="fa fa-shopping-basket"></i>
            <em>Thêm vào giỏ hàng</em>
        </a></>)
}