import './../App.scss';
import {useEffect, useState} from "react";
import {movieApi} from "../util/movieApi";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {movieActions} from "../util/movieActions";

export default function SeasonDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detailUrl, setDetailUrl] = useState([]);
    const [seasonUrl, setSeasonUrl] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        async function Api() {
            try {
                const seasons = await movieApi.seasons(id, selectedSeason);
                setSeasonUrl(seasons.data);
                const detail = await movieApi.detail('tv', id);
                setDetailUrl(detail.data.seasons);
                await dispatch(movieActions());
            } catch (error) {
                console.error('Eroror', error);
            }
        } Api();movieActions()},
        [id, selectedSeason,dispatch]
    );

    // 시리즈 넘버 변경
    const seriesNumber = (event) => {
        setSelectedSeason(event.target.value);
    };

    // 뒤로가기
    const pageBack = () => {
        navigate(-1)
    };

    return (
        <div className="container">

            {
                seasonUrl ? (
                    <section className="series_detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${seasonUrl?.backdrop_path})` }}>
                        <div className="series_tit">
                            <button className="series_back" onClick={pageBack}>뒤로 가기</button>
                            <picture className="series_img">
                                <img src={seasonUrl.poster_path ? `https://image.tmdb.org/t/p/w500/${seasonUrl.poster_path}` : ``} alt="" loading="lazy"/>
                            </picture>
                            <p className="overview">
                                {seasonUrl.overview}
                            </p>
                        </div>
                        <div className="series_info">
                            <select className="series_select" onChange={seriesNumber}>
                                {
                                    detailUrl?.map((item, key) => {
                                        return (
                                            <option key={key} value={item.season_number}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <ul className="episode_list">
                                {
                                    seasonUrl.episodes.map((item, index) => {
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
                                                        {item.name}
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
                    </section>
                ) : null
            }
        </div>
    );
}
