import axios from "axios";
import { useEffect, useState } from "react";

export default function ListEbook() {
    const [ebooks, setEbooks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/list-ebook')
            .then((res) => {
                console.log(res.data.data); // Kiểm tra dữ liệu
                setEbooks(res.data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const listEbookRender = () => {
        if (ebooks.length > 0) {
            return (
                <>
                    {ebooks.map(item => (
                        <div key={item.id} className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
                            <div className="tg-postbook">
                                <figure className="tg-featureimg">
                                    <div className="tg-bookimg">
                                        <div className="tg-frontcover">
                                            <img src={`http://127.0.0.1:8000/${item.images[0]?.front_cover}`} alt={item.name} />
                                        </div>
                                        <div className="tg-backcover">
                                            <img src={`http://127.0.0.1:8000/${item.images[0]?.back_cover}`} alt={item.name} />
                                        </div>
                                    </div>
                                    <a className="tg-btnaddtowishlist" href="#">
                                        <i className="icon-heart"></i>
                                        <span>Thêm vào giỏ hàng</span>
                                    </a>
                                </figure>
                                <div className="tg-postbookcontent">
                                    <ul className="tg-bookscategories">
                                        <li><a href="#">Ebook</a></li>
                                        <li><a href="#">Giả tưởng</a></li>
                                    </ul>
                                    <div className="tg-booktitle">
                                        <h3><a href="#">{item.name}</a></h3>
                                    </div>
                                    <span className="tg-bookwriter">Tác giả: <a href="#">{item.authors[0]?.name || 'Không có Tác Giả'}</a></span>
                                    <span className="tg-stars"><span></span></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            );
        } else {
            return <p>Không có dữ liệu</p>;
        }
    };

    return (
        <>
            <section className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div className="tg-newrelease">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="tg-sectionhead">
                                    <h2><span></span>Ebook</h2>
                                </div>
                                <div className="tg-description">
                                    <p>Sách điện tử.</p>
                                </div>
                                <div className="tg-btns">
                                    {/* <a className="tg-btn tg-active" href="#">Xem tất cả</a> */}
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="row">
                                    <div className="tg-newreleasebooks">
                                        {listEbookRender()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
