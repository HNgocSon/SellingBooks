import {NavLink, useNavigate } from "react-router-dom";

export default function OneBookTitle(props) {
    const navigate = useNavigate()
    const reloadPage = () => {
        navigate(`/product/detail/${props.id}`);
        window.location.reload(false);
    }
    return (<>  
    <div className="tg-booktitle">
        <h3><NavLink to={`/product/detail/${props.id}`} onClick={reloadPage}>{props.name}</NavLink></h3>
    </div>
    </>)
}