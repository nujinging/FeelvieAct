import "swiper/css";
import './../App.scss';
import {movieApi} from "../util/movieApi";
import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {movieActions} from "../actions/movieActions";
import {seasonActions} from "../actions/seasonActions";
import List from "./List";
import NotFound from "./NotFound";
import SeasonList from "./SeasonList";
import MediaDetail from "./MediaDetail";

export default function ItemDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const detailData = useSelector(state => state.movies.movieData);
    const socialData = useSelector(state => state.movies.socialData);
    const seasonData = useSelector(state => state.movies.seasonData);

    const [ottUrl, setOttUrl] = useState();
    const [creditsUrl, setCreditsUrl] = useState();
    const [creditsLoading, setCreditsLoading] = useState();

    const [socialUrl, setSocialUrl] = useState();
    const [recommendUrl, setRecommendUrl] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seasonLoading, setSeasonLoading] = useState(true);

    /* 소셜 */
    const socialMedia = [
        {name: '페이스북', url: 'http://www.facebook.com', class: "facebook", link: `${socialData?.facebook_id}`},
        {name: '트위터', url: 'http://www.twitter.com', class: "twitter", link: `${socialData?.twitter_id}`},
        {name: '인스타그램', url: 'http://www.instagram.com', class: "instagram", link: `${socialData?.instagram_id}`}
    ]

    /* 등장인물 */
    const creditsArray = creditsUrl ? creditsUrl.slice(0, 5) : [];

    useEffect(() => {
        async function Api() {
            try {
                setLoading(true);
                window.scrollTo(0, 0);
                await dispatch(movieActions(params.type, params.id));
                setLoading(false);
                await dispatch(seasonActions(params.id, 1));
                setSeasonLoading(false);

                const ottList = await movieApi.ottList(params.type, params.id);
                const credits = await movieApi.credits(params.type, params.id);
                const social = await movieApi.social(params.type, params.id);
                const recommend = await movieApi.recommend(params.type, params.id);
                setCreditsUrl(credits.data.cast);
                setCreditsLoading(false);

                setSocialUrl(social.data);
                setRecommendUrl(recommend.data.results);
                setOttUrl(ottList.data.results.KR);

                return () => {
                };
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // AxiosError에서 404 상태 코드를 확인하여 NotFoundComponent를 렌더링
                    <NotFound/>
                } else {
                    <NotFound/>
                }
                setLoading(false);
            }
        }

        Api();
    }, [params.type, params.id, detailData?.number_of_seasons, setLoading]);


    return (
        <>

            {
                loading ? (
                    <section className="detail_container">
                        <div className="loading">
                            <span className="loader"></span>
                        </div>
                    </section>

                ) : (
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
                                {detailData?.genres && detailData?.genres.map((item, index) => {
                                    return (
                                        <span className="txt" key={index}>
                                    {item.name}
                                </span>
                                    )
                                })}
                                {
                                    detailData?.first_air_date || detailData?.release_date ? (
                                        <span
                                            className="date">{detailData?.release_date || detailData?.first_air_date}</span>
                                    ) : null
                                }
                            </div>

                            {
                                ottUrl && (ottUrl.buy || ottUrl.flatrate) ? (
                                    <div className="ott_box">
                                        <h3 className="ott_tit">OTT</h3>
                                        <div className="ott_wrap">
                                            {
                                                ottUrl.buy && (
                                                    <div className="ott_list">
                                                        <h4 className="ott_txt">BUY</h4>
                                                        <ul>
                                                            {
                                                                ottUrl.buy && ottUrl.buy.map((item, index) => (
                                                                    <li key={index}>
                                                                        <img
                                                                            src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                                                                            alt=""/>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            }

                                            {
                                                ottUrl.flatrate && (
                                                    <div className="ott_list">
                                                        <h4 className="ott_txt">Streaming</h4>
                                                        <ul>
                                                            {
                                                                ottUrl?.flatrate && ottUrl?.flatrate.map((item, index) => (
                                                                    <li key={index}>
                                                                        <img
                                                                            src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
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
                                        <p className={`intro`}>
                                            {detailData?.overview}
                                        </p>

                                        <button className="btn_more">
                                            접기
                                        </button>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="detail_poster">
                            <ul className="social_links">
                                {socialMedia.map((item, index) => {
                                    return item.link !== "null" ? (
                                        <li key={index}>
                                            <a href={`${item.url}/${item.link}`} className={`${item.class}`}
                                               target="_blank" rel="noreferrer">
                                                <span className="blind">{item.name}</span>
                                            </a>
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                            <picture>
                                <img
                                    src={detailData?.poster_path ? `https://image.tmdb.org/t/p/w500/${detailData?.poster_path}` : ``}
                                    alt="Movie Poster"
                                    loading="lazy"/>
                            </picture>
                        </div>
                    </section>
                )
            }


            {
                loading ? (
                    <div className="loading">
                        <span className="loader"></span>
                    </div>
                ) : <div className="item_container">
                    <div className="item">
                        <div className="title"><h2>등장인물</h2></div>
                        <List type={params.type} list={creditsArray} class={"person_list"}></List>
                    </div>


                    {params.type === 'tv' && seasonData && <SeasonList/>}

                    <MediaDetail></MediaDetail>

                    {
                        (recommendUrl && recommendUrl.length !== 0) && (
                            <div className="item">
                                <div className="title"><h2>비슷한 작품</h2></div>
                                <List type={params.type} list={recommendUrl} class={"item_list"}></List>
                            </div>
                        )
                    }
                </div>
            }

        </>
    );
}
