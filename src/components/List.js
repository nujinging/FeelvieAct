import './../App.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Navigation} from "swiper/modules";

export default function List(props) {
    const [itemId, setItemId] = useState(null);
    const navigate = useNavigate();
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


    return (
        <Swiper
            slidesPerView={'auto'} navigation={true} modules={[Navigation]}
            className={`swiper`}
        >
            {list.map(item => (
                <SwiperSlide
                    className={`list_card ${list.some(item => item.profile_path) ? 'person_card' : 'item_card'}`}
                    key={item.id}
                    onClick={() => {
                        if (list.some(item => item.poster_path)) {
                            movieLink(item.id);
                        } else {
                            personLink(item.id);
                        }
                    }}
                >
                    {
                        item.poster_path === null || item.profile_path === null ? (
                            <div className="card_none">none</div>
                        ) : (
                            <img
                                src={item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : (item.profile_path ? `https://image.tmdb.org/t/p/w154${item.profile_path}` : (item.still_path ? `https://image.tmdb.org/t/p/w500/${item.still_path}` : ''))}
                                alt={item.poster_path}
                                loading="lazy"
                            />
                        )
                    }

                    <h3>{item.title || item.name}</h3>
                    {item.air_date && (
                        <>
                            <span className="episode_date">{item.air_date}</span>
                            <p className="episode_txt">{item.overview}</p>
                        </>
                    )}

                </SwiperSlide>
            ))}
        </Swiper>

    );
}
