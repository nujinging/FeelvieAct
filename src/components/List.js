import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function List(props) {
    const [itemId, setItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const list = props.list;
    // const type = props.type;
    const movieLink = (itemId) => {
        setItemId(itemId);
        navigate(`/detail/${props.type}/${itemId}`);
    }
    const personLink = (itemId) => {
        setItemId(itemId);
        navigate(`/person/${itemId}`);
    }

    useEffect(() => {
        window.addEventListener('load', () => {
            setLoading(false);
        });
        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);


    return (
        <Swiper slidesPerView={'auto'} className={`mySwiper ${list.some(item => item.profile_path) ? 'person_list' : 'item_list'}`}>
            {loading ? (
                <div style={{width: `500px`, height:'500px',background:'red'}}>Loading...</div>
            ) : (
                // Render actual items when not loading
                list.map(item => (
                    <SwiperSlide className={`${list.some(item => item.profile_path) ? 'person_card' : 'item_card'}`} key={item.id}
                                 onClick={() => {
                                     if (list.some(item => item.poster_path)) {
                                         movieLink(item.id)
                                     } else {
                                         personLink(item.id)
                                     }
                                 }}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.profile_path}`}
                            alt="Movie Poster"
                        />
                        <h3> {item.title || item.name} </h3>
                    </SwiperSlide>
                ))
            )}
            {
                list.some(item => item.profile_path) ?
                    <SwiperSlide className="person_card more">
                        <div>더보기</div>
                    </SwiperSlide>
                    : null
            }
        </Swiper>
    );
}

export default List;
