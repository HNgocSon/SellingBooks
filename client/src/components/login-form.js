import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError, loginHandler } from '../reducers/authSlice';
import Swal from "sweetalert2";

export default function LoginForm() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);
  const error = useSelector(state => state.auth.error);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const input_email = useRef();
  const input_password = useRef({});

  const handleLogin = async () => {
    var email = input_email.current.value;
    var password = input_password.current.value;
    dispatch(setLoading());
    try {
      // Gọi API để xác thực thông tin đăng nhập
      dispatch(loginHandler({email, password}));
      
      if (isLoggedIn) {
        Swal.fire({title: "Đăng nhập thành công!",icon: "success"
				});
      } else {
        dispatch(setError('Invalid credentials'));
      }
     
      navigate('/');
    } catch (error) {
      // Xử lý lỗi khi đăng nhập không thành công
      console.log(error);
    }
  };

  return (<>
    <div class="modal fade" id="forgot">
      <div class="modal-dialog">
        <div class="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="login">
      <div class="modal-dialog">
        <div class="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
          </div>
          <div className="modal-body">

            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input type="email" className="form-control" ref={input_email} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" ref={input_password} />
              <button type="button" data-toggle="modal" data-target="forgot">Quên mật khẩu</button><br />
            </div>
            <a type="button" data-toggle="modal" data-target="#forgot">
              Quên mật khẩu
            </a>


            <button type="submit" className="btn btn-default" onClick={handleLogin}>Submit</button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}