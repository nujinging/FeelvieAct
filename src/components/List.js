
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.css';

function List(props) {
    console.log(props)
    return (
        <Swiper slidesPerView={'auto'} className="mySwiper">
            {props.list.map(item => (
                <SwiperSlide className="item_card" key={item.id}>
                    <h3> {item.title} </h3>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default List;
