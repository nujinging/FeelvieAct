import './../App.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {movieActions} from "../actions/movieActions";
import LoadingProgress from "./LoadingProgress";

export default function Genre() {
    const {type, number} = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [genreLoading, setGenreLoading] = useState(true);
    const [titleLoading, setTitleLoading] = useState(true);
    const [progressState, setProgressState] = useState(true);
    const [genreTitle, setGenreTitle] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [genreNumber, setGenreNumber] = useState('All');
    const [selectedValue, setSelectedValue] = useState('');

    const calculateProgress = () => {
        return !loading ? 0 : 100;
    };

    const genreChange = async (itemId) => {
        setGenreLoading(true);
        setGenreNumber(itemId);
        setProgressState(true);
        navigate(`/genre/${type}/${itemId}`);
    };


    useEffect(() => {
        async function Api() {
            setLoading(true);
            setGenreLoading(true);
            setTitleLoading(true);
            dispatch(movieActions(type, genreNumber));
            const genre = await movieApi.genreTitle(type);
            setGenreTitle(genre.data.genres);

            if (number === 'All') {
                const popular = await movieApi.popular(type);
                setGenreList(popular.data.results);
                setGenreNumber(number);
            } else {
                const genreUrl = await movieApi.genreList(type, genreNumber);
                setGenreList(genreUrl.data.results);
            }

            if (genreList !== undefined) {
                setLoading(false);
                setProgressState(false);
                setGenreLoading(false);
                setTitleLoading(true);
            }
        }

        Api();
    }, [type, genreNumber, setLoading]);


    const SortClick = async (event) => {
        setGenreLoading(true);
        setSelectedValue(event.target.value);
        if (event.target.value === 'popularityDesc') {
            const genreUrl = await movieApi.genrePopularDesc(type, genreNumber);
            setGenreList(genreUrl.data.results);
        } else if (event.target.value === 'popularityAsc') {
            const genreUrl = await movieApi.genrePopularAsc(type, genreNumber);
            setGenreList(genreUrl.data.results);
        } else if (event.target.value === 'dateDesc') {
            const genreUrl = await movieApi.genreDateDesc(type, genreNumber);
            setGenreList(genreUrl.data.results);
        } else {
            const genreUrl = await movieApi.genreDateAsc(type, genreNumber);
            setGenreList(genreUrl.data.results);
        }
        setGenreLoading(false);
    }

    const pageLink = (itemType, itemId) => {
        navigate(`/detail/${itemType}/${itemId}`);
    }


    return (
        <div className="item_container genre">

            {
                progressState && (
                    <LoadingProgress progress={calculateProgress()}></LoadingProgress>
                )
            }

            {
                titleLoading && (
                    <>
                        <Swiper className="genre_title" slidesPerView={"auto"}>
                            <div className="swiper-wrapper">
                                <SwiperSlide className={`genre_item ${genreNumber === 'All' ? 'active' : ''}`}
                                             onClick={() => genreChange('All')}
                                >
                                    All
                                </SwiperSlide>
                                {genreTitle?.map((item, index) => {
                                    return (
                                        <SwiperSlide className={`genre_item ${genreNumber === item.id ? 'active' : ''}`}
                                                     key={index}
                                                     onClick={() => genreChange(item.id)}>
                                            {item.name}
                                        </SwiperSlide>
                                    )
                                })}
                            </div>
                        </Swiper>
                        <div className="genre_sort">
                            <select onChange={SortClick} value={selectedValue}>
                                <option value="popularityDesc">인기도 내림차순</option>
                                <option value="popularityAsc">인기도 오름차순</option>
                                <option value="dateDesc">상영일 내림차순</option>
                                <option value="dateAsc">상열일 오름차순</option>
                            </select>
                        </div>
                    </>
                )
            }

            {
                genreLoading ? (
                    <div className="loading">
                        <span className="loader"></span>
                    </div>
                ) : (
                    <ul className="genre_list">
                        {genreList?.map((item, index) => {
                            return (
                                <li className="list_card" onClick={() => pageLink(type, item.id)} key={index}>
                                    {
                                        item.poster_path === null ? (
                                            <picture className="img_none">
                                                <span className="blind">이미지 없음</span>
                                            </picture>
                                        ) : (
                                            <picture>
                                                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                                     alt="Movie Poster" loading="lazy"/>
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
                )
            }
        </div>
    );
}