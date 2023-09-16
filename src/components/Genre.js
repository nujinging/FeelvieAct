import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";

export default function Genre() {

    const [genreTitle, setGenreTitle] = useState([]);

    useEffect(() => {
        async function Api() {
            const genre = await movieApi.genreTitle();
            setGenreTitle(genre.data.genres);
            console.log(genreTitle)
        } Api();
    }, []);

    return (
        <div className="item_container genre">
            <Swiper className="genre_title" slidesPerView={"auto"}>
                {genreTitle?.map(item => {
                    return (
                        <SwiperSlide className="genre_item">
                            {item.name}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
}