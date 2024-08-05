import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function VnPayCallback() {
    const params = useLocation();
    const navigate = useNavigate();
    const customerData = useSelector(state => state.customer.customerData);
    const token = useSelector(state => state.auth.token);

    const search = new URLSearchParams(params.search);
    const vnp_ResponseCode = search.get('vnp_ResponseCode')
    const locationVNP = useLocation();
    useEffect(() => {
        if (vnp_ResponseCode === '00') {
            axios.get(`http://127.0.0.1:8000/api/vnp/callback${locationVNP.search}`).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    navigate(res.data.url);
                    Swal.fire({
                        title: res.data.message,
                        icon: 'success'
                    });
                }
            }).catch((error) => console.log(error));
        }
    }, [token]);
}