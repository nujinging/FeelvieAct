import './../App.scss';
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../actions/movieActions";
import {seasonActions} from "../actions/seasonActions";
import VideoModal from "./Modal/VideoModal";
import ImgModal from "./Modal/ImgModal";

export default function MediaDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const [mediaType, setMediaType] = useState('video');
    const [imgModal, setImgModal] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [imgDetail, setImgDetail] = useState();
    const [videoDetail, setVideoDetail] = useState();
    const [videoKey, setVideoKey] = useState();

    const [videoUrl, setVideoUrl] = useState([]);
    const [imagesUrl, setImagesUrl] = useState({backdrops: [], posters: []});

    // 미디어 - 배경,포스터
    const mediaTab = (type) => {
        setMediaType(type);
    }
    // 이미지 모달
    const imgModalOpen = (item) => {
        setImgModal(!imgModal);
        setImgDetail(item);
    };
    // 비디오 모달
    const videoModalOpen = (item, item_key) => {
        setVideoModal(!videoModal);
        setVideoDetail(item);
        setVideoKey(item_key);
    }

    useEffect(() => {
        async function Api() {
            try {
                await dispatch(movieActions(params.type, params.id));

                // 이미지
                const images = await movieApi.seasonImg(params.type, params.id);
                setImagesUrl(images.data);

                // 비디오
                const videos = await movieApi.seasonVideo(params.type, params.id);
                setVideoUrl(videos.data.results);

                // 비디오가 없으면 배경 -> 포스터
                if (imagesUrl && videoUrl.length > 0) {
                    setMediaType('video')
                } else if (imagesUrl && imagesUrl.backdrops) {
                    setMediaType('backdrops')
                } else {
                    setMediaType('posters')
                }

            } catch (error) {
            }
        }
        Api();
    }, [params.id]);


    return (
      <div className="item">
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
                          imagesUrl && imagesUrl.backdrops.length !== 0 && (
                              <button type="button" className={mediaType === 'backdrops' ? 'active' : ''}
                                      onClick={() => mediaTab('backdrops')}>배경 {imagesUrl.backdrops.length}
                              </button>
                          )
                      }
                  </li>
                  <li>
                      {
                          imagesUrl && imagesUrl.posters.length !== 0 && (
                              <button type="button" className={mediaType === 'posters' ? 'active' : ''}
                                      onClick={() => mediaTab('posters')}>포스터 {imagesUrl.posters.length}
                              </button>
                          )
                      }
                  </li>
              </ul>
          </div>

          {
              imagesUrl && (
                  <Swiper slidesPerView={'auto'} className="media_slide">
                      {mediaType === 'video' &&
                          (videoUrl &&
                              videoUrl.map((item, index) => (
                                  <SwiperSlide key={index} className="video_card" onClick={() => videoModalOpen(item, item.key)}>
                                      <img src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`} alt=""/>
                                  </SwiperSlide>
                              )))}

                      {(mediaType === 'backdrops' || mediaType === 'posters') &&
                          (imagesUrl[mediaType] &&
                              imagesUrl[mediaType].map((item, index) => (
                                  <SwiperSlide key={index} className={`${mediaType === 'posters' ? 'poster_card' : 'bg_card'}`} onClick={() => imgModalOpen(item)}>
                                      <button type="button" className="media_link">
                                          <img src={item.file_path ? `https://image.tmdb.org/t/p/w500${item.file_path}` : ``} alt="Movie Poster"
                                               loading="lazy"/>
                                      </button>
                                  </SwiperSlide>
                              )))}
                  </Swiper>
              )
          }

          {
              videoModal && (
                  <VideoModal item={videoDetail} onClose={videoModalOpen}></VideoModal>
              )
          }

          {
              imgModal && (
                  <ImgModal item={imgDetail} onClose={imgModalOpen}></ImgModal>
              )
          }


      </div>
    );
}
