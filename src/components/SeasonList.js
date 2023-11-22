import './../App.scss';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../actions/movieActions";
import {seasonActions} from "../actions/seasonActions";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import Loading from "./Loading";

export default function SeasonList() {
    const params = useParams();
    const dispatch = useDispatch();
    const detailData = useSelector(state => state.movies.movieData);
    const seasonData = useSelector(state => state.movies.seasonData);
    const [loading, setLoading] = useState(true)

    /* 마지막 시즌 먼저 보여주기 */
    const lastSeason = detailData?.number_of_seasons;

    /* 시즌 에피소드 5개 보여주기 */
    const seasonList = seasonData?.episodes[seasonData.episodes.length - 1];

    console.log(lastSeason)

    useEffect(() => {
        async function fetchApi() {
            try {
                await dispatch(movieActions(params.type, params.id));
                await dispatch(seasonActions(params.id, lastSeason));
                setLoading(false);
                console.log(seasonList);
                console.log(seasonData);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchApi();
    }, [params.type, params.id, lastSeason]);

    return (
        <>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <div className="item last_season">
                        <div className="title">
                            <h2>현재 시즌</h2>
                            <Link to={`/${params.type}/season/${params.id}/episode`} className="season_link">
                                전체 시즌 보기
                            </Link>
                        </div>
                        <div className="season_box">
                            {seasonData?.poster_path !== null && (
                                <div className="season_img">
                                    <Link to={`/${params.type}/season/${params.id}/episode`} className="season_main">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w342${seasonData.poster_path}`}
                                            alt={seasonData.poster_path}
                                            loading="lazy"
                                        />
                                    </Link>
                                    <span className="episode_date">마지막 방영<br/>{seasonList.name} {seasonList.air_date}</span>
                                </div>
                            )}

                            <div className="season_txt">

                                <h3>{seasonData.name}</h3>
                                <p className="episode_txt">{seasonData.overview}</p>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
}
