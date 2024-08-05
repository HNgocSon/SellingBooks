import axios from "axios";
import { useRef, useEffect, useState } from "react";
export default function RegisterForm() {
  const [formRegister, setFormRegister] = useState({name: "", email: "", password: "", phone:""});

  const handleChange = (e)=>{
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  //console.log(formRegister);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post('http://localhost:8000/api/user/register',  formRegister , { 'Content-Type': 'application/json' })
    console.log(res.data.message);

      alert(res.data.message);
  }

  return (
    <>
      <div id="register" className="modal fade">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">

              <form className="well form-horizontal" onSubmit={handleSubmit}>
                <fieldset>
                  <div className="form-group">
                    <label className="col-md-3 control-label">Họ tên</label>
                    <div className="col-md-12 inputGroupContainer">
                      <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span><input name="name" onChange={handleChange} placeholder="Full Name" className="form-control" required="true" type="text" /></div>
                    </div>  
                    <label className="col-md-1 control-label">Email</label>
                    <div className="col-md-12 inputGroupContainer">
                      <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span><input  name="email" onChange={handleChange} placeholder="Email" className="form-control" required="true" type="Email" /></div>
                    </div>
                    <label className="col-md-3 control-label">Mật khẩu</label>
                    <div className="col-md-12 inputGroupContainer">
                      <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-home" /></span><input  name="password" onChange={handleChange} placeholder="password" className="form-control" required="true" type="password" /></div>
                    </div>
                    <label className="col-md-1 control-label">Điện thoại</label>
                    <div className="col-md-12 inputGroupContainer">
                      <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span><input name="phone" onChange={handleChange}  placeholder="Phone" className="form-control" required="true" type="text" /></div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-default">Đăng ký</button>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}