
import './../App.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {movieActions} from "../util/movieActions";
import {seasonActions} from "../util/seasonActions";
export default function MediaDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const imageData = useSelector(state => state.movies.imageData);
    const videoData = useSelector(state => state.movies.videoData);
    const [mediaType, setMediaType] = useState('video');

    // 미디어 - 배경,포스터
    const mediaTab = (type) => {
        setMediaType(type);
    }

    useEffect(() => {
        async function Api() {
            try {
                await dispatch(movieActions(params.type, params.id));
                // 비디오가 없으면 배경 -> 포스터
                if (videoData && videoData.length !== 0) {
                    setMediaType('video')
                } else if (imageData && imageData.backdrops) {
                    setMediaType('backdrops')
                } else {
                    setMediaType('posters')
                }

            } catch (error) {
            }
        }

        Api();
        movieActions();
        seasonActions();
    }, [params.type, params.id]);


    return (
      <div>
          <div className="title">
              <h2>미디어</h2>
              <ul className="type_list">
                  <li>
                      {
                          (videoData && videoData.length > 0) && (
                              <button type="button" className={mediaType === 'video' ? 'active' : ''}
                                      onClick={() => mediaTab('video')}>동영상 {videoData.length}
                              </button>
                          )
                      }
                  </li>
                  <li>
                      {
                          imageData && imageData.backdrops.length !== 0 && (
                              <button type="button" className={mediaType === 'backdrops' ? 'active' : ''}
                                      onClick={() => mediaTab('backdrops')}>배경 {imageData.backdrops.length}
                              </button>
                          )
                      }
                  </li>
                  <li>
                      {
                          imageData && imageData.posters.length !== 0 && (
                              <button type="button" className={mediaType === 'posters' ? 'active' : ''}
                                      onClick={() => mediaTab('posters')}>포스터 {imageData.posters.length}
                              </button>
                          )
                      }
                  </li>
              </ul>
          </div>

          {
              imageData && (
                  <Swiper slidesPerView={'auto'} className="media_slide">
                      {mediaType === 'video' &&
                          (videoData &&
                              videoData.map((item, index) => (
                                  <SwiperSlide key={index} className="video_card">
                                      <img src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`} alt=""/>
                                  </SwiperSlide>
                              )))}

                      {(mediaType === 'backdrops' || mediaType === 'posters') &&
                          (imageData[mediaType] &&
                              imageData[mediaType].map((item, index) => (
                                  <SwiperSlide key={index} className={`${mediaType === 'posters' ? 'poster_card' : 'bg_card'}`}>
                                      <button type="button" className="media_link">
                                          <img src={item.file_path ? `https://image.tmdb.org/t/p/w500${item.file_path}` : ``} alt="Movie Poster"
                                               loading="lazy"/>
                                      </button>
                                  </SwiperSlide>
                              )))}
                  </Swiper>
              )
          }
      </div>
    );
}
