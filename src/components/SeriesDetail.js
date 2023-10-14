import './../App.scss';
import {useEffect, useState} from "react";
import {movieApi} from "../util/movieApi";
import {useParams} from "react-router-dom";

export default function SeriesDetail() {
    const { id, seriesNumber } = useParams();
    const [seasonUrl, setSeasonUrl] = useState();
    useEffect(() => {
        async function Api() {
            try {
                const seasons = await movieApi.seasons(id, '1');
                setSeasonUrl(seasons.data);
            } catch (error) {
                console.error('Eroror', error);
            }
        } Api();
    }, []);

    console.log(seasonUrl)

    return (
        <div className="container">
            {
                seasonUrl ? (
                    <section className="series_detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${seasonUrl?.backdrop_path})` }}>
                        <picture className="series_img">
                            <img src={`https://image.tmdb.org/t/p/w500/${seasonUrl.poster_path}`} alt="" loading="lazy"/>
                            <h3 className="tit">
                                {seasonUrl.name}
                            </h3>
                            <p className="overview">
                                {seasonUrl.overview}
                            </p>
                        </picture>
                        <div className="series_info">
                            <select>
                                <option value="">{seasonUrl.name}</option>
                            </select>
                            <ul className="episode_list">
                                {
                                    seasonUrl.episodes.map((item) => {
                                        return (
                                            <li>
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
                                                        {item.overview}
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
