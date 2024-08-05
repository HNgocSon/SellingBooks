import { useEffect, useState } from "react";
import useDebounce from "./hooks/debounce";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [loading, setLoading] = useState();
    const [search, setSearch] = useState();
    const [searchValue, setSearchValue] = useState([]);
    const navigate = useNavigate();

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch) {
            setLoading(true);
            axios.get(`http://127.0.0.1:8000/api/book/search?search=${debouncedSearch}`)
                .then((res) => setSearchValue(res.data.data))
                .catch((error) => { console.log(error) });
            setLoading(false);
        }
     
    }, [debouncedSearch]);

    const reloadPage = (id) => {
        navigate(`/product/detail/${id}`);
        window.location.reload(false);
    }

   
    return (<div className="tg-searchbox" >
        <form className="tg-formtheme tg-formsearch">
            <fieldset style={{ backgroundColor: 'white' }}>
                <input type="text"  className="typeahead form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm theo tên sách" />
              
                {search && searchValue?.map((item) => (
                    <div className="row">
                        <div className="col-md-3">
                            <img src={`http://localhost:8000/` + item?.images[0]?.front_cover} style={{ width: '70px', height: '60px' }} />
                        </div>
                        <div className="col-md-8">
                            <NavLink onClick={() => reloadPage(item.id)}>
                                <h6 style={{ textAlign: 'left' }}>{item.name}</h6>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </fieldset>
        </form>
    </div>);
}