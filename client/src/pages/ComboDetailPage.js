import { useEffect, useState } from "react";
import ComboDetail from "../components/combo/combo-detail";
import Footer from "../components/footer";
import Header from "../components/header";
import { useParams } from "react-router-dom";

export default function ComboDetailPage(){
    const params = useParams();
    const [detail, setDetail] = useState({});
    useEffect(() => {
        async function getDataFromAPI() {
            var response = await fetch(`http://localhost:8000/api/combo/detail/${params.id}`)
            var json = await response.json();
            setDetail(json.data)
        }
        getDataFromAPI();
    }, []);
    return(<>
        <Header/>
        <ComboDetail data={detail}/>
        <Footer/>
    </>);
}