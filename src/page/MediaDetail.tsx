import './../scss/mediaSlide.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {movieApi} from "../util/movieApi.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {movieActions} from "../actions/movieActions";
import Loading from "./components/Loading.tsx";
import VideoModal from "./modal/VideoModal.tsx";
import ImgModal from "./modal/ImgModal.tsx";

const MediaDetail : React.FC = () => {
  const params = useParams<{type : string ; id : number}>();
  const dispatch = useDispatch();

  const [imgDetail, setImgDetail] = useState<String>();
  const [videoDetail, setVideoDetail] = useState<String>();
  const [videoUrl, setVideoUrl] = useState<any>([]);
  const [imagesUrl, setImagesUrl] = useState<any>({backdrops: [], posters: []});

  const [imgModal, setImgModal] = useState<Boolean>(false);
  const [videoModal, setVideoModal] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const [mediaState, setMediaState] = useState<Boolean>(false);
  const [mediaType, setMediaType] = useState<String>('video');

  // 미디어 - 배경, 포스터
  const mediaTab = (type : string) : void => {
    setMediaType(type);
    setMediaState(true);
    if (type === mediaType) {
      setMediaState(false);
    }
  }

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
    setTimeout(() : void  => {
      if (videoUrl || imagesUrl) {
        setMediaState(false);
      }
    }, 200)

  }, [mediaType]);

  // 이미지 모달
  const imgModalOpen = (item : any) : void => {
    setImgModal(!imgModal);
    setImgDetail(item);
  };
  // 비디오 모달
    const videoModalOpen = ({ item, item_key }: { item: any; item_key: any }) => {
        setVideoModal(!videoModal);
        setVideoDetail(item);
    }

    useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true);
        await dispatch(movieActions(params.type, params.id));
        // 이미지
        const images = await movieApi.seasonImg(params.type, params.id);
        setImagesUrl(images.data);

        // 비디오
        const videos = await movieApi.seasonVideo(params.type, params.id);
        setVideoUrl(videos.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  }, [params.id]);

  return (
    <>
      {
        loading ? (
          <Loading/>
        ) : (
          <div className="item_box">
            <div className="title">
              <h2>미디어</h2>
              <ul className="type_list">
                {
                  videoUrl.length > 0 && (
                    <li>
                      <button type="button" className={mediaType === 'video' ? 'active' : ''}
                              onClick={() => mediaTab('video')}>동영상 {videoUrl.length}
                      </button>
                    </li>
                  )
                }

                {
                  imagesUrl.backdrops.length > 0 && (
                    <li>
                      <button type="button" className={mediaType === 'backdrops' ? 'active' : ''}
                              onClick={() => mediaTab('backdrops')}>배경 {imagesUrl.backdrops.length}
                      </button>
                    </li>
                  )
                }

                {
                  imagesUrl.posters.length > 0 && (
                    <li>
                      <button type="button" className={mediaType === 'posters' ? 'active' : ''}
                              onClick={() => mediaTab('posters')}>포스터 {imagesUrl.posters.length}
                      </button>
                    </li>
                  )
                }
              </ul>
            </div>

            {/* 리스트 */}
            {
              mediaState ? (
                <Loading/>
              ) : (
                <>
                  <Swiper slidesPerView={'auto'} className="media_slide">
                    {
                      mediaType === 'video' ? (
                        videoUrl?.map((item, index) => (
                          <SwiperSlide key={index} className="video_card"
                                       onClick={() => videoModalOpen(item, item.key)}>
                            <img src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`}
                                 alt=""/>
                          </SwiperSlide>
                        ))
                      ) : (
                        imagesUrl[mediaType]?.map((item, index) => (
                          <SwiperSlide key={index}
                                       className={`${mediaType === 'posters' ? 'poster_card' : 'bg_card'}`}
                                       onClick={() => imgModalOpen(item)}>
                            <button type="button" className="media_link">
                              <img
                                src={item.file_path ? `https://image.tmdb.org/t/p/w342${item.file_path}` : ''}
                                alt="Movie Poster" loading="lazy"/>
                            </button>
                          </SwiperSlide>
                        ))
                      )
                    }
                  </Swiper>
                </>
              )
            }

            {/* 비디오 모달 */}
            {
              videoModal && (
                <VideoModal item={videoDetail} onClose={videoModalOpen}></VideoModal>
              )
            }

            {/* 이미지 모달 */}
            {
              imgModal && (
                <ImgModal item={imgDetail} onClose={imgModalOpen}></ImgModal>
              )
            }
          </div>
        )
      }
    </>
  );
}

export default MediaDetail;