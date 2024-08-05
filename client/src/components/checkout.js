import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteAll } from "../reducers/cartSlice";
import { setAddressData } from "../reducers/addressSlice";
import { getCustomerData } from "../reducers/customerSlice";
import { logout } from "../reducers/authSlice";

export default function Checkout() {
    var totalVNP = 0;
    const dispatch = useDispatch();
    const navigation = useNavigate()
    const input_Name = useRef(null);
    const input_address = useRef(null);
    const input_phone = useRef(null);
    const input_note = useRef(null);
    const input_country = useRef(null);
    const input_province = useRef(null);
    const input_district = useRef(null);

    const [nameErrors, setNameErrors] = useState([]);
    const [addressErrors, setAddressErrors] = useState([]);
    const [phoneErrors, setPhoneErrors] = useState([]);
    const [formatErrors, setFormatErrors] = useState([]);
    const [districtErrors, setDistrictErrors] = useState('');
    const [provinceErrors, setProvinceErrors] = useState('');


    const cartItems = useSelector(state => state.cart.carts);
    const userData = useSelector(state => state.customer.customerData);
    const address = useSelector(state => state.address.value);
    const token = useSelector(state => state.auth.token);

    const [dataProvince, setDataProvince] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedValue, setSelectedValue] = useState('cod');
    const [addressError, setAddressError] = useState([]);

    const params = useLocation();
    const navigate = useNavigate();

    const search = new URLSearchParams(params.search);
    const vnp_ResponseCode = search.get('vnp_ResponseCode');

    useEffect(() => {
        if (token === null) {
            navigation('/login');
            Swal.fire({
                title: "Rấc tiếc, Bạn cần đăng nhập để thực hiện thanh toán!",
                icon: "error"
            });
        }
        dispatch(getCustomerData(token));
        dispatch(setAddressData());
        setDataProvince(address);
        if (vnp_ResponseCode !== null) {
            axios.post(`http://127.0.0.1:8000/api/vnp/callback`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }, vnp_ResponseCode)
                .then((res) => {
                    if (res.data.success) {
                        navigate('/orders');
                        Swal.fire({
                            title: res.data.message,
                            icon: 'success'
                        });
                    } else {
                        navigate('/checkout');
                        Swal.fire({
                            title: res.data.message,
                            icon: 'error'
                        });
                    }
                }).catch((error) => console.log(error));
        }
    }, [token]);

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        if (userData && input_Name.current) {
            input_Name.current.value = userData.name;
        }
        if ( userData && input_phone.current) {
            input_phone.current.value = userData.phone;
        }

    }, [userData]);

    const handleProvinceChange = (event) => {
        if (event.target.value !== "") {
            const districts = dataProvince.filter(item => item.code == event.target.value);
            setDataDistrict(districts[0].districts);
            setSelectedProvince(event.target.value);
            setSelectedDistrict('');
            setProvinceErrors('');
        }else{
            setProvinceErrors('(*) Vui lòng chọn quận/huyện hợp lệ!')
        }

    };

    const handleDistrictChange = (event) => {
        if (event.target.value !== '') {
            setSelectedDistrict(event.target.value);
            setDistrictErrors('');
        } else {
            setDistrictErrors("(*) Vui lòng chọn quận/huyện hợp lệ!");
        }

    };
    //Xử lý thanh toán
    const handleCheckOut = async () => {

        if(input_province.current.options[selectedProvince]?.text === undefined){
            setProvinceErrors('(*) Vui lòng chọn tỉnh thành hợp lệ!')
            return;
        }
        
        if(input_district.current.value === ''){
            setDistrictErrors("(*) Vui lòng chọn quận/huyện hợp lệ!");
            return;
        }
        
        
        

        //Dữ liệu thanh toán
        const jsonOrders = {
            "customer_id": userData?.id,
            "name": input_Name.current.value,
            "address": input_address.current.value,
            "district": input_district.current.value,
            "province": input_province.current.options[selectedProvince]?.text,
            "country": input_country.current.value,
            "phone": input_phone.current.value,
            "shipping_fee": 45000,
            "note": input_note.current.value,
            "format": '',
            "book_id": [],
            "book_quantity": [],
            "combo_id": [],
            "combo_quantity": [],
            "book_price": [],
            "combo_price": [],
            "book_total": [],
            "combo_total": []
        }
        console.log(jsonOrders);
        //Duyệt để truyền dữ liệu từ cart lên server
        for (let i = 0; i < cartItems.length; i++) {
            if (!cartItems[i].isCombo) {
                jsonOrders.book_id[i] = cartItems[i].id;
                jsonOrders.book_quantity[i] = cartItems[i].quantity;
                jsonOrders.book_price[i] = cartItems[i].unit_price;
                jsonOrders.book_total[i] = cartItems[i].unit_price * cartItems[i].quantity;
            } else {
                jsonOrders.combo_id[i] = cartItems[i].comboId;
                jsonOrders.combo_quantity[i] = cartItems[i].quantity;
                jsonOrders.combo_price[i] = cartItems[i].unit_price;
                jsonOrders.combo_total[i] = cartItems[i].unit_price * cartItems[i].quantity;
            }
        }
        //Kiểm tra nếu khách hàng chọn thanh toán tiền mặt
        if (selectedValue === 'cod') {
            jsonOrders.format = "Thanh toán tiền mặt";
            axios.post(`http://127.0.0.1:8000/api/order`, jsonOrders, {
                headers: {
                    'Content-Type': "application/json",
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.success) {
                    Swal.fire({ title: response.data.message, text: "Đơn hàng của bạn đang chờ kiểm duyệt!", icon: "success" });
                    dispatch(deleteAll());
                    navigation('/product');
                    setNameErrors([]);
                    setAddressErrors([]);
                    setPhoneErrors([]);
                    setFormatErrors([]);
                    navigation('/orders');
                 } else {
                    Swal.fire({
                        title: "Đã xảy ra lỗi!",
                        text: response.data.message,
                        icon: "error"
                    });
                }
            }).catch(error => {
                //Kiểm tra nếu phiên đăng nhập của khách đã hết hạn thì chuyển sang trang login
                if (error.response.statusText === 'Unauthorized') {
                    dispatch(logout());
                    Swal.fire({
                        title: "Phiên đăng nhập của bạn đã hết hạn!",
                        text: "Vui lòng đăng nhập lại!",
                        icon: "error"
                    });
                    navigation('/login');
                } else if (error.response) {
                    // Nếu phiên đăng nhập chưa hết hạn thì kiểm tra tiếp dữ liệu đầu vào
                    setNameErrors(error.response.data.errors.name);
                    setAddressErrors(error.response.data.errors.address);
                    setPhoneErrors(error.response.data.errors.phone);
                    setFormatErrors(error.response.data.errors.format);
                    
                    Swal.fire({
                        title: "Đã xảy ra lỗi!",
                        text: "Vui lòng kiểm tra lại các thông tin đầu vào.",
                        icon: "error"
                    });
                }
            });
        } else {
            //Khách hàng chọn thanh toán online thì chuyển sang trang thanh toán vnpay
            jsonOrders.format = "Thanh toán online";
            axios.post(`http://127.0.0.1:8000/api/checkout-online`, jsonOrders, {
                headers: {
                    'Content-Type': "application/json",
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                //Xử lý thành thanh toán thành công
                if (response.data.success) {
                    dispatch(deleteAll()); //Xóa sản phẩm trong giỏ hàng
                    setNameErrors([]);  //Gán giá trị các trường validate thành rỗng
                    setAddressErrors([]);
                    setPhoneErrors([]);
                    setFormatErrors([]);
                    window.location.href = response.data.data; //Chuyển sang trang thanh toán vnpay
                }
            }).catch(error => {
                //Kiểm tra nếu phiên đăng nhập của khách đã hết hạn thì chuyển sang trang login
                if (error.response.statusText === 'Unauthorized') {
                    dispatch(logout());
                    Swal.fire({ title: "Phiên đăng nhập của bạn đã hết hạn!", text: "Vui lòng đăng nhập lại!", icon: "error" });
                    navigation('/login');
                } else if (error.response) {
                    //Nếu phiên đăng nhập chưa hết hạn thì kiểm tra tiếp dữ liệu đầu vào
                    setNameErrors(error.response.data.errors.name);
                    setAddressErrors(error.response.data.errors.address);
                    setPhoneErrors(error.response.data.errors.phone);
                    setFormatErrors(error.response.data.errors.format);
                }
            });
        }
     
   
    }
 
    //Hiển thị danh sách sản phẩm trong giỏ hàng bên thông tin đơn hàng
    const cartUI = () => {
        var total = 0;
        cartItems.map(item => total += item.unit_price * item.quantity);
        totalVNP = total;
        if (cartItems.length > 0) {
            return (<>
                {cartItems.map(item => {
                    return (<> <div key={item}className="form-group">
                        <div className="col-sm-3 col-xs-3">
                            <img className="img-responsive" src={`http://localhost:8000/` + item.image} />
                        </div>
                        <div className="col-sm-6 col-xs-6">
                            <div className="col-xs-12">{item.name}</div>
                            <div className="col-xs-12"><small>Số lượng:<span> {item.quantity}</span></small></div>
                        </div>
                        <div className="col-sm-3 col-xs-3 text-right">
                            <h6>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price)}</h6>
                        </div>
                    </div>
                        <div className="form-group"><hr /></div></>);
                })}
                <div className="form-group">
                    <div className="col-xs-12">
                        <strong>Tổng phụ:</strong>
                        <div className="pull-right"><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span></div>
                    </div>
                    <div className="col-xs-12">
                        <small>Phí ship:</small>
                        <div className="pull-right"><span><small>30.000 đ</small></span> </div>
                    </div>
                </div>
                <div className="form-group"><hr /></div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <strong>Tổng hóa đơn:</strong>
                        <div className="pull-right"><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + 30000)}</span></div>
                    </div>
                </div>
                <div className="form-group"><hr /></div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <div className="pull-right">
                            <button onClick={() => handleCheckOut()} className="btn btn-danger">Thanh toán</button>
                        </div>
                    </div>
                </div></>);
        }
    }

    return (<>
        <><div className="container wrapper">
            <div className="row cart-head">
                <div className="container">
                    <div className="row">
                        <div className="page-header">
                            <div>
                                <h1 className="page-title">Thanh toán</h1>
                                <ol className="tg-breadcrumb">
                                    <li><NavLink to={'/'}>Trang chủ</NavLink></li>
                                    <li><NavLink to={'/cart'}>Giỏ hàng</NavLink></li>
                                    <li className="tg-active">Thanh toán</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <p></p>
                    </div>
                </div>
            </div>
            <div className="row cart-body">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-push-6 col-sm-push-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            Thông tin đơn hàng <div className="pull-right"><small><NavLink className="afix-1" to="/cart">Sửa</NavLink></small></div>
                        </div>
                        <div className="panel-body">
                            {cartUI()}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6">
                    <div className="panel panel-info">
                        <div className="panel-heading"><i className="glyphicon glyphicon-home"></i> Địa chỉ giao hàng</div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-12 col-xs-12">
                                    <strong>Họ và tên:</strong>
                                    <input type="text" className="form-control" placeholder="Nhập họ và tên" ref={input_Name} />
                                </div>
                                <div class="text-danger">{nameErrors !== undefined ? nameErrors.map(item => '(*) ' + item) : ''}</div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Số điện thoại:</strong></div>
                                <div className="col-md-12"><input type="email" className="form-control" placeholder="Ví dụ: 0907133xxx(10 ký tự số)" ref={input_phone} /></div>
                                <div class="text-danger">{phoneErrors !== undefined ? phoneErrors.map(item => '(*) ' + item) : ''}</div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Quốc gia:</strong></div>
                                <div className="col-md-12">
                                    <select className="form-control" id="country" ref={input_country}>
                                        <option value="Việt Nam">Việt Nam</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Tỉnh/thành:</strong></div>
                                <div className="col-md-12">
                                    <select className="form-control" id="province" onChange={handleProvinceChange} ref={input_province} >
                                        <option value="" >
                                            Chọn tỉnh/thành phố
                                        </option>
                                        {dataProvince.map((province) => (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-danger msg_error_district">{provinceErrors !== '' ? provinceErrors : ''}</div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Quận/huyện:</strong></div>
                                <div className="col-md-12">
                                    <select className="form-control" id="district" ref={input_district} onChange={handleDistrictChange} disabled={selectedProvince === null}>
                                        <option value="" >
                                            Chọn Quận/huyện
                                        </option>
                                        {dataDistrict.map((district) => (
                                            <option key={district.code} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-danger msg_error_district">{districtErrors !== '' ? districtErrors : ''}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Địa chỉ:</strong></div>
                                <div className="col-md-12">
                                    <input type="text" className="form-control" placeholder="Ví dụ: Tên đường, số nhà, phường, xã..." ref={input_address} />
                                </div>
                                <div class="text-danger">{addressErrors !== undefined ? addressErrors.map(item => item) : ''}</div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Ghi chú (Nếu có):</strong></div>
                                <div className="col-md-12"><textarea className="form-control" placeholder="Ghi chú cho đơn hàng" ref={input_note}></textarea></div>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-info">
                        <div className="panel-heading"><span><i className="glyphicon glyphicon-lock"></i></span> Phương thức thanh toán</div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input type="radio"
                                        value="cod"
                                        checked={selectedValue === 'cod'}
                                        onChange={handleRadioChange}
                                    /> Thanh toán khi nhận hàng (COD) <br />
                                    <input type="radio"
                                        value="vn_pay"
                                        checked={selectedValue === 'vn_pay'}
                                        onChange={handleRadioChange}
                                    /> Thanh toán VNpay
                                    <div class="text-danger">{formatErrors !== undefined ? formatErrors.map(item => '(*) ' + item) : ''}</div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row cart-footer">
            </div>
        </div></>
    </>)
}   