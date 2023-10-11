import './../App.scss';
import {movieApi} from "../util/movieApi";
import {useEffect, useState, useRef} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import List from "./List";

export default function ItemDetail() {
    const params = useParams();
    const [dataUrl, setDataUrl] = useState();
    const [dataId, setDataId] = useState();
    const [seasonUrl, setSeasonUrl] = useState();
    const [creditsUrl, setCreditsUrl] = useState();
    const [similarUrl, setSimilarUrl] = useState();
    const [socialUrl, setSocialUrl] = useState();
    const [overviewMore, setOverviewMore] = useState(false);
    const textContainerRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const seriesId = params.id;

    console.log(seasonUrl)

    // 영화 상세설명
    useEffect(() => {
        const textContainer = textContainerRef.current;
        if (textContainer) {
            setIsOverflowed(textContainer.scrollHeight > textContainer.clientHeight);
        }
    }, []);

    // 영화 상세설명 더보기
    const handleToggleButtonClick = () => {
        setIsExpanded(!isExpanded);
    };

    // 시즌 에피소드 5개 보여주기
    const seasonList = seasonUrl?.episodes.slice(0,5);

    console.log(seasonList)

    // 포스터 클릭 시 시리즈페이지 이동
    const seriesLink = (seriesId) => {
        navigate(`/series/${seriesId}`);
    }

    useEffect(() => {
        async function Api() {
           try {
               window.scrollTo(0, 0);
               const detail = await movieApi.detail(params.type, params.id);
               const credits = await movieApi.credits(params.type, params.id);
               const similar = await movieApi.similar(params.type, params.id);
               const social = await movieApi.social(params.type, params.id);
               const textContainer = textContainerRef.current;
               setDataUrl(detail.data);
               setCreditsUrl(credits.data.cast);
               setSimilarUrl(similar.data.results);
               setSocialUrl(social.data);

               // tv 시리즈
               if (params.type === 'tv') {
                   const seasons = await movieApi.seasons(params.id, dataUrl.number_of_seasons);
                   setSeasonUrl(seasons.data);
               }

               // 영화 상세설명
               const handleResize = () => {
                   if (textContainer) {
                       setIsOverflowed(textContainer.scrollHeight > textContainer.clientHeight);
                   }
               };
               handleResize();
               window.addEventListener('resize', handleResize);
               return () => {
                   window.removeEventListener('resize', handleResize);
               };
           } catch(error) {
               console.error('Eroror', error);
           }
        }
        Api();
    }, [textContainerRef.current, params.id]);

    /* 소셜 */
    const socialMedia = [
        { name : '페이스북', url : 'http://www.facebook.com', class : "facebook", link : `${socialUrl?.facebook_id}`},
        { name : '트위터', url : 'http://www.twitter.com', class : "twitter", link : `${socialUrl?.twitter_id}`},
        { name : '인스타그램', url : 'http://www.instagram.com', class : "instagram", link : `${socialUrl?.instagram_id}`}
    ]

    /* 등장인물 */
    const creditsArray = creditsUrl ? creditsUrl.slice(0,5) : [];

    /* 비슷한 작품 */
    const similarArray = similarUrl ? similarUrl.slice(0,5): [];

    return (
        <div>
            <section className="detail_container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${dataUrl?.backdrop_path})` }}>
                <div className="detail_info">
                    <h1>{dataUrl?.title || dataUrl?.name}</h1>
                    <div className="meta">
                        {dataUrl?.genres.map(item => {
                            return (
                                <span className="txt" key={item.id}>
                                    {item.name}
                                </span>
                            )
                        })}
                    </div>
                    <div className="comment">
                        <p className="quites">
                            {dataUrl?.tagline}
                        </p>
                        <p
                            ref={textContainerRef}
                            className={`intro ${isExpanded ? 'intro_more' : ''}`}
                        >
                            {dataUrl?.overview}
                        </p>

                        {isOverflowed && (
                            <button
                                className="btn_more"
                                onClick={handleToggleButtonClick}
                            >
                                {isExpanded ? '접기' : '더보기'}
                            </button>
                        )}
                    </div>
                </div>
                <div className="detail_poster">
                    <ul className="social_links">
                        {socialMedia.map(item => {
                            return item.link !== "null" ? (
                                <li>
                                    <a href={`${item.url}/${item.link}`} className={`${item.class}`} target="_blank" key={item.id}>
                                        <span className="blind">{item.name}</span>
                                    </a>
                                </li>
                            ) : null;
                        })}
                    </ul>
                    <picture>
                        <img src={`https://image.tmdb.org/t/p/w500/${dataUrl?.poster_path}`} alt="Movie Poster" loading="lazy"/>
                    </picture>
                </div>
            </section>
            <div className="item_container">
                <div className="title"><h2>등장인물</h2></div>
                <List type={params.type} list={creditsArray} class={"person_list"}></List>

                {
                    seasonUrl && seasonUrl.name !== undefined ?
                        <div className="last_season">
                            <div className="title"><h2>현재 시즌</h2></div>
                            <div className="season_box">
                                <Link to={`/series/${seriesId}`} className="season_main">
                                    <img src={`https://image.tmdb.org/t/p/w500/${seasonUrl.poster_path}`} alt="" />
                                </Link>
                                <List type={params.type} list={seasonList} class={"season_list"}></List>
                            </div>
                        </div>
                        : null
                }

                <div className="title"><h2>비슷한 작품</h2></div>
                <List type={params.type} list={similarArray} class={"item_list"}></List>
            </div>
        </div>
    );
}
