import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function List(props) {
    const [itemId, setItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [swiperKey, setSwiperKey] = useState(0);
    const navigate = useNavigate();
    const loadLength = 5;
    const list = props.list;

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
            const timeoutId = setTimeout(() => {
                setLoading(false);
                // key값을 바꿔 swiper가 재렌더링 될 수 있도록 유도
                setSwiperKey(prevKey => prevKey + 1);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [list.length, loading]);

    return (
        <Swiper key={swiperKey} slidesPerView={'auto'} className={`swiper ${props.class}`} allowTouchMove={!loading}>
            {loading ? (
                Array(loadLength).fill().map((_, index) => (
                    <SwiperSlide className="load_card" key={index}>
                        <img
                            src=""
                            alt="Movie Poster"
                        />
                    </SwiperSlide>
                ))
            )  : (
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
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.profile_path || item.still_path}`}
                            alt="Movie Poster"
                            loading="lazy"
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
