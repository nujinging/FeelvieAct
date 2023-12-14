import '../../scss/list.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Link} from "react-router-dom";
import {Navigation} from "swiper/modules";
import imgNone from "../../images/img_card_none.png";

export default function List(props) {
  return (
    <Swiper
      slidesPerView={'auto'} navigation={true} modules={[Navigation]}
      className={`swiper item_slide ${props.class}`}
    >
      {props.list.map(item => (
        <SwiperSlide
          className={`list_card ${item.known_for_department ? 'person_card' : 'item_card'}`}
          key={item.id}
        >
          <Link to={`${item.overview ? `/detail/${props.type}/${item.id}` : `/person/${item.id}`} `}>
            {
              item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt={item.title || item.name}
                  loading="lazy"
                />
              ) : item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w154${item.profile_path}`}
                  alt={item.title || item.name}
                  loading="lazy"
                />
              ) : (
                <picture className="img_none">
                  <img src={imgNone} alt="img_none" loading="lazy"/>
                </picture>
              )
            }
            <h3>{item.title || item.name}</h3>
          </Link>

        </SwiperSlide>
      ))}
    </Swiper>
  );
}
