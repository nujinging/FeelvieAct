import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function HomeSlide(props) {

    const slideList = props.lists.slice(0, 5)

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"> <span class="blind">' + (index + 1)  + "</span> </span>";
        },
    };

    return (
        <>
            <Swiper pagination={pagination} navigation={true} modules={[Pagination, Navigation]} className="home_banner">
                {slideList.map(item => (
                    <SwiperSlide className="banner" key={item.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path})` }}>
                        <div className="banner_txt">
                            <h2 className="tit">{item.title}</h2>
                            <p>{item.overview}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
