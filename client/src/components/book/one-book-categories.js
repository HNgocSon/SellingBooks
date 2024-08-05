export default function OneBookCategories(props) {
    console.log(props.data);
    return (
    <ul className="tg-bookscategories">
        {props.data?.map((item, index) => {
        return (<>
            {item.name}
            {index === props.data?.length - 1 ? null : " & "}
        </>);
    })}
    </ul>);
}