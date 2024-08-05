import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../reducers/authSlice";
import { setCustomer } from "../reducers/customerSlice";

export default function GoogleCallback() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/auth/google/callback${location.search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    function customerData() {
        axios.get(`http://127.0.0.1:8000/api/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.access_token,
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data);
            });
    }

    if (loading) {
        return false;
    } else {
        if (user != null) {
            return false;
        } else {
            dispatch(setCustomer(user));
            dispatch(setToken(data.access_token));
            navigation('/')
        }
    }
}