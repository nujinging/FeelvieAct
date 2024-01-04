import "swiper/css";
import './../scss/itemDetail.scss';
import {movieApi} from "../util/movieApi.ts";
import {useEffect, useState, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {movieActions} from "../actions/movieActions.tsx";
import {seasonActions} from "../actions/seasonActions.tsx";
import List from "./components/List.tsx";
import SeasonList from "./SeasonList.tsx";
import MediaDetail from "./MediaDetail.tsx";
import Loading from "./components/Loading.tsx";
import AxiosError from "./components/AxiosError.tsx";

const ItemDetail : React.FC = () => {
  const params = useParams<{type : string ; id : number}>();
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.movieData);
  const socialData = useSelector(state => state.movies.socialData);
  const seasonData = useSelector(state => state.movies.seasonData);

  const [ottUrl, setOttUrl] = useState<any>();
  const [creditsUrl, setCreditsUrl] = useState<any>();
  const [recommendUrl, setRecommendUrl] = useState<any>([]);

  const [loading, setLoading] = useState<Boolean>(true);
  const [creditsLoading, setCreditsLoading] = useState<Boolean>(true);
  const [error, setError] = useState(null);

// 줄거리가 3줄이상 이상 나올 시 더보기 버튼 생성
  const overviewText = useRef(null);
  const [overflowMore, setOverviewMore] = useState<Boolean>(false);
  const [overviewExpanded, setOverviewExpanded] = useState<Boolean>(false);
  const [ottState, setOttState] = useState<Boolean>(false);

  /* 소셜 */
  const socialMedia = [
    {name: '페이스북', url: 'http://www.facebook.com', class: "facebook", link: `${socialData?.facebook_id}`},
    {name: '트위터', url: 'http://www.twitter.com', class: "twitter", link: `${socialData?.twitter_id}`},
    {name: '인스타그램', url: 'http://www.instagram.com', class: "instagram", link: `${socialData?.instagram_id}`}
  ]

  /* 등장인물 */
  const creditsArray = creditsUrl ? creditsUrl.slice(0, 20) : [];

// 영화 상세설명 더보기
  const overviewMoreClick = () => {
    setOverviewExpanded(!overviewExpanded);
  };

// OTT 더보기
  const ottMoreClick = () => {
    setOttState(!ottState);
  }

  useEffect(() => {
    async function fatchApi() {
      try {
        setLoading(true);
        setCreditsLoading(true);
        window.scrollTo(0, 0);

        // 작품 정보
        await dispatch(movieActions(params.type, params.id));
        const ottList = await movieApi.ottList(params.type, params.id);
        const credits = await movieApi.credits(params.type, params.id);
        const recommend = await movieApi.recommend(params.type, params.id);
        setCreditsUrl(credits.data.cast);
        setRecommendUrl(recommend.data.results);
        setOttUrl(ottList.data.results.KR);

        // TV 일때만 시리즈
        if (params.type === 'tv') {
          await dispatch(seasonActions(params.id, 1));
        }
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
        setCreditsLoading(false);
      }
    }

    fatchApi();
    // Movie인지 Tv인지, ID값은 무엇인지, 현재 로딩상태는 어떤지 의존성배열에 넣어서 관리
  }, [params.type, params.id, setLoading]);

  useEffect(() => {
    try {
      // 영화 상세설명
      const textContainer = overviewText.current;
      if (textContainer) {
        const handleResize = () => {
          setOverviewMore(textContainer.scrollHeight > textContainer.clientHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [overviewText.current]);


  return (
    <>

      {
        loading ? (
          <section className="detail_container">
            <Loading/>
          </section>
        ) : error ? (
          <AxiosError></AxiosError>
        ) : (
          <>
            <section className="detail_container"
                     style={{
                       backgroundImage: `url(${detailData?.backdrop_path ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${detailData?.backdrop_path}` : ''})`
                     }}
            >
              <div className="detail_info">

                <h1 className="tit">
                  {detailData?.title || detailData?.name}
                </h1>
                <div className="meta">
                  <span className="type">{params.type === 'movie' ? 'MOVIE' : 'TV'}</span>
                  {
                    detailData?.first_air_date || detailData?.release_date ? (
                      <span
                        className="date">{detailData?.release_date || detailData?.first_air_date}</span>
                    ) : null
                  }
                </div>

                <div className="meta">
                  {detailData?.genres && detailData?.genres.map((item, index) => {
                    return (
                      <span className="txt" key={index}>
                                    {item.name}
                                </span>
                    )
                  })}
                </div>

                {
                  ottUrl && (ottUrl.buy || ottUrl.flatrate) ? (
                    <div className={`ott_box ${ottState ? 'more' : ''}`}>
                      <h3 className="ott_tit">OTT <button type="button" className="ott_more_btn"
                                                          onClick={ottMoreClick}>더보기</button></h3>
                      <div className="ott_wrap">
                        {
                          ottUrl.buy && (
                            <div className="ott_list">
                              <h4 className="ott_txt">BUY</h4>
                              <ul>
                                {
                                  ottUrl.buy && ottUrl.buy.map((item, index) => (
                                    <li key={index}>
                                      <img
                                        src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
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
                                        src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
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
                  detailData?.overview || detailData?.tagline ? (
                    <div className="comment">

                      {
                        detailData?.overview && (
                          <p
                            ref={overviewText}
                            className={`intro ${overviewExpanded ? 'intro_more' : ''}`}
                          >
                            {detailData?.overview}
                          </p>
                        )
                      }

                      {overflowMore && (
                        <button
                          className="btn_more"
                          onClick={overviewMoreClick}
                        >
                          {overviewExpanded ? '접기' : '더보기'}
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
                        <a href={`${item.url}/${item.link}`} className={`${item.class}`}
                           target="_blank" rel="noreferrer">
                          <span className="blind">{item.name}</span>
                        </a>
                      </li>
                    ) : null;
                  })}
                </ul>
                <picture>
                  <img
                    src={detailData?.poster_path ? `https://image.tmdb.org/t/p/w300${detailData?.poster_path}` : ``}
                    alt="Movie Poster"
                    loading="lazy"/>
                </picture>
              </div>
            </section>
            <div className="item_container detail">
              {
                creditsLoading ? (
                    <Loading/>
                  ) :
                  <>
                    {
                      creditsArray.length !== 0 && (
                        <div className="item_box">
                          <div className="title"><h2>등장인물</h2><Link
                            to={`/detail/${params.type}/${params.id}/credits`}
                            className="credits_more">
                            더보기
                          </Link></div>
                          <List type={params.type} list={creditsArray}
                                class={`${creditsArray.length < 10 ? 'credits_more_card' : ''}`}>
                          </List>
                        </div>
                      )
                    }
                  </>
              }

              {/* 시즌 */}
              {params.type === 'tv' && seasonData && <SeasonList/>}

              {/* 미디어 */}
              <MediaDetail></MediaDetail>

              {/* 추천 작품 */}
              <div className="item_box">
                <div className="title"><h2>추천 작품</h2></div>
                {
                  recommendUrl.length !== 0 ? (
                    <List type={params.type} list={recommendUrl} class={"item_list"}></List>
                  ) : (
                    <p className="recommend_none">
                      &#x1F622; {detailData?.title || detailData?.name}의 충분한 평가가 이뤄지지않아 아직 추천드릴
                      작품이 없어요<br/>
                    </p>
                  )
                }
              </div>

            </div>
          </>
        )
      }


    </>
  );
}

export default ItemDetail;
