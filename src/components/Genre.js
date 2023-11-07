import './../App.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi";
import {useEffect, useLayoutEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../actions/movieActions";
import LoadingProgress from "./LoadingProgress";

export default function Genre() {
    const {type} = useParams();
    const navigate = useNavigate();

    const [genreTitle, setGenreTitle] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [genreNumber, setGenreNumber] = useState('16');
    const [selectedValue, setSelectedValue] = useState('');
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const genreData = useSelector(state => state.movies.genreData);
    const genrePopularDescData = useSelector(state => state.movies.genrePopularDescData);
    const genrePopularAscData = useSelector(state => state.movies.genrePopularAscData);
    const genreDateDescData = useSelector(state => state.movies.genreDateDescData);
    const genreDateAscData = useSelector(state => state.movies.genreDateAscData);


    const [progressState, setProgressState] = useState(true);

    const calculateProgress = () => {
        return loading ? 0 : 100;
    };

    const genreChange = async (itemId) => {
        setLoading(true);
        setGenreNumber(itemId);
        setProgressState(true);
    };

    useEffect(() => {
        async function Api() {
            dispatch(movieActions(type, genreNumber));
            console.log(loading)

            if (genreData !== undefined) {
                setLoading(false);
                setTimeout(()=> {
                    setProgressState(false);
                }, 500)
            }

            const genre = await movieApi.genreTitle(type);
            setGenreTitle(genre.data.genres);
        }
        setLoading(false);
        Api();
        movieActions();
    }, [genreNumber, genreData]);




    const SortClick = async (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'popularityDesc') {
            setGenreList(genrePopularDescData);
        } else if (event.target.value === 'popularityAsc') {
            setGenreList(genrePopularAscData);
        } else if (event.target.value === 'dateDesc') {
            setGenreList(genreDateDescData);
        } else {
            setGenreList(genreDateAscData);
        }
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


            <Swiper className="genre_title" slidesPerView={"auto"}>
                {/*<SwiperSlide className={`genre_item ${genreNumber === 'All' ? 'active' : ''}`}*/}
                {/*             onClick={() => genreChange('All')}>*/}
                {/*    All*/}
                {/*</SwiperSlide>*/}
                {genreTitle?.map((item, index) => {
                    return (
                        <SwiperSlide className={`genre_item ${genreNumber === item.id ? 'active' : ''}`} key={index}
                                     onClick={() => genreChange(item.id)}>
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

            {
                !progressState && (
                    <ul className="genre_list">
                        {genreData?.map((item, index) => {
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