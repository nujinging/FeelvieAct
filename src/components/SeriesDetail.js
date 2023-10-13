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
                    <section className="series_detail">
                        <picture>
                            <img src={`https://image.tmdb.org/t/p/w500/${seasonUrl.poster_path}`} alt="" loading="lazy"/>
                        </picture>
                        <div className="series_info">
                        </div>
                    </section>
                ) : null
            }
        </div>
    );
}
