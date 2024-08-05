import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getCustomerData } from "../../reducers/customerSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/authSlice";

export default function Comment(props) {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState('');
    const [commentHandler, setCommentHandler] = useState(0);
    const [replyHandler, setReplyHandler] = useState(0);
    const [errors, setErrors] = useState([]);
    const access_token = useSelector(state => state.auth.token);
    const customerInfo = useSelector(state => state.customer.customerData);
    const input_comment_text = useRef();

    useEffect(() => {
       if(!props?.isCombo){
        axios.get(`http://127.0.0.1:8000/api/book/comments/${props?.id}`)
        .then(res => { setComments(res.data.data) })
        .catch(error => console.log(error));
       }else{

        axios.get(`http://127.0.0.1:8000/api/combo/comments/${props?.id}`)
        .then(res => { setComments(res.data.data) })
        .catch(error => console.log(error));
       }
        dispatch(getCustomerData(access_token));
    }, [props?.id, commentHandler, replyHandler, props.data]);
 
    const handleComment = () => {
        const data = {
            "customer_id": customerInfo?.id,
            "comment_text": input_comment_text.current.value,
            "book_id": null,
            "combo_id": null
        };
        if (!props.isCombo) {
            data.book_id = props?.id
        } else {
            data.combo_id = props?.id
        }
        console.log(data);
        axios.post(`http://127.0.0.1:8000/api/comment-handler`, data,
            {
                headers: {
                    'Content-Type': "application/json",
                    Accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            }).then(res => {
                if (res.data.success) {
                    setCommentHandler(prevComment => prevComment + 1);
                    input_comment_text.current.value = '';
                    setErrors([]);
                } else {
                    Swal.fire({ title: "Có lỗi xảy ra!", icon: "error" });
                }
            }).catch(error => {
                if (error.response.statusText === 'Unauthorized') {
                    dispatch(logout());
                    Swal.fire({
                        title: "Bạn cần đăng nhập để bình luận?",
                        text: "Vui lòng đăng nhập trước!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "Không đăng nhập",
                        confirmButtonText: "Tới trang đăng nhập!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigation('/login');
                        }
                    });
                 
                } else if (error.response.data) {
                    setErrors(error.response.data.errors)
                }
            });
    }


    const handleReply = (id) => {
        const data = { "customer_id": customerInfo?.id, "reply_text": reply };
        axios.post(`http://127.0.0.1:8000/api/reply-handler/${id}`, data,
            {
                headers: {
                    'Content-Type': "application/json",
                    Accept: 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            }).then(res => {
                if (res.data.success) {
                    setReplyHandler(replyHandler => replyHandler + 1);
                    setReply('');
                    setErrors([]);
                } else {
                    Swal.fire({ title: "Có lỗi xảy ra!", icon: "error" });
                }

            }).catch(error => { if (error.response.statusText === 'Unauthorized') {
                dispatch(logout());
                Swal.fire({
                    title: "Bạn cần đăng nhập để bình luận?",
                    text: "Vui lòng đăng nhập trước!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Không đăng nhập",
                    confirmButtonText: "Tới trang đăng nhập!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigation('/login');
                    }
                });
            } else if(error.response.data){
                setErrors(error.response.data.errors);
            } });
        
    }

    const fetchComment = () => {
        if (comments.length > 0) {
            return (<>
                <div className="row">
                    <div className="media">
                        {comments.map(item => {
                            return (<>
                                <div className="media-heading">
                                    <button className="btn btn-default btn-xs" type="button" data-toggle="collapse" data-target={`#collapse${item.id}`} aria-expanded="false" aria-controls="collapseExample"><span className="glyphicon glyphicon-minus" aria-hidden="true"></span></button> <span className="label label-info">1</span> {item.customer.name} 12 hours ago
                                </div>
                                <div className="panel-collapse collapse in" id={`collapse${item.id}`}>
                                    <div className="media-left">
                                        <div className="vote-wrap">
                                            <div className="save-post">
                                                <a href="#"><span className="glyphicon glyphicon-star" aria-label="Save"></span></a>
                                            </div>
                                            <div className="vote up">
                                                <i className="glyphicon glyphicon-menu-up"></i>
                                            </div>
                                            <div className="vote inactive">
                                                <i className="glyphicon glyphicon-menu-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <p>{item.comment_text}.</p>
                                        <div className="comment-meta">
                                            <span><a href="#">Báo cáo</a></span>
                                            <span>
                                                <a className="" role="button" data-toggle="collapse" href={`#replyComment${item.id}`} aria-expanded="false" aria-controls="collapseExample">Phản hồi</a>
                                            </span>
                                            <div className="collapse" id={`replyComment${item.id}`}>
                                                <div className="form-group">
                                                    <label htmlFor="comment">Bình luận của bạn</label>
                                                    <textarea name="comment" className="form-control" rows="3" value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
                                                    <p className={errors?.reply_text?.length > 0 ? 'text-danger' : ''}>{errors?.reply_text?.length > 0 ? errors?.reply_text?.[0] : ''}</p>
                                                </div>
                                                <button onClick={() => handleReply(item.id)} className="btn btn-danger">Gửi</button>
                                            </div>
                                        </div>
                                        {
                                            item.comment_replies?.map(reply => {
                                                return (<>
                                                    <div className="media">
                                                        <div className="media-heading">
                                                            <button className="btn btn-default btn-collapse btn-xs" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseExample"><span className="glyphicon glyphicon-minus" aria-hidden="true"></span></button> <span className="label label-info">12314</span> {reply.customer.name} 12 sat once yazmis
                                                        </div>
                                                        <div className="panel-collapse collapse in" id="collapseTwo">
                                                            <div className="media-left">
                                                                <div className="vote-wrap">
                                                                    <div className="save-post">
                                                                        <a href="#"><span className="glyphicon glyphicon-star" aria-label="Save"></span></a>
                                                                    </div>
                                                                    <div className="vote up">
                                                                        <i className="glyphicon glyphicon-menu-up"></i>
                                                                    </div>
                                                                    <div className="vote inactive">
                                                                        <i className="glyphicon glyphicon-menu-down"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="media-body">
                                                                <p><span style={{ color: 'blue' }}>{'@' + item.customer.name}</span> {reply.reply_text}</p>
                                                                <div className="comment-meta">
                                                                    <span><a href="#">Báo cáo</a></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></>);
                                            })}
                                    </div>
                                </div></>)
                        })}
                    </div>
                </div>
            </>)
        }
    }
    return (<><div className="">
        <div className="post-comments">
            <div className="form-group">
                <label htmlFor="comment">Bình luận của bạn</label>
                <textarea name="comment" className="form-control" rows="3" ref={input_comment_text}></textarea>
                <p className={errors?.comment_text?.length > 0 ? 'text-danger' : ''}>{errors?.comment_text?.length > 0 ? errors?.comment_text?.[0] : ''}</p>
            </div>
            <button type="submit" className="btn btn-danger" onClick={handleComment}>Gửi</button>
            <div className="comments-nav">
                <ul className="nav nav-pills">
                    <li role="presentation" className="dropdown">
                        <p style={{ color: 'white' }}>__</p>
                    </li>
                </ul>
            </div>
            {fetchComment()}
        </div>
    </div></>)
}