import './../App.scss';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {seasonActions} from "../util/seasonActions";

export default function SeasonDetail(props) {
    const params = useParams();
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedSeason, setSelectedSeason] = useState(1);

    const dispatch = useDispatch();
    const seasonData = useSelector(state => state.movies.seasonData);

    useEffect(() => {
        async function Api() {
            try {
                await dispatch(seasonActions(params.id, selectedSeason));
            } catch (error) {
                console.error('Eroror', error);
            }
        }
        Api();
        seasonActions()
        },
        []
    );

    // 시리즈 넘버 변경
    const seasonNumber = (event) => {
        setSelectedSeason(event.target.value);
    };

    // 뒤로가기
    const pageBack = () => {
        navigate(-1)
    };

    return (
        <div className="container">

            {
                seasonData ? (
                    <section className="series_detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${seasonData?.backdrop_path})` }}>
                        <div className="series_tit">
                            <button className="series_back" onClick={pageBack}>뒤로 가기</button>
                            <picture className="series_img">
                                <img src={seasonData.poster_path ? `https://image.tmdb.org/t/p/w500/${seasonData.poster_path}` : ``} alt="" loading="lazy"/>
                            </picture>
                            <p className="overview">
                                {seasonData.overview}
                            </p>
                        </div>
                        <div className="series_info">
                            {/*<select className="series_select" onChange={seasonNumber}>*/}
                            {/*    {*/}
                            {/*        detailData.seasons?.map((item, key) => {*/}
                            {/*            return (*/}
                            {/*                <option key={key} value={item.season_number}>*/}
                            {/*                    {item.name}*/}
                            {/*                </option>*/}
                            {/*            )*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*</select>*/}
                            <ul className="episode_list">
                                {
                                    seasonData.episodes.map((item, index) => {
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
