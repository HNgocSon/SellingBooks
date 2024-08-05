import TopBarHeader from './top-bar-header';
import MiddleContainerHeader from './middle-container-header';
import NavigationHeader from './navigation-header';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Header(props){
    const [categories, setCategories] = useState([]);
    useEffect(()=> {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(response => response.data)
			.then(json => setCategories(json.data))
			.catch(error => console.log(error));
    }, []);

    return (<>
        <header id="tg-header" className="tg-header tg-haslayout">
            <TopBarHeader />
            <MiddleContainerHeader />
            <NavigationHeader data={categories}/>
        </header>
    </>);
}