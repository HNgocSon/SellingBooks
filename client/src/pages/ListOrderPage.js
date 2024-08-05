import ListOrders from "../components/list-orders";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getCustomerData } from "../reducers/customerSlice";
import { getOrders } from "../reducers/orderSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListOrderPage() {
    const navigation = useNavigate();
    const [status, setStatus] = useState(1);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const ordersData = useSelector(state => state.orders.orderData);
    const customerData = useSelector(state => state.customer.customerData);
    var id = customerData?.id;

    useEffect(() => {
        if (token === null) {
            navigation('/not-found');
            Swal.fire({ title: "Rấc tiếc!", text: "Phiên đăng nhập của bạn đã hết hạn!", icon: "danger" });
        }
        dispatch(getOrders({ id, token }));
    }, [id]);

    return (
        <>
            <Header />
            <ListOrders data={ordersData?.data} />
            <Footer />
        </>)
}