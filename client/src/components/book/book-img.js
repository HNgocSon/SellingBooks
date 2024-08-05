export default function BookImg(props) {
    // console.log(props.data[0].front_cover);
    return (<>
        <div className="tg-bookimg">
            <div className="tg-frontcover"><img src={`http://localhost:8000/`+ props?.data?.[0]?.front_cover} alt="image description" style={{height:'350px'}}/></div>
            <div className="tg-backcover"><img src={`http://localhost:8000/` + props?.data?.[0]?.front_cover} alt="image description" style={{height:'350px'}}/></div>
        </div>
    </>);
}