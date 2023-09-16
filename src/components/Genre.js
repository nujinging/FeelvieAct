import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";

export default function Genre() {

    const [genreTitle, setGenreTitle] = useState([]);
    const [genreList, setGenreList] = useState(null);
    const [genreNumber, setGenreNumber] = useState();

    const genreChange = (itemId) => {
        setGenreNumber(itemId);
    }

    useEffect(() => {
        async function Api() {
            const genre = await movieApi.genreTitle();
            setGenreTitle(genre.data.genres);
            if (genreNumber) {
                const genreUrl = await movieApi.genreList(genreNumber);
                setGenreList(genreUrl.data.results);
            }
        } Api();
    }, [genreNumber]);

    return (
        <div className="item_container genre">
            <Swiper className="genre_title" slidesPerView={"auto"}>
                <SwiperSlide className="genre_item">
                    All
                </SwiperSlide>
                {genreTitle?.map(item => {
                    return (
                        <SwiperSlide className="genre_item" key={item.id} onClick={() => genreChange(item.id)}>
                            {item.name}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <ul className="genre_list">
                {genreList?.map(item => {
                    return (
                        <li className="list_card">
                            <picture>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    alt="Movie Poster"
                                />
                            </picture>
                            <p className="tit">
                                {item.title}
                            </p>
                        </li>
                    )
                })}

            </ul>
        </div>
    );
}