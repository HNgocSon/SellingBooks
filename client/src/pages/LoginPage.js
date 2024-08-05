import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setLoading, loginHandler, setError } from "../reducers/authSlice";
import Swal from "sweetalert2";
import Header from "../components/header";
import { getCustomerData } from "../reducers/customerSlice";
import axios from "axios";


export default function LoginPage() {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.error);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const input_email = useRef();
    const input_password = useRef();
    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/auth/google', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => setLoginUrl(res.data.url))
            .catch((error) => console.log(error));
        if (token !== null) {
            Swal.fire({ title: "Đăng nhập thành công!", icon: "success" });
            navigate('/');
        }
    }, [token]);

    const handleLogin = (e) => {
        e.preventDefault();
        var email = input_email.current.value;
        var password = input_password.current.value;
        dispatch(setLoading());
        // Gọi API để xác thực thông tin đăng nhập
        dispatch(loginHandler({ email, password }));
        dispatch(setError());
        dispatch(getCustomerData());
    };

    const handleGoogleLogin = () => {
        window.location.href = loginUrl;
    }

    return (<>
        <Header />
        <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div><p></p></div>
                        <h1 className="text-center login-title">Đăng nhập</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form className="form-signin">
                                {errors === true ? <p className='text-danger'>* Email hoặc mật khẩu không đúng!</p> : ''}

                                <input type="email" className="form-control" placeholder="Nhập Email" required autoFocus ref={input_email} />
                                <p className={errors?.email?.length > 0 ? 'text-danger' : ''}>{errors?.email?.[0]}</p>

                                <input type="password" className="form-control" placeholder="Nhập Password" required ref={input_password} />
                                <p className={errors?.password?.length > 0 ? 'text-danger' : ''}>{errors?.password?.[0]}</p>

                                <button onClick={(e) => handleLogin(e)} className="btn btn-lg btn-primary btn-block lg-rgt-btn">
                                    Đăng nhập
                                </button>

                                <div className="social-auth-links text-center mt-2 mb-3" style={{ marginTop: '20px' }}>
                                    <a onClick={handleGoogleLogin} className="btn btn-block btn-danger btn-block lg-rgt-btn">
                                        <i className="fa fa-google-plus" style={{marginRight: '4px'}}></i> Đăng nhập bằng Google+
                                    </a>
                                </div>
                                <label className="checkbox pull-left">
                                    <input type="checkbox" value="remember-me" style={{ marginLeft: '2px' }} /> <span style={{ marginLeft: '18px' }}>Nhớ mật khẩu</span>
                                </label>
                                <NavLink to={'/forgot-password'} className="pull-right need-help">Quên mật khẩu?</NavLink><span className="clearfix"></span>
                            </form>
                        </div>
                        <NavLink to={'/register'} className="text-center new-account">Chưa có tài khoản?</NavLink>
                    </div>
                </div>
            </div>
        </div>
        <p style={{ color: 'white' }}>00</p>
        <Footer />
    </>)
}