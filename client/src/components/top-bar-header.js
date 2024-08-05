import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, logoutHandler, setUser } from "../reducers/authSlice";
import { deleteAll } from "../reducers/cartSlice";
import { deleteAllWishList } from "../reducers/wishListSlice";
import { deleteCustomer } from "../reducers/customerSlice";
import { deleteOrders } from "../reducers/orderSlice";

export default function TopBarHeader() {
    const customerData = useSelector(state => state.customer.customerData);
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(deleteCustomer());
        dispatch(logout()); 
    }

    const render = () => {
        if (token !== null) {
            return (<li>
                <a href="#" onClick={handleLogout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <em>Đăng xuất</em>
                </a>
            </li>);
        }
        else {
            return (<><li>
                <NavLink to="/login">
                    <i className="icon-envelope"></i>
                    <em> Đăng Nhập</em>
                </NavLink>
            </li>
                <li>
                    <NavLink to='/register'>
                        <i className="icon-location"></i>
                        <em>Đăng ký</em>
                    </NavLink>
                </li> </>);
        }
    }
    return (<>
        <div className="tg-topbar">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ul className="tg-addnav">
                            <li>
                                <a href="#">
                                    <i className="icon-envelope"></i>
                                    <em>Liên hệ</em>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="icon-question-circle"></i>
                                    <em>Cứu</em>
                                </a>
                            </li>
                           
                            {render()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </>);
}