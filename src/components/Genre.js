import './../App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Genre() {
    const { type } = useParams();
    const navigate = useNavigate();
    const [genreTitle, setGenreTitle] = useState([]);
    const [genreList, setGenreList] = useState(null);
    const [genreNumber, setGenreNumber] = useState('All');
    const [selectedValue, setSelectedValue] = useState('');

    // 전체 장르
    const genreChange = (itemId) => {
        setSelectedValue('');
        if (itemId === 'All') {
            setGenreNumber('All');
        } else {
            setGenreNumber(itemId);
        }
        console.log(itemId)
    }

    useEffect(() => {
        async function Api() {
            const genre = await movieApi.genreTitle(type);
            setGenreTitle(genre.data.genres);
            if (genreNumber !== null) {
                const genreUrl = await movieApi.genreList(type, genreNumber);
                setGenreList(genreUrl.data.results);
            } else {
                // genreNumber에 값이 없는 초기화면일 시에는 유명한 작품 먼저 보여주기
                const popular = await movieApi.popular(type);
                setGenreList(popular.data.results);
            }
        } Api();
    }, [type, genreNumber]);

    console.log(genreList)


    const SortClick = async (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'popularityDesc') {
            const genreUrl = await movieApi.genrePopularDesc(type, genreNumber);
            setGenreList(genreUrl.data.results);
            console.log(genreNumber)
        } else if (event.target.value === 'popularityAsc') {
            const genreUrl = await movieApi.genrePopularAsc(type, genreNumber);
            setGenreList(genreUrl.data.results);
        } else if (event.target.value === 'dateDesc') {
            const genreUrl = await movieApi.genreDateDesc(type, genreNumber);
            setGenreList(genreUrl.data.results);
            console.log(genreUrl.data.results)
        } else {
            const genreUrl = await movieApi.genreDateAsc(type, genreNumber);
            setGenreList(genreUrl.data.results);
        }
    }

    return (
        <div className="item_container genre">
            <Swiper className="genre_title" slidesPerView={"auto"}>
                <SwiperSlide className={`genre_item ${genreNumber === 'All' ? 'active': ''}`} onClick={() => genreChange('All')}>
                    All
                </SwiperSlide>
                {genreTitle?.map(item => {
                    return (
                        <SwiperSlide className={`genre_item ${genreNumber === item.id ? 'active': ''}`} key={item.i} onClick={() => genreChange(item.id)}>
                            {item.name}
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            <div className="genre_sort">
                <select onChange={SortClick} value={selectedValue}>
                    <option value="popularityDesc">인기도 내림차순</option>
                    <option value="popularityAsc">인기도 오름차순</option>
                    <option value="dateDesc">상영일 내림차순</option>
                    <option value="dateAsc">상열일 오름차순</option>
                </select>
            </div>

            <ul className="genre_list">
                {genreList?.map(item => {
                    return (
                        <li className="list_card" onClick={() => navigate(`/detail/${type}/${item.id}`)}>
                            {
                                item.poster_path === null ? (
                                    <picture className="img_none">
                                        <span className="blind">이미지 없음</span>
                                    </picture>
                                ) : (
                                    <picture>
                                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="Movie Poster" loading="lazy"/>
                                    </picture>
                                )

                            }

                            <p className="tit">
                                {item.title || item.name}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}