import './../App.scss';
import {useEffect, useState} from "react";
import {movieApi} from "../util/movieApi";
import {useParams} from "react-router-dom";

export default function SeriesDetail() {
    const { id, seriesNumber } = useParams();
    const [episodeUrl, setEpisodeUrl] = useState();
    useEffect(() => {
        async function Api() {
            try {
                const episode = await movieApi.episode('456', '1', '1');
                setEpisodeUrl(episode.data);
                console.log(id)
                console.log(seriesNumber)
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
