import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteCustomer, getCustomerData } from "../../reducers/customerSlice";
import { logout } from "../../reducers/authSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    var token = useSelector(state => state.auth.token);
    const customer = useSelector(state => state.customer.customerData);

    const [orderData, setOrderData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [nameErrors, setNameErrors] = useState([]);
    const [addressErrors, setAddressErrors] = useState([]);
    const [phoneErrors, setPhoneErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [imageErrors, setImageErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const input_name = useRef();
    const input_address = useRef();
    const input_email = useRef();
    const input_phone = useRef();
    const input_password = useRef();
    const input_newPassword = useRef();
    const input_confirmPassword = useRef();

    useEffect(() => {
        if (token === null) {
            navigation('/login');
            Swal.fire({ title: "Rấc tiếc!", text: "Bạn cần đăng nhập để thực hiện chức năng này!", icon: "error" });
        }
        dispatch(getCustomerData(token));
    }, [token]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Kiểm tra định dạng file
        if (file && (file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            setSelectedFile(file);
        } else {
            Swal.fire({ title: "Lỗi file!", text: "Chỉ chấp nhận file có đuôi jpg, png, jpeg", icon: "error" });
        }
    }

    const updateInfo = () => {
        const formData = new FormData();
        formData.append('name', input_name.current.value)
        formData.append('address', input_address.current.value)
        formData.append('email', input_email.current.value)
        formData.append('phone', input_phone.current.value)
        if (isChecked) {
            if (input_confirmPassword.current.value == input_newPassword.current.value && input_newPassword.current.value !== '') {
                formData.append('password', input_newPassword.current.value);
                formData.append('oldPassword', input_password.current.value);
                setIsChecked(false);
            } else {
                Swal.fire({ title: "Mật khẩu xác nhận không đúng!", text: "Vui lòng xem lại mật khẩu mới và mật khẩu xác nhận!", icon: "error" });
                return;
            }
        }
        if (selectedFile !== null) {
            formData.append('image', selectedFile)
        }
        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/update-info/${customer.id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
            data: formData
        }).then(response => {
            if (response.data.success) {
                Swal.fire({ title: "Cập nhật thành công!", text: response.data.message, icon: "success" });
                dispatch(getCustomerData(token)); 
                setNameErrors([]);
                setEmailErrors([]);
                setAddressErrors([]);
                setImageErrors([]);
                setPhoneErrors([]);
                setPasswordErrors([]);
            } else {
                Swal.fire({ title: "Mật khẩu cũ không trùng khớp!", text: response.data.message, icon: "error" });
            }
        }).catch((error) => {
            //Kiểm tra hết phiên đăng nhập
            if(error.response.statusText === 'Unauthorized'){
                dispatch(deleteCustomer()); //Xóa dữ liệu khách hàng hiện tại
                dispatch(logout());
                Swal.fire({ title: "Phiên đăng nhập của bạn đã hết hạn!", text: "Vui lòng đăng nhập lại!", icon: "error" });
                navigation('/login');
            }else if (error.response) {
                setNameErrors(error.response.data.errors.name);
                setEmailErrors(error.response.data.errors.email);
                setAddressErrors(error.response.data.errors.address);
                setImageErrors(error.response.data.errors.image);
                setPhoneErrors(error.response.data.errors.phone);
                setPasswordErrors(error.response.data.errors.password);
            } else {
                console.error('Network error:', error.message);
            }
        });
    }

    const changePassword = () => {
        return (<>
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0 " style={{ fontWeight: 'bold' }}>Mật khẩu hiện tại</p>
                </div>
                <div className="col-sm-9">
                    <div className="form-group">
                        <input type="password" className='form-control' ref={input_password} />
                    </div>
                    <div class="text-danger"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Mật khẩu mới</p>
                </div>
                <div className="col-sm-9">
                    <div className="form-group">
                        <input type="password" className='form-control' ref={input_newPassword} />
                    </div>
                    <div class="text-danger">{passwordErrors !== undefined ? passwordErrors.map(item => '(*) ' + item) : ''}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Xác nhận mật khẩu mới</p>
                </div>
                <div className="col-sm-9">
                    <div className="form-group">
                        <input type="password" className='form-control' ref={input_confirmPassword} />
                    </div>
                    <div class="text-danger"></div>
                </div>
            </div>
        </>);
    }

    return (<><section >
        <div className="container py-5 mb-3">
            <div className="row">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Thông tin tài khoản</h1>
                        <ol className="tg-breadcrumb">
                            <li><NavLink to={'/'}>Trang chủ</NavLink></li>
                            <li className="tg-active">Thông tin tài khoản</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={`http://localhost:8000/` + customer?.image} alt="avatar"
                                className="rounded-circle img-fluid" style={{ width: '150px', height: '150px' }} />
                            <h5 className="my-3" style={{ fontWeight: 'bold' }}>Ảnh đại diện</h5>
                            <div className="form-group row">
                                <div class="text-danger"><ul>{imageErrors !== undefined ? imageErrors.map(item => <li>{item}</li>) : ''}</ul></div>
                                <div className="fileinput fileinput-new input-group " data-provides="fileinput">
                                    <div className="form-control" data-trigger="fileinput">
                                        <i className="glyphicon glyphicon-file fileinput-exists"></i>
                                        <span className="fileinput-filename"></span>
                                    </div>
                                    <button className="input-group-addon btn btn-default btn-file">
                                        <span className="fileinput-new">Chọn ảnh</span>
                                        <span className="fileinput-exists">Thay đổi</span>
                                        <input id="fileupload1" onChange={handleFileChange} className="custom-file-input" type="file" />
                                    </button>
                                    <a href="#" className="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                </div>
                                <NavLink to='/orders'>Hóa đơn của bạn</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Họ tên</p>
                                </div>
                                <div className="col-sm-9">
                                    <div className="form-group">
                                        <input type="text" className="form-control" defaultValue={customer?.name} ref={input_name} />
                                    </div>
                                    <div className="text-danger"><ul>{nameErrors !== undefined ? nameErrors.map(item => <li>{item}</li>) : ''}</ul></div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <div className="form-group">
                                        <input type="email" className="form-control" defaultValue={customer?.email} ref={input_email} />
                                    </div>
                                    <div className="text-danger"><ul>{emailErrors !== undefined ? emailErrors.map(item => <li>{item}</li>) : ''}</ul></div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Số điện thoại</p>
                                </div>
                                <div className="col-sm-9">
                                    <div className="form-group">
                                        <input type="text" className="form-control" defaultValue={customer?.phone} ref={input_phone} />
                                    </div>
                                    <div className="text-danger"><ul>{phoneErrors !== undefined ? phoneErrors.map(item => <li>{item}</li>) : ''}</ul></div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}>Địa chỉ</p>
                                </div>
                                <div className="col-sm-9">
                                    <div className="form-group">
                                        <input type="text" className="form-control" defaultValue={customer?.address} ref={input_address} />
                                    </div>
                                    <div className="text-danger"><ul>{addressErrors !== undefined ? addressErrors.map(item => <li>{item}</li>) : ''}</ul></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3">

                                </div>
                                <div className="col-sm-9">
                                    <div className="form-group">
                                        <input type='checkbox' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className='update-password ' />
                                        <span style={{ fontWeight: 'bold' }}> Đổi mật khẩu</span>
                                    </div>
                                </div>
                            </div>
                            {
                                isChecked && (changePassword())
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger" onClick={updateInfo}>Lưu thông tin</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <div style={{ color: 'white' }}>00</div>
    </>);
}