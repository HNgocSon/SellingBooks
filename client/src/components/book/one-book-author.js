export default function OneBookAuthor(props) {
    return (<><span className="tg-bookwriter">Bởi tác giả:
        <a href="#">{props.data?.map((item, index) => {
            return (<>
            <div key={item.id || index}>
                {item.name}
                {index === props.data?.length - 1 ? null : " & "}
           </div> </>);
        })}</a>
    </span></>)
}