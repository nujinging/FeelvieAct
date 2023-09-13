
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import {useNavigate} from "react-router-dom";


function List(props) {
    const navigate = useNavigate();
    return (
        <Swiper slidesPerView={'auto'} className="mySwiper">
            {props.list.map(item => (
                <SwiperSlide className="item_card" key={item.id} onClick={() => {navigate(`/detail/${item.id}`)}}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="Movie Poster" />
                    <h3> {item.title} </h3>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default List;
