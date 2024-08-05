import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/banner', { 'accept': 'application/json' })
      .then(response => response.data)
      .then(json => setSliderData(json.data || []))
      .catch(error => console.log(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const fetchData = () => {
    if (sliderData.length > 0) {
      return (<div style={{marginTop: '0px'}}>
        <small style={{fontSize: '1px', color: 'white'}}> Single Item</small>
        <Slider {...settings}>
          {sliderData.map(item => {
            return (<div> <img  src={`http://localhost:8000/` + item.image} /></div>)
          })}
        </Slider>
        
      </div>);
    }
  }

  return (<>
    {fetchData()}
  </>)
}