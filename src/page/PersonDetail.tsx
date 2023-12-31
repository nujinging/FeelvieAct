import './../scss/personDetail.scss'
import {movieApi} from "../util/movieApi.ts";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import List from "./components/List.tsx";
import {useDispatch} from "react-redux";
import {movieActions} from "../actions/movieActions.tsx";
import Loading from "./components/Loading.tsx";
import {AxiosError} from "axios";
import useScrollFixed from "../commonEvent/useScrollFixed";
import useScrollTop from "../commonEvent/useScrollTop";
import imgNone from "../images/img_card_none.png";

const PersonDetail : React.FC = () => {
  const params = useParams<{type : string ; id : number}>();
  const [typeTabs, setTypeTabs] = useState<String>('movie');
  const [dataUrl, setDataUrl] = useState<any>();
  const [socialUrl, setSocialUrl] = useState<any>();
  const [artUrl, setArtUrl] = useState<any>([]);
  const [artPopular, setArtPopular] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [filmoLoading, setFilmoLoading] = useState<Boolean>(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // 공통 스크롤 감지
  const scrollFixed = useScrollFixed();

  // 배우 필모그래피 TAB
  const typeChange = (type : string) => {
    setTypeTabs(type);
  };

  // 배우 SNS
  const socialMedia = [
    {name: '페이스북', url: 'http://www.facebook.com', class: "facebook", link: `${socialUrl?.facebook_id}`},
    {name: '트위터', url: 'http://www.twitter.com', class: "twitter", link: `${socialUrl?.twitter_id}`},
    {name: '인스타그램', url: 'http://www.instagram.com', class: "instagram", link: `${socialUrl?.instagram_id}`}
  ]

  useEffect(() => {
    async function fetchApi() {
      try {
        setFilmoLoading(true);
        await dispatch(movieActions(params.type, params.id));

        // 배우 정보
        const detail = await movieApi.person(params.id);
        setDataUrl(detail.data);

        // 배우 SNS
        const social = await movieApi.social('person', params.id);
        setSocialUrl(social.data)

        // 배우 필모그래피
        const art = await movieApi.personArt(params.id, typeTabs);

        // 배우 필모그래피 정렬
        const art_list = art.data.cast.sort((a, b) => {
          const dateA = a.release_date || a.first_air_date;
          const dateB = b.release_date || b.first_air_date;
          if (dateA && dateB) {
            return new Date(dateB) - new Date(dateA);
          }
          return 0;
        });
        setArtUrl(art_list);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setFilmoLoading(false);
        setLoading(false);
      }
    }

    fetchApi();
  }, [typeTabs, params.id]);

  /* fecthApi 비동기 작업이 완료되고 난 뒤에 - ariUrl이 업데이트 되고 난 뒤 popular 작업*/
  useEffect(() => {
    try {
      // 배우 인기 필모그래피
      const popular = [...artUrl].sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);
      setArtPopular(popular);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [artUrl]);

  return (
    <div className="container">
      {
        loading ? (
          <Loading/>
        ) : error ? (
          <AxiosError></AxiosError>
        ) : (
          <section className="person_detail">
            <div className="person_img" style={{
              backgroundImage: artPopular[0]?.backdrop_path
                ? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${artPopular[0]?.backdrop_path})`
                : null
            }}>
              {
                dataUrl.profile_path? (
                  <picture>
                    <img
                      src={`${dataUrl.profile_path ? `https://image.tmdb.org/t/p/w300/${dataUrl.profile_path}` : ''}`}
                      alt="Person Poster" loading="lazy"/>
                  </picture>
                ) : (
                  <picture className="img_none">
                    <img src={imgNone} alt="img_none" loading="lazy"/>
                  </picture>
                )
              }

            </div>
            <div className="person_info">
              <div className="person_name">
                <h1 className="name">{dataUrl.name}</h1>

                {
                  socialUrl && (
                    <ul className="social_links">
                      {socialMedia.map((item, index) => {
                        return item.link !== "null" ? (
                          <li key={index}>
                            <a href={`${item.url}/${item.link}`} className={`${item.class}`}
                               target="_blank" rel="noopener noreferrer">
                              <span className="blind">{item.name}</span>
                            </a>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )
                }
              </div>

              <div className="person_desc">
                {
                  dataUrl.birthday && (
                    <dl>
                      <dt>생년월일</dt>
                      <dd>{dataUrl.birthday}</dd>
                    </dl>

                  )
                }
                <dl>
                <dt>성별</dt>
                  <dd>
                    {dataUrl.gender === '1' ? '여자' : '남자'}
                  </dd>
                </dl>
              </div>

              <ul className="filmo_tab">
                <li>
                  <button type="button" className={typeTabs === 'movie' ? 'active' : ''}
                          onClick={() => typeChange('movie')}>영화
                  </button>
                </li>
                <li>
                  <button type="button" className={typeTabs === 'tv' ? 'active' : ''}
                          onClick={() => typeChange('tv')}>TV
                  </button>
                </li>
              </ul>

              {
                filmoLoading ? (
                  <Loading/>
                ) : (
                  <>
                    <div className="title">
                      <h2>유명 작품</h2>
                    </div>
                    <List list={artPopular} type={typeTabs} class={"item_list"}/>
                    <div className="work">
                      <div className="work_top">
                        <h3>필모그래피</h3>
                      </div>

                      <ul className="work_list">

                        {
                          artUrl.map((item, index) => {
                            return (
                              <li key={index}>
                                <Link to={`/detail/${typeTabs}/${item.id}`}
                                      className="link">
                                  <div className="tit">
                                    {
                                      (item.release_date || item.first_air_date) && (
                                        <span>
                                                    {item.release_date ? item.release_date.substring(0, 4) : item.first_air_date ? item.first_air_date.substring(0, 4) : null}
                                                </span>
                                      )
                                    }
                                    <p>
                                      {item.title || item.original_name}
                                    </p>
                                  </div>
                                  {
                                    item.character && (
                                      <span className="char">
                                                    {item.character} 역
                                                </span>
                                    )
                                  }

                                </Link>

                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </>
                )
              }

            </div>
          </section>
        )
      }
      {
        scrollFixed && (
          <button type="button" className="top_btn" onClick={useScrollTop}>
            <span className="blind">위로</span>
          </button>
        )
      }
    </div>
  );
}

export default PersonDetail;

