
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import {useNavigate} from "react-router-dom";


function List(props) {
    const navigate = useNavigate();
    const list = props.list;
    return (
        <Swiper slidesPerView={'auto'} className={`mySwiper ${list.some(item => item.profile_path) ? 'person_list' : 'item_list'}`}>
            {list.map(item => (
                <SwiperSlide className={`${list.some(item => item.profile_path) ? 'person_card' : 'item_card'}`} key={item.id} onClick={() => {navigate(`/detail/${item.id}`)}}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.profile_path}`}
                        alt="Movie Poster"
                    />
                    <h3> {item.title || item.name} </h3>
                    <p>{item.id}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default List;
