import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import mainEvent from './../images/img_main_event.png'

export default function List(props) {
    const [itemId, setItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [swiperKey, setSwiperKey] = useState(0);
    const navigate = useNavigate();
    const loadLength = 5;
    const list = props.list;
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(true);

    // 영화 디테일 페이지 이동
    const movieLink = (itemId) => {
        setItemId(itemId);
        navigate(`/detail/${props.type}/${itemId}`);
    }
    // 인물 디테일 페이지 이동
    const personLink = (itemId) => {
        setItemId(itemId);
        navigate(`/person/${itemId}`);
    }

    useEffect(() => {
        // 데이터가 들어오면 로딩 false로 변경
        if (list.length > 0) {
            const timer = setTimeout(() => {
                setLoading(false);
                setVisible(true);
                setVisible2(false);
            }, 10000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [list.length, loading]);

    return (
        <Swiper
            key={swiperKey}
            slidesPerView={'auto'}
            className={`swiper ${props.class} `}
            allowTouchMove={!loading}
        >
            <SwiperSlide className={`item_card test2 ${visible2 ? 'visible' : ''}`}>
                    <img src={mainEvent} alt=""/>
            </SwiperSlide>
            {list.map(item => (
                <SwiperSlide
                    className={list.some(item => item.profile_path) ? 'person_card' : `item_card ${visible ? 'visible' : ''}`}
                    key={item.id}
                    onClick={() => {
                        if (list.some(item => item.poster_path)) {
                            movieLink(item.id);
                        } else {
                            personLink(item.id);
                        }
                    }}
                >
                    <div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.profile_path || item.still_path}`}
                            alt="Movie Poster"
                            loading="lazy"
                        />
                        <h3>{item.title || item.name}</h3>
                        {item.air_date && (
                            <div>
                                <span className="episode_date">{item.air_date}</span>
                                <p className="episode_txt">{item.overview}</p>
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
