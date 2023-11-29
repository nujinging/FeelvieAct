import './../scss/seasonDetail.scss'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {seasonActions} from "../actions/seasonActions";
import {movieActions} from "../actions/movieActions";
import Loading from "./Loading";
import AxiosError from "./AxiosError";
import useScrollTop from "../hooks/useScrollTop";
import useScrollFixed from "../hooks/useScrollFixed";

export default function SeasonDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const [selectSeason, SetSelectSeason] = useState();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const detailData = useSelector(state => state.movies.movieData);
    const seasonData = useSelector(state => state.movies.seasonData);

    // 공통 스크롤 감지
    const scrollFixed = useScrollFixed();

    /* 마지막 시즌부터 보여주기 */
    const lastSeason = detailData?.number_of_seasons;

    /* 연도만 보여주기 */
    const year = detailData?.first_air_date.substring(0, 4);

    // 시리즈 넘버 변경
    const seasonNumber = (event) => {
        SetSelectSeason(event.target.value);
    };

    // 뒤로가기
    const pageBack = () => {
        navigate(-1)
    };

    useEffect(() => {
            async function fetchApi() {
                try {
                    window.scrollTo(0, 0);
                    setLoading(true);
                    await dispatch(movieActions(params.type, params.id));
                    if (selectSeason === undefined) {
                        await dispatch(seasonActions(params.id, lastSeason));
                    } else {
                        await dispatch(seasonActions(params.id, selectSeason));
                    }
                } catch (error) {
                    console.error(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }

            fetchApi();
            movieActions();
            seasonActions();
        },
        [lastSeason, selectSeason]
    );

    return (
        <>
            {
                error ? (
                    <AxiosError></AxiosError>
                ) : (
                    <div className="container">
                        <section className="season_detail"
                                 style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${detailData?.backdrop_path})`}}>
                            <div className="season_poster">
                                <button className="season_back" onClick={pageBack}>메인으로 돌아가기</button>
                                <picture className="season_img">
                                    <img
                                        src={seasonData?.poster_path ? `https://image.tmdb.org/t/p/w342${seasonData?.poster_path}` : ``}
                                        alt="" loading="lazy"/>
                                </picture>
                                <div className="season_tit">
                                    <span className="season_date">
                                        {year}
                                    </span>
                                    <p>
                                        {detailData?.name}
                                    </p>
                                </div>
                            </div>

                        </section>
                        <div className="episode_info">
                            <select className="season_select" onChange={seasonNumber}
                                    value={selectSeason || lastSeason}>
                                {
                                    detailData?.seasons?.map((item, key) => {
                                        return (
                                            <option key={key} value={item.season_number}>
                                                {item.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            {
                                loading ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <ul className="episode_list">
                                            {
                                                seasonData?.episodes.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {
                                                                item.still_path === null ? (
                                                                    <picture className="img_none">
                                                                        <span className="blind">이미지 없음</span>
                                                                    </picture>
                                                                ) : (
                                                                    <picture className="episode_img">
                                                                        <img
                                                                            src={`https://www.themoviedb.org/t/p/w342${item.still_path}`}
                                                                            alt=""/>
                                                                    </picture>
                                                                )
                                                            }


                                                            <div className="episode_txt">
                                                    <span className="date">
                                                        {item.air_date}
                                                    </span>
                                                                <h3 className="tit">
                                                                    {item.episode_number}. {item.name}
                                                                </h3>
                                                                <p className="overview">
                                                                    {item.overview || '아직 줄거리 내용이 업로드 되지 않았어요!'}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        {
                                            seasonData?.episodes.length === 0 && (
                                                <p className="episodes_none">이 시즌에는 아직 에피소드가 추가되지 않았어요😢</p>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                        {
                            scrollFixed && (
                                <button type="button" className="top_btn" onClick={useScrollTop}>
                                    <span className="blind">위로</span>
                                </button>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}
