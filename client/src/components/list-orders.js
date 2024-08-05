import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getOrderDetail, getOrders } from "../reducers/orderSlice";
import Swal from "sweetalert2";
import axios from "axios";
import { logout } from "../reducers/authSlice";
import { deleteCustomer } from "../reducers/customerSlice";


export default function ListOrders(props) {
   let number;
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [account, setAccount] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isDelete, setIsDelete] = useState(0);
    const [repurchase, setRepurchase] = useState(0);

    const token = useSelector(state => state.auth.token);
    const customerData = useSelector(state => state.customer.customerData);
    const orderDetail = useSelector(state => state.orders.orderDetail);
    const id = customerData?.id;

    const getAllOrders = () => {
        setOrders(props?.data);
    }

    useEffect(() => {
        dispatch(getOrderDetail({ orderId, token }));
        dispatch(getOrders({ id, token }));
        setOrders(props?.data);
    }, [ orderId, token, isDelete, repurchase]);

    //Hàm hủy đơn hàng nếu trạng thái đơn là chưa xác nhận
    const cancelHandler = (id) => {
        Swal.fire({
            title: "Bạn có chắc là muốn hủy đơn hàng này không?",
            text: "Đơn hàng của bạn sẽ bị xóa khỏi danh sách hóa đơn!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Không hề",
            confirmButtonText: "Chắc chắn!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://127.0.0.1:8000/api/order/cancel/${id}`, {
                    headers: {
                        'Content-Type': "application/json",
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }).then((res) => {
                    if (res.data.success) {
                        setIsDelete(prevComment => prevComment + 1);
                        Swal.fire({ title: res.data.message, text: "Đơn hàng của bạn đã ở trạng thái hủy.", icon: "success" });
                    } else {
                        Swal.fire({ title: "Có lỗi xảy ra, vui lòng đăng nhập lại!", text: "error!", icon: "error" });
                    }
                }).catch((error) => {
                    //Kiểm tra hết phiên đăng nhập
                    if (error.response.statusText === 'Unauthorized') {
                        dispatch(logout());
                        Swal.fire({ title: "Phiên đăng nhập của bạn đã hết hạn!", text: "Vui lòng đăng nhập lại!", icon: "error" });
                        navigation('/login');
                    } else {
                        console.error('Network error:', error.message);
                    }
                });
            }
        });
    }

    //Hàm mua lịa đơn hàng nếu trạng thái đơn đã hủy
    const repurchaseHandler = (id) => {
        Swal.fire({
            title: "Bạn có muốn mua lại đơn hàng này không?",
            text: "Đơn hàng của bạn đã được mua trước đó!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Không hề",
            confirmButtonText: "Chắc chắn!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://127.0.0.1:8000/api/order/repurchase/${id}`, {
                    headers: {
                        'Content-Type': "application/json",
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }).then((res) => {
                    if (res.data.success) {
                        setRepurchase(prevComment => prevComment + 1);
                        Swal.fire({ title: res.data.message, text: "Đơn hàng của bạn đã được mua lại thành công!", icon: "success" });
                    } else {
                        Swal.fire({ title: "Có lỗi xảy ra, vui lòng đăng nhập lại!", text: "error!", icon: "error" });
                    }
                }).catch((error) => {
                    //Kiểm tra hết phiên đăng nhập
                    if (error.response.statusText === 'Unauthorized') {
                        dispatch(logout());
                        Swal.fire({ title: "Phiên đăng nhập của bạn đã hết hạn!", text: "Vui lòng đăng nhập lại!", icon: "error" });
                        navigation('/login');
                    } else {
                        console.error('Network error:', error.message);
                    }
                });
            }
        });
    }
  
    const filterWaitOrders = () => {
        let filter = props?.data?.filter(item => item.status === 1);
        setOrders(filter);
    }

    const filterConfirmedOrders = () => {
        let filter = props?.data?.filter(item => item.status === 2);
        setOrders(filter);
    }

    const filterDeliveringOrders = () => {
        let filter = props?.data?.filter(item => item.status === 3);
        setOrders(filter);
    }

    const filterDeliveredOrders = () => {
        let filter = props?.data?.filter(item => item.status === 4);
        setOrders(filter);
    }

    const filterCancelOrders = () => {
        let filter = props?.data?.filter(item => item.status === 5);
        setOrders(filter);
    }

    const setOrderDetail = (id) => {
        setOrderId(id);
    }
  
    

    //Hàm render đơn hàng chưa thanh toán
    const ordersRender = () => {
        if (orders?.length > 0) {
            return (<>
                <table className="table table-bordered table-vcenter  mb-0">
                    <thead>
                        <tr className="border-top">
                            <th className="text-center">#</th>
                            <th>Tên khách hàng</th>
                            <th>Hình thức</th>
                            <th>Phí ship</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Trạng thái thanh toán</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((item, number) => {
                                return (
                                    <tr key={item.id }>
                                        <td className="text-center">{number + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.format}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.shipping_fee)}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total)}</td>
                                        <td>
                                            {(item.status === 1) ? "Chờ xác nhận" :
                                                (item.status === 2) ? "Đã xác nhận" :
                                                    (item.status === 3) ? "Đang giao" :
                                                        (item.status === 4) ? "Đã giao" : "Đã hủy" }
                                        </td>
                                        <td>{item.vnp_status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                        
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => setOrderDetail(item.id || number)}>Xem Chi tiết</button>
                                                {(
                                                    (item.status === 1 || item.status === 2) &&  
                                                    (item.vnp_status === 0) 
                                                ) && (
                                                    <button type="button" className="btn btn-danger" onClick={() => cancelHandler(item.id)}>Hủy hóa đơn</button>
                                                )}
                                                {item.status === 5 ? <button type="button" className="btn btn-danger" onClick={() => repurchaseHandler(item.id)}>Mua lại</button> : ''}
                                            </div>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table></>);
        }

    }

    //Hàm render chi tiết đơn hàng khi click button modal để xem chi tiết
    const orderDetailRender = () => {
     
        if (orderDetail?.data.length > 0) {
            return (<><table className="table table-striped">
                <thead>
                    <tr>
                        <th className="center">STT</th>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th className="center">Số lượng</th>
                        <th className="right">Giá</th>
                        <th className="right">Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetail?.data.map((item, index) => {
                     
                            return (<>
                                <tr key={item.id }>
                                    <td className="center">{index + 1}</td>
                                  
                                    <td className="center">{item.book?.book_type !== undefined ? 

                                        <img src={`http://localhost:8000/` + item?.books?.book_id?.images.front_cover} style={{width: '180px'}}/> : 
                                        <img src={`http://localhost:8000/` + item.combo?.image} style={{width: '180px'}}/>
                                    }</td>
                                    <td className="left">{item.book?.name || item.combo?.name}</td>
                                    <td className="left">{item.book?.book_type === 0 ? "Sách in" : item.book?.book_type === 1 ? "Ebook" : "Combo"}</td>
                                    <td className="center">{item.quantity}</td>
                                    <td className="right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price)}</td>
                                    <td className="right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price * item.quantity)}</td>
                                </tr>
                                
                                </>)
                        })
                    }
                </tbody>
            </table></>)
        }
        return <tr>Không có hóa đơn</tr>;
    }
    //Hàm render tổng hóa đơn
    const renderTotalDetail = () => {
        var total = 0;
        orderDetail?.data.map(item => total += item.unit_price * item.quantity);
        return (<><div key={total} className="row" >
            <div className="col-lg-4 col-sm-5">Ghi chú:</div>
            <div className="col-lg-4 col-sm-5 ml-auto">
                <table className="table table-clear">
                    <tbody>
                        <tr>
                            <td className="left"><strong>Giảm giá</strong></td>
                            <td className="right">Không</td>
                        </tr>
                        <tr>
                            <td className="left"><strong>Tổng tiền</strong></td>
                            <td className="right"><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            
                <div className="pull-right">  
              
                </div>
            </div>
        </div></>)
    }
    const renderInFor = () => {
        if (orders?.length > 0 && orderId !== null) {
            const selectedOrder = orders.find(order => order.id === orderId);

            if (selectedOrder) {
                return (
                    <tbody>
                        <div key={selectedOrder.id}>
                            <div>Tên: <strong>{selectedOrder.name}</strong></div>
                            <div>Địa chỉ: {selectedOrder.address}</div>
                            <div>Điện thoại: {selectedOrder.phone}</div>
                            <div>Ghi chú: {selectedOrder.note}</div>
                        </div>
                    </tbody>
                );
            } else {
                return (
                    <tbody>
                        <tr>
                            <td colSpan="3">Không tìm thấy hóa đơn  {orderId}</td>
                        </tr>
                    </tbody>
                );
            }
        }
        return (
            <tbody>
                <tr>
                    <td colSpan="3">Không có hóa đơn nào</td>
                </tr>
            </tbody>
        );
    };


    return (<>
    
        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="container-fluid mt-100 mb-100">
                        <div id="ui-view"><div><div className="card">
                          
                            <div className="card-body-invoices">
                                <div className="row mb-4">
                                    <div className="col-sm-4">
                                        <h6 className="mb-3">From:</h6>
                                        <div><strong>Book Shop.</strong></div>                       
                                        <div>Email: huynhsonqg@gmail.com</div>
                                        <div>Phone: 0523131720</div>
                                    </div>

                                <div className="col-sm-4">
                                <h6 className="mb-3">To:</h6>
                               {renderInFor()}
                                </div>

                                  
                                </div>

                                <div className="table-responsive-sm">
                                    {orderDetailRender()}
                                </div>
                                {renderTotalDetail()}
                            </div>
                         
                        </div></div></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="tg-productdescription">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="tg-sectionhead">
                        <div className="row">
                            <div className="page-header">
                                <div>
                                    <h1 className="page-title">Đơn hàng của bạn</h1>
                                    <ol className="tg-breadcrumb">
                                        <li><NavLink to={'/'}>Trang chủ</NavLink></li>
                                        <li className="tg-active">Thông tin đơn hàng </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="tg-themetabs" role="tablist">
                        <li role="presentation" className="active"><a onClick={getAllOrders} href="#allOrders" data-toggle="tab">Tất cả</a></li>
                        <li role="presentation"><a href="#wait" onClick={filterWaitOrders} data-toggle="tab">Chờ xác nhận</a></li>
                        <li role="presentation"><a href="#confirmed" onClick={filterConfirmedOrders} data-toggle="tab">Đã xác nhận</a></li>
                        <li role="presentation"><a href="#delivering" onClick={filterDeliveringOrders} data-toggle="tab">Đang giao</a></li>
                        <li role="presentation"><a href="#delivered" onClick={filterDeliveredOrders} data-toggle="tab">Đã giao</a></li>
                        <li role="presentation"><a href="#cancel" onClick={filterCancelOrders} data-toggle="tab">Đã hủy</a></li>
                    </ul>
                    <div className="tg-tab-content tab-content">
                        <div role="tabpanel" className="tg-tab-pane tab-pane active" id="allOrders">
                            <div className="tg-description">
                                <div className="app-content main-content mt-0 mb-3">
                                    <div className="side-app">
                                        <div className="main-container container-fluid">
                                            <div className="row">
                                                <div className="col-xl-8 col-md-12">
                                                    <div className="card cart">
                                                        <div className="card-body">
                                                            <div className="table-responsive">
                                                                {ordersRender()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-12">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="wait">
                            <div className="tg-description">
                                {ordersRender()}
                            </div>
                        </div>
                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="confirmed">
                            <div className="tg-description">
                                {ordersRender()}
                            </div>
                        </div>
                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="delivering">
                            <div className="tg-description">
                                {ordersRender()}
                            </div>
                        </div>
                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="delivered">
                            <div className="tg-description">
                                {ordersRender()}
                            </div>
                        </div>
                        <div role="tabpanel" className="tg-tab-pane tab-pane" id="cancel">
                            <div className="tg-description">
                                {ordersRender()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ color: 'white' }}> __ </div>
        </div>
    </>)
}