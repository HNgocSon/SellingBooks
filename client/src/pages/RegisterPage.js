import { useEffect, useRef, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { handleRegister, setRegisterErrors, setRegisterSuccess } from "../reducers/customerSlice";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const successMsg = useSelector(state => state.customer.message);
    const successRegister = useSelector(state => state.customer.registerSuccess);
    const errors = useSelector(state => state.customer.registerErrors)
    const navigate = useNavigate();
    const input_name = useRef();
    const input_email = useRef();
    const input_password = useRef();
    const input_confirm_password = useRef();

    useEffect(() => {
        if (successRegister) {
            Swal.fire({ title: successMsg, icon: "success" });
            navigate('/login');
            dispatch(setRegisterSuccess());
            dispatch(setRegisterErrors());
        }
    }, [successRegister]);

    const registerHandler = (e) => {
        e.preventDefault();
        let data = {
            name: input_name.current.value,
            email: input_email.current.value,
            password: input_password.current.value,
            confirm_password: input_confirm_password.current.value
        };
        dispatch(handleRegister(data));
    }


    return (<>
        <Header />
        <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div><p></p></div>
                        <h1 className="text-center login-title">Đăng ký</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form className="form-signin">
                                {errors && (<p className='text-danger'>* Mật khẩu xác nhận không đúng!</p>)}
                                <input type="text" className="form-control" placeholder="Nhập họ tên"  autoFocus ref={input_name} />
                                <p className={errors?.name?.length > 0 ? 'text-danger' : ''}>{errors?.name?.[0]}</p>
                                <input type="email" className="form-control" placeholder="Nhập email"  autoFocus ref={input_email} />
                                <p className={errors?.email?.length > 0 ? 'text-danger' : ''}>{errors?.email?.[0]}</p>
                                <input type="password" className="form-control" placeholder="Nhập password" autoFocus ref={input_password} />
                                <p className={errors?.password?.length > 0 ? 'text-danger' : ''}>{errors?.password?.[0]}</p>
                                <input type="password" className="form-control" placeholder="Xác nhận mật khẩu" autoFocus ref={input_confirm_password} />
                                <p className={errors?.confirm_password?.length > 0 ? 'text-danger' : ''}>{errors?.confirm_password?.[0]}</p>
                                <button className="btn btn-lg btn-primary btn-block lg-rgt-btn" onClick={e => registerHandler(e)} >Đăng ký</button>
                                <NavLink to={'/login'} className="text-center new-account">Đã có tài khoản?</NavLink><span className="clearfix"></span>
                            </form>
                        </div>
                        <div><p></p></div>

                    </div>
                </div>
            </div>
        </div>
        <p style={{ color: 'white' }}>00</p>
        <Footer /></>)
}