import './../App.scss';
import {Link, useParams } from "react-router-dom";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";
import List from "./List";



export default function ItemDetail() {
    const params = useParams();
    const [dataUrl, setDataUrl] = useState();
    const [creditsUrl, setCreditsUrl] = useState();
    const [similarUrl, setSimilarUrl] = useState();
    const [socialUrl, setSocialUrl] = useState();
    const [overviewMore, setOverviewMore] = useState(false);



    const overviewToggle = () => {
        setOverviewMore(!overviewMore);
    }
    useEffect(() => {
        async function Api() {
            window.scrollTo(0, 0);
            const detail = await movieApi.detail(params.type, params.id);
            const credits = await movieApi.credits(params.type, params.id);
            const similar = await movieApi.similar(params.type, params.id);
            const social = await movieApi.social(params.type, params.id);
            setDataUrl(detail.data);
            setCreditsUrl(credits.data.cast);
            setSimilarUrl(similar.data.results);
            setSocialUrl(social.data)
        }
        Api();
    }, [params.id]);

    /* 소셜 */
    const socialMedia = [
        { name : '페이스북', url : 'http://www.facebook.com', link : `${socialUrl?.facebook_id}`},
        { name : '트위터', url : 'http://www.twitter.com', link : `${socialUrl?.twitter_id}`},
        { name : '인스타그램', url : 'http://www.instagram.com', link : `${socialUrl?.instagram_id}`}
    ]

    /* 등장인물 */
    const creditsArray = creditsUrl ? creditsUrl.slice(0,5) : [];


    /* 비슷한 작품 */
    const similarArray = similarUrl ? similarUrl.slice(0,5): [];

    return (
        <div>
            <section className="detail_container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${dataUrl?.backdrop_path})` }}>
                <div className="detail_info">
                    <h1>{dataUrl?.title}</h1>
                    <div className="meta">
                        {dataUrl?.genres.map(item => {
                            return (
                                <span className="txt">
                                    {item.name}
                                </span>
                            )
                        })}
                    </div>
                    <div className="comment">
                        <p className="quites">
                            {dataUrl?.tagline}
                        </p>
                        <p className={`intro ${overviewMore ? 'intro_more' : ''}`}>
                            {dataUrl?.overview}
                        </p>
                        <button type="button" className="btn_more" onClick={overviewToggle}>
                            {overviewMore ? '접기' : '더보기'}
                        </button>
                    </div>
                </div>
                <div className="detail_poster">
                    <ul className="social_links">
                        {socialMedia.map(item => {
                            return item.link !== "null" ? (
                                <li>
                                    <a href={`${item.url}/${item.link}`} target="_blank">{item.name}</a>
                                </li>
                            ) : null;
                        })}
                    </ul>
                    <picture>
                        <img src={`https://image.tmdb.org/t/p/w500/${dataUrl?.poster_path}`} alt="Movie Poster" />
                    </picture>
                </div>
            </section>
            <div className="item_container">
                <div className="title"><h2>등장인물</h2></div>
                <List type={params.type} list={creditsArray}></List>
                <div className="title"><h2>비슷한 작품</h2></div>
                <List type={params.type} list={similarArray}></List>
            </div>
        </div>
    );
}
