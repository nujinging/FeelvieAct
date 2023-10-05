

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import {useNavigate} from "react-router-dom";


function PersonList(props) {
    const navigate = useNavigate();
    const list = props.list

    return (
        <Swiper slidesPerView={'auto'} className="mySwiper">
            {list.map(item => (
                <SwiperSlide className="item_card" key={item.id} onClick={() => {navigate(`/detail/${item.id}`)}}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="Movie Poster" loading="lazy"/>
                    <h3> {item.original_name} </h3>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default PersonList;
