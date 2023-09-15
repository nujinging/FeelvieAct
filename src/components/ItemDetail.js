import './../App.scss';
import {Link, useParams} from "react-router-dom";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";
import List from "./List";



export default function ItemDetail() {
    const params = useParams();
    const [dataUrl, setDataUrl] = useState();
    const [creditsUrl, setCreditsUrl] = useState();

    useEffect(() => {
        async function Api() {
            const detail = await movieApi.detail(params.id);
            const credits = await movieApi.credits(params.id);
            setDataUrl(detail.data);
            setCreditsUrl(credits.data.cast);
        }
        Api();
    }, [params.itemId]);


    const creditsArray = creditsUrl ? creditsUrl.slice(0,5) : [];



    return (
        <div>
            <section className="detail_container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${dataUrl?.backdrop_path})` }}>
                <div className="detail_info">
                    <h1>{dataUrl?.title}</h1>
                    <div className="meta">
                        <span className="txt">액션</span>
                    </div>
                    <div className="comment">
                        <p className="quites">
                            {dataUrl?.tagline}
                        </p>
                        <p className="intro">
                            {dataUrl?.overview}
                        </p>
                    </div>
                </div>
                <div className="detail_poster">
                    <ul className="social_links">
                        <li>
                            <Link href="">페이스북</Link>
                        </li>
                    </ul>
                    <picture>
                        <img src={`https://image.tmdb.org/t/p/w500/${dataUrl?.poster_path}`} alt="Movie Poster" />
                    </picture>
                </div>
            </section>
            <div className="item_container">
                <List list={creditsArray}></List>
            </div>
        </div>
    );
}
