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
                console.log()
                console.log(seriesNumber)
                console.log(seasons.data)
            } catch (error) {
                console.error('Eroror', error);
            }
        } Api();
    }, []);

    return (
        <div className="container">
            <section className="series_detail">
                <picture>
                    {/*<img src={} alt="Person Poster" loading="lazy"/>*/}
                </picture>
                <div className="profile_info">
                </div>
            </section>
        </div>
    );
}
