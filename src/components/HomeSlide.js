import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function HomeSlide(props) {
    const [itemId, setItemId] = useState(null);
    const navigate = useNavigate();
    const slideList = props.list.slice(0, 5);

    // 영화 디테일 페이지 이동
    const pageLink = (itemId) => {
        setItemId(itemId);
        navigate(`/detail/${props.type}/${itemId}`);
    }

    // Swiper pagination
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"> <span class="blind">' + (index + 1)  + "</span> </span>";
        },
    };

    return (
        <Swiper centeredSlides={true}
                pagination={pagination}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true} modules={[Autoplay, Pagination, Navigation]} className="home_banner">
            {slideList.map(item => (
                <SwiperSlide key={item.id} onClick={() => pageLink(item.id)}>
                    <Link to={`/detail/${props.type}/${itemId}`} className="home_banner" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path})` }}>
                        <div className="banner_txt">
                            <h2 className="tit">{item.title}</h2>
                            <p>{item.overview}</p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
