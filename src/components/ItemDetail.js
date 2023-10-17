import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './../App.scss';
import {movieApi} from "../util/movieApi";
import {useEffect, useState, useRef} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import List from "./List";
import VideoModal from "./VideoModal";

export default function ItemDetail() {
    const params = useParams();
    const [dataUrl, setDataUrl] = useState();
    const [dataId, setDataId] = useState();
    const [seasonUrl, setSeasonUrl] = useState();
    const [episodeUrl, setEpisodeUrl] = useState();
    const [creditsUrl, setCreditsUrl] = useState();
    const [similarUrl, setSimilarUrl] = useState();
    const [socialUrl, setSocialUrl] = useState();
    const [imagesUrl, setImagesUrl] = useState();
    const [videoUrl, setVideoUrl] = useState();

    const [mediaType, setMediaType] = useState('backdrops');
    const [overviewMore, setOverviewMore] = useState(false);
    const textContainerRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const seriesId = params.id;
    const seasonNumber = seasonUrl?.season_number;

    const [videoModal, setVideoModal] = useState(false);
    const [videoLink, setVideoLink] = useState();
    const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });


    const videoMore = (item) => {
        setVideoModal(!videoModal);
        const videoPath = item.file_path;
        setVideoLink(videoPath);

        const video_width = item.width;
        const video_height = item.height;
        setVideoSize({ width: video_width, height: video_height });
    };
    const videoModalClose = () => {
        setVideoModal(!videoModal);
    }


    console.log(imagesUrl)
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

    // 미디어 - 배경,포스터
    const mediaTab = (type) => {
        setMediaType(type);
    }

    useEffect(() => {
        async function Api() {
           try {
               window.scrollTo(0, 0);
               const detail = await movieApi.detail(params.type, params.id);
               const credits = await movieApi.credits(params.type, params.id);
               const similar = await movieApi.similar(params.type, params.id);
               const social = await movieApi.social(params.type, params.id);

               const videos = await movieApi.seasonVideo(496243);
               const textContainer = textContainerRef.current;
               setDataUrl(detail.data);
               setCreditsUrl(credits.data.cast);
               setSimilarUrl(similar.data.results);
               setSocialUrl(social.data);
               setVideoUrl(videos.data.results)

                // 이미지
               const images = await movieApi.seasonImg(496243);
               setImagesUrl(images.data);



               console.log(videos.data.results)

               // tv 시리즈
               if (params.type === 'tv') {
                   const seasons = await movieApi.seasons(params.id, dataUrl?.number_of_seasons);
                   setSeasonUrl(seasons.data);
                   const episode = await movieApi.episode(params.id, dataUrl?.number_of_seasons, '1');
                   setEpisodeUrl(episode.data);
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
                            <div className="title">
                                <h2>현재 시즌</h2>
                                <Link to={`/series/${params.id}/episode`} className="season_link">
                                    전체 시즌 보기
                                </Link>
                            </div>
                            <div className="season_box">
                                <Link to={`/series/${params.id}/episode`} className="season_main">
                                    <img src={`https://image.tmdb.org/t/p/w500/${seasonUrl.poster_path}`} alt="" loading="lazy"/>
                                </Link>
                                <List type={params.type} list={seasonList} class={"season_list"}></List>
                            </div>
                        </div>
                        : null
                }

                <div className="title">
                    <h2>미디어</h2>
                    <ul className="type_list">
                        <li>
                            <button type="button" className={mediaType === 'backdrops' ? 'active' : ''} onClick={() => mediaTab('backdrops')} >동영상</button>
                        </li>
                        <li>
                            <button type="button" className={mediaType === 'backdrops' ? 'active' : ''} onClick={() => mediaTab('backdrops')}>배경</button>
                        </li>
                        <li>
                            <button type="button" className={mediaType === 'posters' ? 'active' : ''} onClick={() => mediaTab('posters')}>포스터</button>
                        </li>
                    </ul>
                </div>
                <Swiper slidesPerView={'auto'} className="media_slide">
                    {
                        imagesUrl && imagesUrl[mediaType].map((item, index) => (
                            <SwiperSlide key={index} className="bg_card">
                                <button type="button" className="media_link" onClick={() => videoMore(item)}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt="Movie Poster" loading="lazy" />
                                </button>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <div className="title"><h2>비슷한 작품</h2></div>
                <List type={params.type} list={similarArray} class={"item_list"}></List>


                {
                    videoModal && (
                        <div className="video_modal">
                            <div className="inner">
                                <a href={`https://www.themoviedb.org/t/p/original${videoLink}`} target="_blank">
                                    <img src={`https://image.tmdb.org/t/p/w500${videoLink}`} alt="Movie Poster" loading="lazy" />
                                </a>
                                <p className="img_txt">이미지를 클릭하여 원본 ({videoSize.width}X{videoSize.height})을 확인 해보세요!</p>
                                <button type="button" className="modal_close" onClick={videoModalClose}>
                                    <span className="blind">닫기</span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
