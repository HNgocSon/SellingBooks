export default function OneBookPrice(props) {
    return (   
    <span className="tg-bookprice">
        <ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.data)}</ins>
    </span>
    );
}
