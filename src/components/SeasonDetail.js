import './../App.scss';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {seasonActions} from "../util/seasonActions";
import {movieActions} from "../util/movieActions";

export default function SeasonDetail() {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const detailData = useSelector(state => state.movies.movieData);
    const seasonData = useSelector(state => state.movies.seasonData);

    const year = detailData?.first_air_date.substring(0, 4);

    const [selectSeason, SetSelectSeason] = useState();
    const lastSeason = detailData?.number_of_seasons;

    console.log(detailData)
    console.log(seasonData)

    useEffect(() => {
        async function Api() {
            try {
                window.scrollTo(0, 0);
                await dispatch(movieActions(params.type, params.id));
                if (selectSeason === undefined) {
                    await dispatch(seasonActions(params.id, lastSeason));
                } else {
                    await dispatch(seasonActions(params.id, selectSeason));
                }

            } catch (error) {
                console.error('Eroror', error);
            }
        }
        Api();
        movieActions();
        seasonActions();
        },
        [lastSeason, selectSeason]
    );

    // 시리즈 넘버 변경
    const seasonNumber = (event) => {
        SetSelectSeason(event.target.value);
    };

    // 뒤로가기
    const pageBack = () => {
        navigate(-1)
    };

    return (
        <div className="container">
            <section className="series_detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${detailData?.backdrop_path})` }}>
                <div className="series_poster">
                    <button className="series_back" onClick={pageBack}>메인으로 돌아가기</button>
                    <picture className="series_img">
                        <img src={seasonData?.poster_path ? `https://image.tmdb.org/t/p/w500/${seasonData?.poster_path}` : ``} alt="" loading="lazy"/>
                    </picture>
                    <p className="series_tit">
                        <span className="series_date">
                            {year}
                        </span>
                        {detailData?.name}
                    </p>
                </div>

            </section>
            <div className="series_info">
                <select className="series_select" onChange={seasonNumber} value={selectSeason || lastSeason}>
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
                <ul className="episode_list">
                    {
                        seasonData?.episodes.map((item, index) => {
                            return (
                                <li key={index}>
                                    <picture className="episode_img">
                                        <img src={`https://www.themoviedb.org/t/p/w454_and_h254_bestv2/${item.still_path}`} alt=""/>
                                    </picture>
                                    <div className="episode_info">
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
            </div>

        </div>
    );
}
