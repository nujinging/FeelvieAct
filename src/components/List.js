import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function List(props) {
    const [itemId, setItemId] = useState(null);
    const navigate = useNavigate();
    const list = props.list;

    const pageLink = (itemId) => {
        setItemId(itemId);
        navigate(`/detail/${itemId}`);
    }

    useEffect(() => {
        if (itemId !== null) {
            window.location.reload();
        }
    }, [itemId]);

    return (
        <Swiper slidesPerView={'auto'} className={`mySwiper ${list.some(item => item.profile_path) ? 'person_list' : 'item_list'}`}>
            {list.map(item => (
                <SwiperSlide className={`${list.some(item => item.profile_path) ? 'person_card' : 'item_card'}`} key={item.id} onClick={() => pageLink(item.id)}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.profile_path}`}
                        alt="Movie Poster"
                    />
                    <h3> {item.title || item.name} </h3>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default List;
