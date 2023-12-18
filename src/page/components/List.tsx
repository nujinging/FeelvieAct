import '../../scss/components/list.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Link} from "react-router-dom";
import {Navigation} from "swiper/modules";
import imgNone from "../../images/img_card_none.png";

interface ListItem {
  id: number;
  title: string;
  name: string;
  overview?: string;
  poster_path?: string;
  profile_path?: string;
  known_for_department?: string;
}

interface ListProps {
  list: ListItem[];
  type: 'movie' | 'person';
  className: string;
}


const List: React.FC<ListProps> = ({ list, type, className: itemClass }: ListProps) => {
  return (
    <Swiper
      slidesPerView={'auto'} navigation={true} modules={[Navigation]}
      className={`swiper item_slide ${itemClass}`}
    >
      {list.map(item => (
        <SwiperSlide
          className={`list_card ${item.known_for_department ? 'person_card' : 'item_card'}`}
          key={item.id}
        >
          <Link to={`${item.overview ? `/detail/${type}/${item.id}` : `/person/${item.id}`} `}>
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

export default List;
