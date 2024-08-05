import { useRef, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";
import Swal from "sweetalert2";

export default function ForgotPasswordPage() {
    const input_email = useRef();
    const [error, setError] = useState();
    const handleForgotPassword = async () => {
        try {
            var email =  input_email.current.value;
            // Gửi yêu cầu đặt lại mật khẩu đến API
            const response = await axios.post('http://127.0.0.1:8000/api/customer/forgot-password', { email });
            console.log(response.data);
            if(response.data.success){
                Swal.fire({ title: "Đã gửi yêu cầu đến địa chỉ email của bạn!", text:"Vui lòng kiểm tra trong hòm thư email", icon: "success" });
            }else{
                Swal.fire({ title: response.data.msg, text: "Email người dùng không tồn tại!", icon: "error" });
            }
            //Hiển thị thông báo cho người dùng
        } catch (error) {
            console.error(error);
            Swal.fire({ title: "Có lỗi xảy ra!", icon: "error" });
        }
    }

    return (<>
        <Header />
        <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div><p></p></div>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center">Quên mật khẩu?</h2>
                                    <p>Bạn có thể khôi phục mật khẩu tại đây.</p>
                                    <div className="panel-body">
                                        <form id="register-form" role="form" autocomplete="off" className="form" method="post">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                    <input id="email" name="email" placeholder="Nhập địa chỉ email của bạn" className="form-control" type="email" ref={input_email}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset Password" onClick={handleForgotPassword} />
                                            </div>
                                            <input type="hidden" className="hide" name="token" id="token" value="" />
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer /></>)
}