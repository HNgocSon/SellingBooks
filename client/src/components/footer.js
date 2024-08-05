import { NavLink } from "react-router-dom"
export default function Footer(){
    return (<><footer id="tg-footer" className="tg-footer tg-haslayout">
        <div className="tg-footerarea">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ul className="tg-clientservices">
                            <li className="tg-devlivery">
                                <span className="tg-clientserviceicon"><i className="icon-rocket"></i></span>
                                <div className="tg-titlesubtitle">
                                    <h3>Giao hàng nhanh</h3>
                                    <p>Ship toàn quốc</p>
                                </div>
                            </li>
                            <li className="tg-discount">
                                <span className="tg-clientserviceicon"><i className="icon-tag"></i></span>
                                <div className="tg-titlesubtitle">
                                    <h3>Giảm giá</h3>
                                    <p>Giảm cực sốc</p>
                                </div>
                            </li>
                            <li className="tg-quality">
                                <span className="tg-clientserviceicon"><i className="icon-leaf"></i></span>
                                <div className="tg-titlesubtitle">
                                    <h3>Chất lượng</h3>
                                    <p>Sách ngon</p>
                                </div>
                            </li>
                            <li className="tg-support">
                                <span className="tg-clientserviceicon"><i className="icon-heart"></i></span>
                                <div className="tg-titlesubtitle">
                                    <h3>Hỗ trợ 24/7</h3>
                                    <p>Phục vụ mọi lúc</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="tg-threecolumns">
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="tg-footercol">
                                
                                <ul className="tg-contactinfo">
                                    <li>
                                        <i className="icon-apartment"></i>
                                        <address>Trường Cao Đẳng Kỹ Thuật Cao Thắng</address>
                                    </li>
                                    <li>
                                        <i className="icon-phone-handset"></i>
                                        <span>
                                            <em>0523131720</em>
                                            <em></em>
                                        </span>
                                    </li>
                                    <li>
                                        <i className="icon-clock"></i>
                                        <span>Phục vụ 7 ngày trong tuần từ 8h - 17h</span>
                                    </li>
                                    <li>
                                        <i className="icon-envelope"></i>
                                        <span>
                                            <em><a href="mailto:support@domain.com">nhoxbolt@gmail.com</a></em>
                                            <em><a href="mailto:info@domain.com">bookshop@domain.com</a></em>
                                        </span>
                                    </li>
                                </ul>
                       
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="tg-footercol tg-widget tg-widgetnavigation">
                                <div className="tg-widgettitle">
                                    <h3>Dịch vụ &amp; hỗ trợ</h3>
                                </div>
                                <div className="tg-widgetcontent">
                                
                                        <span><a href="#">Điều khoản sử dụng</a></span>
                                        <br></br>                
                                        <span><NavLink to={'/return-policy'}>Chính sách đổi - trả - hoàn tiền</NavLink></span>
             
                                
                                 
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="tg-footerbar">
            <a id="tg-btnbacktotop" className="tg-btnbacktotop" href="#"><i className="icon-chevron-up"></i></a>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <span className="tg-copyright">2017 All Rights Reserved By &copy; Book Library</span>
                    </div>
                </div>
            </div>
        </div>
    </footer></>)
}