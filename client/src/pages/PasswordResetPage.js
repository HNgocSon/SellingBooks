import Headers from "../components/header";
import Footer from "../components/footer";
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PasswordResetPage() {
    const { token } = useParams();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();


    const handleResetPassword = async () => {

        try {
            // Kiểm tra xác nhận mật khẩu
            if (password !== password_confirmation) {
                // Hiển thị thông báo lỗi khi xác nhận mật khẩu không khớp
                Swal.fire({ title: "Đã xảy ra lỗi, vui lòng nhập lại!", icon: "error" });
                return;
            }

            // Gửi yêu cầu đặt lại mật khẩu đến API
            const response = await axios.post('http://127.0.0.1:8000/api/customer/reset-password/', { token, password, password_confirmation }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
                {
                    params: {
                        token: token,
                    },
                }).then((res) => {
                    if(res.data.success){
                        Swal.fire({ title: "Đổi mật khẩu thành công!", text:"Bây giờ bạn có thể đăng nhập bằng mật khẩu mới", icon: "success" });
                        navigate("/login");
                    }else{
                        Swal.fire({ title: "Có lỗi xảy ra!", icon: "error" });
                    }
                });
            // Hiển thị thông báo thành công và chuyển hướng người dùng đến trang đăng nhập, chẳng hạn.
        } catch (error) {
            console.error(error);
            // Xử lý lỗi và hiển thị thông báo lỗi
        }
    };

    return (<>

        <Headers />
        <section className="bg-light p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="row " style={{
                    padding: "0px 0px 0px 300px",
                    margin: "0px 0px 0px 40px"
                }}>
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                        <div className="card border border-light-subtle rounded-4">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                           
                                            <h2 className="h4 text-center">Khôi Phục Mật Khẩu</h2>
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>

                                <div className="row gy-3 overflow-hidden">
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" name="password" id="password" placeholder="Nhập mật khẩu mới" value={password} onChange={(e) => setPassword(e.target.value)} required />

                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" name="password_confirmation" id="password_confirmation" placeholder="Xác nhận mật khẩu" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} required />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="col-12">
                                        <div><p></p></div>
                                        <div className="d-grid">
                                            <button className="btn bsb-btn-xl btn-primary" onClick={handleResetPassword}>Reset Password</button>
                                        </div>
                                    </div>
                                </div>

                                <hr></hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <Footer />
    </>);
}