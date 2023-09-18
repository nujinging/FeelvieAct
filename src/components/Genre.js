import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Genre() {

    const { type } = useParams();
    const navigate = useNavigate();

    console.log(type)

    const [genreTitle, setGenreTitle] = useState([]);
    const [genreList, setGenreList] = useState(null);
    const [genreNumber, setGenreNumber] = useState();


    const genreChange = (itemId) => {
        if (itemId === 'All') {
            setGenreNumber(null); // Set genreNumber to null for popular data
        } else {
            setGenreNumber(itemId);
        }
    }

    useEffect(() => {
        async function Api() {
            const genre = await movieApi.genreTitle(type);
            setGenreTitle(genre.data.genres);

            if (genreNumber !== null) {
                const genreUrl = await movieApi.genreList(type, genreNumber);
                setGenreList(genreUrl.data.results);
            } else {
                const popular = await movieApi.popular(type);
                setGenreList(popular.data.results);
            }
        } Api();
    }, [type, genreNumber]);

    return (
        <div className="item_container genre">
            <Swiper className="genre_title" slidesPerView={"auto"}>
                <SwiperSlide className="genre_item" onClick={() => genreChange('All')}>
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
                        <li className="list_card" onClick={() => navigate(`/detail/${type}/${item.id}`)}>
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