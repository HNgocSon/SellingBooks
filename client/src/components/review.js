import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from 'react-rating-stars-component';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/authSlice";

export default function Review(props) {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const customerData = useSelector(state => state.customer.customerData);
    const token = useSelector(state => state.auth.token);
    const [bookReviews, setBookReviews] = useState([]);
    const [customerOrder, setCustomerOrder] = useState([]);
    const [rating, setRating] = useState(0);
    const input_comment = useRef();
    const [ratingErrors, setRatingErrors] = useState(null);
    const [commentErrors, setCommentErrors] = useState(null);
    const [ratingCounter, setRatingCounter] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
    const [reviewCounter, setReviewCounter] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/${props.isCombo ? 'combo' : 'book'}/reviews/${props.id}`, { 'Accept': 'application/json' });
                setBookReviews(res.data.reviews);
                setCustomerOrder(res.data.checkOrder);
                setRatingCounter(res.data.rating_counter || {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
                setReviewCounter(res.data.review_counter);
                calculateAverageRating(res.data.reviews);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [props]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return;

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(totalRating / reviews.length);
    };

    const checkBookOrders = () => {
        return customerOrder.some(item => item.order.customer_id === customerData?.id && item.book_id === props?.id);
    }

    const checkComboOrders = () => {
        return customerOrder.some(item => item.order.customer_id === customerData?.id && item.combo_id === props?.id);
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const handleReply = async () => {
        const data = { 
            comment: input_comment.current.value, 
            rating, 
            customer_id: customerData.id, 
            book_id: props.isCombo ? null : props.id, 
            combo_id: props.isCombo ? props.id : null 
        };

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/review-handler`, data, {
                headers: {
                    'Content-Type': "application/json",
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {
                Swal.fire({ title: res.data.message, text: "Đánh giá Thành Công!", icon: "success" });
                input_comment.current.value = '';
                setRatingErrors(null);
                setCommentErrors(null);
                ratingChanged();
            }
        } catch (error) {
            if (error.response.statusText === 'Unauthorized') {
                dispatch(logout());
                Swal.fire({ title: "Bạn cần đăng nhập để đánh giá!", text: "Vui lòng đăng nhập!", icon: "error" });
                navigation('/login');
            } else if (error.response) {
                setRatingErrors(error.response.data.errors.rating);
                setCommentErrors(error.response.data.errors.comment);
            } else {
                console.error('Network error:', error.response.statusText);
            }
        }
    }

    const fetchReviewsData = () => {
        if (bookReviews.length > 0) {
            return bookReviews.map(item => {
                if (item.status === 1) {
                    return (
                        <div key={item.id}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src={`http://localhost:8000/${item.customer?.image}`} className="img-rounded" />
                                    <div className="review-block-name"><a>{item.customer.name}</a></div>
                                    <div className="review-block-date">{item.created_at}<br /></div>
                                </div>
                                <div className="col-sm-9">
                                    {renderStars(item.rating)}
                                    <div className="review-block-description">{item.comment}</div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            });
        } else {
            return <p>Sách không có đánh giá</p>;
        }
    }

    const renderStars = (value) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i <= value ? 'gold' : 'grey',
                        cursor: 'pointer',
                        height: '90px'
                    }}>★</span>
            );
        }
        return stars;
    };

    return (
        <div className="container review__section">
            <div className="row">
                <div className="col-md-7">
                    <div className="well well-sm">
                        <div className="row">
                            <div className="col-xs-6 col-md-6 text-center">
                                <h1 className="rating-num">{averageRating.toFixed(2)}</h1>
                                {renderStars(averageRating)}
                                <div>
                                    <span className="glyphicon glyphicon-user"></span> {reviewCounter} lượt đánh giá
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-6">
                                <div className="row rating-desc">
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <div key={star} className="col-xs-12 col-md-12">
                                            <div className="row">
                                                <div className="col-xs-3 col-md-3 text-right">
                                                    <span className="glyphicon glyphicon-star"></span>{star}
                                                </div>
                                                <div className="col-xs-8 col-md-9">
                                                    <div className="progress progress-striped">
                                                        <div className={`progress-bar progress-bar-${star >= 4 ? 'success' : star === 3 ? 'info' : star === 2 ? 'warning' : 'danger'}`} role="progressbar" aria-valuenow="20"
                                                            aria-valuemin="0" aria-valuemax="100" style={{ width: `${ratingCounter[star] || 0}%` }}>
                                                            <span className="sr-only">{ratingCounter[star] || 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {checkBookOrders() || checkComboOrders() ? 
                <div className="row">
                    <div className="col-sm-7">
                        <label htmlFor="comment">Chọn số sao đánh giá</label>
                        <ReactStars
                            count={5}
                            value={rating}
                            onChange={ratingChanged}
                            size={34}
                            activeColor="#ffd700"
                        />
                        <div className="text-danger">{ratingErrors?.map(item => '(*) ' + item).join(' ')}</div>
                        <div className="form-group">
                            <label htmlFor="comment">Đánh giá của bạn</label>
                            <textarea name="comment" className="form-control" rows="3" ref={input_comment}></textarea>
                            <div className="text-danger">{commentErrors?.map(item => '(*) ' + item).join(' ')}</div>
                        </div>
                        <button type="submit" className="btn btn-danger" onClick={handleReply}>Đánh giá</button>
                    </div>
                </div> 
                : <>Bạn cần mua hàng để đánh giá</>
            }
            <div className="row">
                <div className="col-sm-7">
                    <hr />
                    <div className="review-block">
                        {fetchReviewsData()}
                    </div>
                </div>
            </div>
        </div>
    );
}
