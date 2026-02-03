import './../scss/mediaSlide.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { movieApi } from '../util/movieApi.ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { movieActions } from '../actions/movieActions.tsx';
import Loading from './components/Loading.tsx';
import VideoModal from './modal/VideoModal.tsx';
import ImgModal from './modal/ImgModal.tsx';

const MediaDetail: React.FC = () => {
    const params = useParams<{ type?: string; id?: string }>();
    const dispatch = useDispatch();

    const [imgDetail, setImgDetail] = useState<any>(null);
    const [videoDetail, setVideoDetail] = useState<any>(null);

    const [videoUrl, setVideoUrl] = useState<any[]>([]);
    const [imagesUrl, setImagesUrl] = useState<{ backdrops: any[]; posters: any[] }>({
        backdrops: [],
        posters: [],
    });

    const [imgModal, setImgModal] = useState<boolean>(false);
    const [videoModal, setVideoModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [mediaState, setMediaState] = useState<boolean>(false);
    const [mediaType, setMediaType] = useState<string>('video');

    // 미디어 - 배경, 포스터
    const mediaTab = (type: string): void => {
        setMediaState(true);
        setMediaType((prev) => {
            if (prev === type) {
                setMediaState(false);
                return prev;
            }
            return type;
        });
    };

    useEffect(() => {
        try {
            if (videoUrl.length > 0) {
                setMediaType('video');
            } else if (videoUrl.length === 0 && imagesUrl.backdrops && imagesUrl.posters) {
                setMediaType('backdrops');
            } else {
                setMediaType('posters');
            }
        } catch (error) {
            console.log(error);
        }
    }, [videoUrl, imagesUrl]);

    useEffect(() => {
        // 데이터가 제대로 들어오긴 하나, 용량으로 조금 버벅거려 0.2초 딜레이 줌
        const timer = setTimeout((): void => {
            if (videoUrl || imagesUrl) {
                setMediaState(false);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [mediaType, videoUrl, imagesUrl]);

    // 이미지 모달
    const imgModalOpen = (item: any): void => {
        setImgModal((prev) => !prev);
        setImgDetail(item);
    };

    // 비디오 모달
    const videoModalOpen = (item?: any): void => {
        setVideoModal((prev) => !prev);
        if (item) setVideoDetail(item);
    };

    useEffect(() => {
        const type = params.type;
        const idNum = Number(params.id);

        if (!type || !params.id || Number.isNaN(idNum)) return;

        async function fetchApi() {
            try {
                setLoading(true);

                await dispatch(movieActions(type, idNum) as any);

                // 이미지
                const images = await movieApi.seasonImg(type, idNum);
                setImagesUrl(images.data);

                // 비디오
                const videos = await movieApi.seasonVideo(type, idNum);
                setVideoUrl(videos.data.results || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchApi();
    }, [params.id, params.type, dispatch]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="item_box">
                    <div className="title">
                        <h2>미디어</h2>
                        <ul className="type_list">
                            {videoUrl.length > 0 && (
                                <li>
                                    <button
                                        type="button"
                                        className={mediaType === 'video' ? 'active' : ''}
                                        onClick={() => mediaTab('video')}
                                    >
                                        동영상 {videoUrl.length}
                                    </button>
                                </li>
                            )}

                            {imagesUrl.backdrops.length > 0 && (
                                <li>
                                    <button
                                        type="button"
                                        className={mediaType === 'backdrops' ? 'active' : ''}
                                        onClick={() => mediaTab('backdrops')}
                                    >
                                        배경 {imagesUrl.backdrops.length}
                                    </button>
                                </li>
                            )}

                            {imagesUrl.posters.length > 0 && (
                                <li>
                                    <button
                                        type="button"
                                        className={mediaType === 'posters' ? 'active' : ''}
                                        onClick={() => mediaTab('posters')}
                                    >
                                        포스터 {imagesUrl.posters.length}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* 리스트 */}
                    {mediaState ? (
                        <Loading />
                    ) : (
                        <Swiper slidesPerView={'auto'} className="media_slide">
                            {mediaType === 'video' ? (
                                videoUrl?.map((item, index) => (
                                    <SwiperSlide
                                        key={item?.id ?? item?.key ?? index}
                                        className="video_card"
                                        onClick={() => videoModalOpen(item)}
                                    >
                                        <img src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`} alt="" />
                                    </SwiperSlide>
                                ))
                            ) : (
                                imagesUrl[mediaType as 'backdrops' | 'posters']?.map((item, index) => (
                                    <SwiperSlide
                                        key={item?.file_path ?? index}
                                        className={`${mediaType === 'posters' ? 'poster_card' : 'bg_card'}`}
                                        onClick={() => imgModalOpen(item)}
                                    >
                                        <button type="button" className="media_link">
                                            <img
                                                src={item.file_path ? `https://image.tmdb.org/t/p/w342${item.file_path}` : ''}
                                                alt="Movie Poster"
                                                loading="lazy"
                                            />
                                        </button>
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    )}

                    {/* 비디오 모달 */}
                    {videoModal && <VideoModal item={videoDetail} onClose={videoModalOpen} />}

                    {/* 이미지 모달 */}
                    {imgModal && <ImgModal item={imgDetail} onClose={imgModalOpen} />}
                </div>
            )}
        </>
    );
};

export default MediaDetail;
