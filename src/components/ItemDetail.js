import "swiper/css";
import './../App.scss';
import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {movieActions} from "../util/movieActions";
import {seasonActions} from "../util/seasonActions";
import List from "./List";
import NotFound from "./NotFound";
import SeasonList from "./SeasonList";
import MediaDetail from "./MediaDetail";

export default function ItemDetail() {
    const params = useParams();
    const textContainerRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const dispatch = useDispatch();
    const detailData = useSelector(state => state.movies.movieData);
    const creditsData = useSelector(state => state.movies.creditsData);
    const socialData = useSelector(state => state.movies.socialData);
    const recommendData = useSelector(state => state.movies.recommendData);
    const ottData = useSelector(state => state.movies.ottData);
    const seriesData = useSelector(state => state.movies.seriesData);

    /* 소셜 */
    const socialMedia = [
        {name: '페이스북', url: 'http://www.facebook.com', class: "facebook", link: `${socialData?.facebook_id}`},
        {name: '트위터', url: 'http://www.twitter.com', class: "twitter", link: `${socialData?.twitter_id}`},
        {name: '인스타그램', url: 'http://www.instagram.com', class: "instagram", link: `${socialData?.instagram_id}`}
    ]

    /* 등장인물 */
    const creditsArray = creditsData ? creditsData.slice(0, 5) : [];

    /* 비슷한 작품 */
    const recommendArray = recommendData ? recommendData.slice(0, 5) : [];

    // 영화 상세설명 더보기
    const handleToggleButtonClick = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        async function Api() {
            try {
                window.scrollTo(0, 0);
                await dispatch(movieActions(params.type, params.id));
                await dispatch(seasonActions(params.id, detailData?.number_of_seasons));
                const textContainer = textContainerRef.current;

                // 영화 상세설명
                const handleResize = () => {
                    if (textContainer) {
                        setIsOverflowed(textContainer.scrollHeight > textContainer.clientHeight);
                    }
                };
                handleResize();
                window.addEventListener('resize', handleResize);


                return () => {
                    window.removeEventListener('resize', handleResize);
                };
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // AxiosError에서 404 상태 코드를 확인하여 NotFoundComponent를 렌더링
                    <NotFound />
                } else {
                    // 다른 오류 처리
                    console.log('오류')
                }
            }
        }

        Api();
        movieActions();
        seasonActions();
    }, [params.type, params.id]);


    return (
        <div>
            <section className="detail_container"
                     style={{
                         backgroundImage: `url(${detailData?.backdrop_path ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${detailData?.backdrop_path}` : ''})`
                     }}
            >
            <div className="detail_info">
                    <h1 className="tit">
                        {detailData?.title || detailData?.name}
                    </h1>
                    <div className="meta">
                        <span className="type">{params.type === 'movie' ? 'MOVIE' : 'TV'}</span>
                        {detailData?.genres.map((item, index) => {
                            return (
                                <span className="txt" key={index}>
                                    {item.name}
                                </span>
                            )
                        })}
                        {
                            detailData?.first_air_date || detailData?.release_date ? (
                                <span className="date">{detailData?.release_date || detailData?.first_air_date}</span>
                            ) : null
                        }
                    </div>

                    {
                        ottData && (ottData.buy || ottData.flatrate) ? (
                            <div className="ott_box">
                                <h3 className="ott_tit">OTT</h3>
                                <div className="ott_wrap">
                                    {
                                        ottData.buy &&  (
                                            <div className="ott_list">
                                                <h4 className="ott_txt">BUY</h4>
                                                <ul>
                                                    {
                                                        ottData.buy && ottData.buy.map((item, index) => (
                                                            <li key={index}>
                                                                <img
                                                                    src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
                                                                    alt=""/>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                    {
                                        ottData.flatrate && (
                                            <div className="ott_list">
                                                <h4 className="ott_txt">Streaming</h4>
                                                <ul>
                                                    {
                                                        ottData?.flatrate && ottData?.flatrate.map((item, index) => (
                                                            <li key={index}>
                                                                <img
                                                                    src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
                                                                    alt=""/>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        ) : null
                    }

                    {
                        detailData?.overview || detailData?.tagline ? (
                            <div className="comment">
                                {
                                    detailData?.tagline && (
                                        <p className="quites">
                                            {detailData?.tagline}
                                        </p>
                                    )
                                }

                                {
                                    detailData?.overview && (
                                        <p
                                            ref={textContainerRef}
                                            className={`intro ${isExpanded ? 'intro_more' : ''}`}
                                        >
                                            {detailData?.overview}
                                        </p>
                                    )
                                }

                                {isOverflowed && (
                                    <button
                                        className="btn_more"
                                        onClick={handleToggleButtonClick}
                                    >
                                        {isExpanded ? '접기' : '더보기'}
                                    </button>
                                )}
                            </div>
                        ) : null
                    }
                </div>
                <div className="detail_poster">
                    <ul className="social_links">
                        {socialMedia.map((item, index) => {
                            return item.link !== "null" ? (
                                <li key={index}>
                                    <a href={`${item.url}/${item.link}`} className={`${item.class}`} target="_blank" rel="noreferrer">
                                        <span className="blind">{item.name}</span>
                                    </a>
                                </li>
                            ) : null;
                        })}
                    </ul>
                    <picture>
                        <img src={detailData?.poster_path ? `https://image.tmdb.org/t/p/w500/${detailData?.poster_path}` : ``} alt="Movie Poster"
                             loading="lazy"/>
                    </picture>
                </div>
            </section>
            <div className="item_container">
                <div className="title"><h2>등장인물</h2></div>
                <List type={params.type} list={creditsArray} class={"person_list"}></List>

                {params.type === 'tv' && seriesData && <SeasonList />}

                <MediaDetail></MediaDetail>

                {
                    (recommendData && recommendData.length !== 0) && (
                            <div>
                                <div className="title"><h2>비슷한 작품</h2></div>
                                <List type={params.type} list={recommendArray} class={"item_list"}></List>
                            </div>
                    )
                }


            </div>
        </div>
    );
}
