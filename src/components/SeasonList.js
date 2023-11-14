import './../App.scss';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../actions/movieActions";
import {seasonActions} from "../actions/seasonActions";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

export default function SeasonList() {
    const params = useParams();
    const dispatch = useDispatch();
    const detailData = useSelector(state => state.movies.movieData);
    const seasonData = useSelector(state => state.movies.seasonData);
    const [loading, setLoading] = useState(true)

    /* 마지막 시즌 먼저 보여주기 */
    const lastSeason = detailData?.number_of_seasons;

    /* 시즌 에피소드 5개 보여주기 */
    const seasonList = seasonData?.episodes.slice(0, 5);

    useEffect(() => {
        async function Api() {
            try {
                await dispatch(movieActions(params.type, params.id));
                await dispatch(seasonActions(params.id, lastSeason));
                window.scrollTo(0, 0);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        Api();
    }, [params.type, params.id, lastSeason]);

    return (
        <div className="item last_season">
            <div className="title">
                <h2>현재 시즌</h2>
                <Link to={`/${params.type}/season/${params.id}/episode`} className="season_link">
                    전체 시즌 보기
                </Link>
            </div>


            <div className="season_box">
                <Link to={`/${params.type}/season/${params.id}/episode`} className="season_main">
                    <img src={seasonData?.poster_path ? `https://image.tmdb.org/t/p/w342${seasonData?.poster_path}` : ``} alt=""
                         loading="lazy"/>
                </Link>

                {loading ? (
                    <p>로딩</p>
                ) : (
                    <Swiper slidesPerView={'auto'} navigation={true} modules={[Navigation]} className={`swiper season_list`}>
                        {seasonList.map(item => (
                            <SwiperSlide className={`list_card item_card`} key={item.id}>
                                <div className={`card_show `}>
                                    <img
                                        src={item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : (item.profile_path ? `https://image.tmdb.org/t/p/w154${item.profile_path}` : (item.still_path ? `https://image.tmdb.org/t/p/w500/${item.still_path}` : ''))}
                                        alt="Movie Poster"
                                        loading="lazy"
                                    />
                                    <h3>{item.title || item.name}</h3>
                                    {item.air_date && (
                                        <div>
                                            <span className="episode_date">{item.air_date}</span>
                                            <p className="episode_txt">{item.overview}</p>
                                        </div>
                                    )}
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
}
