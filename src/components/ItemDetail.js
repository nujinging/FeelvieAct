import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import './../App.scss';
import {movieApi} from "../util/movieApi";
import {useEffect, useState, useRef} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {movieActions} from "../util/movieActions";
import List from "./List";
import NotFound from "./NotFound";

export default function ItemDetail() {
    const params = useParams();
    const [dataUrl, setDataUrl] = useState();
    const [dataId, setDataId] = useState();
    const [seasonUrl, setSeasonUrl] = useState();
    const [creditsUrl, setCreditsUrl] = useState();
    const [similarUrl, setSimilarUrl] = useState();
    const [socialUrl, setSocialUrl] = useState();
    const [videoUrl, setVideoUrl] = useState([]);
    const [recommendUrl, setRecommendUrl] = useState([]);
    const [imagesUrl, setImagesUrl] = useState({backdrops: [], posters: []});


    const [mediaType, setMediaType] = useState('video');
    const [overviewMore, setOverviewMore] = useState(false);
    const textContainerRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const seriesId = params.id;
    const [ottUrl, setOttUrl] = useState();

    const seasonNumber = seasonUrl?.season_number;


    const [imgModal, setImgModal] = useState(false);

    const [videoOpen, setVideoOpen] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState();


    const [videoLink, setVideoLink] = useState();
    const [videoSize, setVideoSize] = useState({width: 0, height: 0});


    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);

    // 미디어 - 배경,포스터
    const mediaTab = (type) => {
        setMediaType(type);
    }


    // 이미지 모달
    // 세로가 긴지, 가로가 긴지 구분해서 클래스 적용하기 위함
    const imgMore = (item) => {
        setImgModal(!imgModal);
        const videoPath = item.file_path;
        setVideoLink(videoPath);
        const video_width = item.width;
        const video_height = item.height;
        setVideoSize({width: video_width, height: video_height});
    };

    const imgModalClose = () => {
        setImgModal(!imgModal);
    }

    // 비디오 모달
    const videoBox = (item) => {
        setVideoOpen(!videoOpen);
        const youtube = item.key;
        setYoutubeUrl(youtube)
    };
    const videoModalClose = () => {
        setVideoOpen(!videoOpen)
    }



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
    const seasonList = seasonUrl?.episodes.slice(0, 5);


    /* 소셜 */
    const socialMedia = [
        {name: '페이스북', url: 'http://www.facebook.com', class: "facebook", link: `${socialUrl?.facebook_id}`},
        {name: '트위터', url: 'http://www.twitter.com', class: "twitter", link: `${socialUrl?.twitter_id}`},
        {name: '인스타그램', url: 'http://www.instagram.com', class: "instagram", link: `${socialUrl?.instagram_id}`}
    ]

    /* 등장인물 */
    const creditsArray = creditsUrl ? creditsUrl.slice(0, 5) : [];

    /* 비슷한 작품 */
    const recommendArray = recommendUrl ? recommendUrl.slice(0, 5) : [];



    useEffect(() => {
        async function Api() {
            try {
                window.scrollTo(0, 0);
                const detail = await movieApi.detail(params.type, params.id);
                const credits = await movieApi.credits(params.type, params.id);
                const similar = await movieApi.similar(params.type, params.id);
                const social = await movieApi.social(params.type, params.id);
                const recommend = await movieApi.recommend(params.type, params.id);

                const textContainer = textContainerRef.current;
                setDataUrl(detail.data);
                setCreditsUrl(credits.data.cast);
                setSimilarUrl(similar.data.results);
                setSocialUrl(social.data);
                setRecommendUrl(recommend.data.results);

                const ottList = await movieApi.ottList(params.type, params.id);
                setOttUrl(ottList.data.results.KR);

                // 이미지
                const images = await movieApi.seasonImg(params.type, params.id);
                setImagesUrl(images.data);


                // 비디오
                const videos = await movieApi.seasonVideo(params.type, params.id);
                setVideoUrl(videos.data.results);

                // 비디오가 없으면 배경 -> 포스터
                if (videos.data.results.length !== 0) {
                    setMediaType('video')
                } else if (imagesUrl?.backdrops) {
                    setMediaType('backdrops')
                } else {
                    setMediaType('posters')
                }

                // tv 시리즈
                if (params.type === 'tv') {
                    const seasons = await movieApi.seasons(params.id, dataUrl?.number_of_seasons);
                    setSeasonUrl(seasons.data);
                }

                await dispatch(movieActions(params.type, params.id));

                // 영화 상세설명
                const handleResize = () => {
                    if (textContainer) {
                        setIsOverflowed(textContainer.scrollHeight > textContainer.clientHeight);
                    }
                };
                handleResize();
                window.addEventListener('resize', handleResize);

                await dispatch(movieActions());
                return () => {
                    window.removeEventListener('resize', handleResize);
                };

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // AxiosError에서 404 상태 코드를 확인하여 NotFoundComponent를 렌더링
                    <NotFound />
                } else {
                    // 다른 오류 처리
                    console.log(33)
                }
            }
        }

        Api();
        movieActions();
    }, [textContainerRef.current, params.id, dispatch]);



    return (
        <div>
            <section className="detail_container"
                     style={{
                         backgroundImage: `url(${dataUrl?.backdrop_path ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${dataUrl?.backdrop_path}` : ''})`
                     }}
            >
            <div className="detail_info">
                    <h1 className="tit">
                        {dataUrl?.title || dataUrl?.name}
                        {data?.title || data?.name}
                    </h1>
                    <div className="meta">
                        <span className="type">{params.type === 'movie' ? 'MOVIE' : 'TV'}</span>
                        {dataUrl?.genres.map((item, index) => {
                            return (
                                <span className="txt" key={index}>
                                    {item.name}
                                </span>
                            )
                        })}
                        {
                            dataUrl?.first_air_date || dataUrl?.release_date ? (
                                <span className="date">{dataUrl?.release_date || dataUrl?.first_air_date}</span>
                            ) : null
                        }
                    </div>

                    {
                        ottUrl && (ottUrl.buy || ottUrl.flatrate) ? (
                            <div className="ott_box">
                                <h3 className="ott_tit">OTT</h3>
                                <div className="ott_wrap">
                                    {
                                        ottUrl.buy &&  (
                                            <div className="ott_list">
                                                <h4 className="ott_txt">BUY</h4>
                                                <ul>
                                                    {
                                                        ottUrl.buy && ottUrl.buy.map((item, index) => (
                                                            <li key={index}>
                                                                <img
                                                                    src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
                                                                    alt=""/>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                    {
                                        ottUrl.flatrate && (
                                            <div className="ott_list">
                                                <h4 className="ott_txt">Streaming</h4>
                                                <ul>
                                                    {
                                                        ottUrl?.flatrate && ottUrl?.flatrate.map((item, index) => (
                                                            <li key={index}>
                                                                <img
                                                                    src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
                                                                    alt=""/>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        ) : null
                    }

                    {
                        dataUrl?.overview || dataUrl?.tagline ? (
                            <div className="comment">
                                {
                                    dataUrl?.tagline && (
                                        <p className="quites">
                                            {dataUrl?.tagline}
                                        </p>
                                    )
                                }

                                {
                                    dataUrl?.overview && (
                                        <p
                                            ref={textContainerRef}
                                            className={`intro ${isExpanded ? 'intro_more' : ''}`}
                                        >
                                            {dataUrl?.overview}
                                        </p>
                                    )
                                }

                                {isOverflowed && (
                                    <button
                                        className="btn_more"
                                        onClick={handleToggleButtonClick}
                                    >
                                        {isExpanded ? '접기' : '더보기'}
                                    </button>
                                )}
                            </div>
                        ) : null
                    }
                </div>
                <div className="detail_poster">
                    <ul className="social_links">
                        {socialMedia.map((item, index) => {
                            return item.link !== "null" ? (
                                <li key={index}>
                                    <a href={`${item.url}/${item.link}`} className={`${item.class}`} target="_blank" rel="noreferrer">
                                        <span className="blind">{item.name}</span>
                                    </a>
                                </li>
                            ) : null;
                        })}
                    </ul>
                    <picture>
                        <img src={dataUrl?.poster_path ? `https://image.tmdb.org/t/p/w500/${dataUrl?.poster_path}` : ``} alt="Movie Poster"
                             loading="lazy"/>
                    </picture>
                </div>
            </section>
            <div className="item_container">
                <div className="title"><h2>등장인물</h2></div>
                <List type={params.type} list={creditsArray} class={"person_list"}></List>

                {
                    seasonUrl  !== undefined ?
                        <div className="last_season">
                            <div className="title">
                                <h2>현재 시즌</h2>
                                <Link to={`/series/${params.id}/episode`} className="season_link">
                                    전체 시즌 보기
                                </Link>
                            </div>
                            <div className="season_box">
                                <Link to={`/series/${params.id}/episode`} className="season_main">
                                    <img src={seasonUrl.poster_path ? `https://image.tmdb.org/t/p/w342${seasonUrl.poster_path}` : ``} alt=""
                                         loading="lazy"/>
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
                            {
                                (videoUrl && videoUrl.length > 0) && (
                                    <button type="button" className={mediaType === 'video' ? 'active' : ''}
                                            onClick={() => mediaTab('video')}>동영상 {videoUrl.length}
                                    </button>
                                )
                            }
                        </li>
                        <li>
                            {
                                imagesUrl?.backdrops.length !== 0 && (
                                    <button type="button" className={mediaType === 'backdrops' ? 'active' : ''}
                                            onClick={() => mediaTab('backdrops')}>배경 {imagesUrl.backdrops.length}
                                    </button>
                                )
                            }
                        </li>
                        <li>
                            {
                                imagesUrl?.posters.length !== 0 && (
                                    <button type="button" className={mediaType === 'posters' ? 'active' : ''}
                                            onClick={() => mediaTab('posters')}>포스터 {imagesUrl.posters.length}
                                    </button>
                                )
                            }
                        </li>
                    </ul>
                </div>


                <Swiper slidesPerView={'auto'} className="media_slide">
                    {mediaType === 'video' &&
                        (videoUrl &&
                            videoUrl.map((item, index) => (
                                <SwiperSlide key={index} className="video_card" onClick={() => videoBox(item)}>
                                    <img src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`} alt=""/>
                                </SwiperSlide>
                            )))}

                    {(mediaType === 'backdrops' || mediaType === 'posters') &&
                        (imagesUrl[mediaType] &&
                            imagesUrl[mediaType].map((item, index) => (
                                <SwiperSlide key={index} className={`${mediaType === 'posters' ? 'poster_card' : 'bg_card'}`} onClick={() => imgMore(item)}>
                                    <button type="button" className="media_link">
                                        <img src={item.file_path ? `https://image.tmdb.org/t/p/w500${item.file_path}` : ``} alt="Movie Poster"
                                             loading="lazy"/>
                                    </button>
                                </SwiperSlide>
                            )))}
                </Swiper>

                {
                    recommendUrl?.length !== 0 && (
                            <div>
                                <div className="title"><h2>비슷한 작품</h2></div>
                                <List type={params.type} list={recommendArray} class={"item_list"}></List>
                            </div>
                    )
                }


                {
                    videoOpen && (
                        <div className="video_modal">
                            <div className="inner">
                                <iframe src={`https://www.youtube.com/embed/${youtubeUrl}`} allowFullScreen></iframe>
                                <button type="button" className="modal_close" onClick={videoModalClose}>
                                    <span className="blind">닫기</span>
                                </button>
                            </div>
                        </div>
                    )
                }
                {
                    imgModal && (
                        <div className="img_modal">
                            <div className="inner">
                                <a href={`https://www.themoviedb.org/t/p/original${videoLink}`}
                                   className={`img_link ${videoSize.width > videoSize.height ? 'img_width' : 'img_height'}`}
                                   target="_blank">
                                    <img src={videoLink ? `https://image.tmdb.org/t/p/w500${videoLink}` : ``} alt="Movie Poster"
                                         loading="lazy"/>
                                </a>
                                <p className="img_txt">이미지를 클릭하여 원본 ({videoSize.width}X{videoSize.height})을 확인 해보세요!</p>
                                <button type="button" className="modal_close" onClick={imgModalClose}>
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
