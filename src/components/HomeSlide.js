import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import {useNavigate} from "react-router-dom";
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
        <Swiper pagination={pagination} navigation={true} autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }} loop={true} modules={[ Autoplay, Pagination, Navigation]} className="home_banner">
            {slideList.map(item => (
                <SwiperSlide className="banner" key={item.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path})` }} onClick={() => pageLink(item.id)}>
                    <div className="banner_txt">
                        <h2 className="tit">{item.title}</h2>
                        <p>{item.overview}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
