import './../scss/creditsDetail.scss';
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {movieApi} from "../util/movieApi.ts";
import AxiosError from "./components/AxiosError.tsx";
import Loading from "./components/Loading.tsx";
import imgNone from "../images/img_card_none.png";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../actions/movieActions.tsx";
import useScrollFixed from "../commonEvent/useScrollFixed";
import useScrollTop from "../commonEvent/useScrollTop";

const CreditsDetail: React.FC = () => {
  const params = useParams<{type : string ; id : number}>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(null);
  const [castUrl, setCastsUrl] = useState<any>();
  const [crewUrl, setCrewsUrl] = useState<any>();
  const detailData = useSelector((state) => state.movies.movieData);

  const [castClose, setCastClose] = useState<Boolean>(true);
  const [crewClose, setCrewClose] = useState<Boolean>(true);

  // 공통 스크롤 감지
  const scrollFixed = useScrollFixed();
  const castMore = () => {
    setCastClose(!castClose);
  }
  const crewMore = () => {
    setCrewClose(!crewClose);
  }

  useEffect(() => {
      async function fetchApi() {
        try {
          setLoading(true);
          window.scrollTo(0, 0);
          await dispatch(movieActions(params.type, params.id));
          const credits = await movieApi.credits(params.type, params.id);
          setCastsUrl(credits.data.cast);
          setCrewsUrl(credits.data.crew);
        } catch (error) {
          console.error(error);
          setError(error)
        } finally {
          setLoading(false);
        }
      }

      fetchApi();
    },
    [params.type, params.id]
  );
  return (
    <>
      {
        loading ? (
          <Loading></Loading>
        ) : error ? (
          <AxiosError></AxiosError>
        ) : (
          <div className="container">
            <section className="credits_detail"
                     style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${detailData?.backdrop_path})`}}>
              <div className="credits_poster">
                <picture className="credits_img">
                  <img
                    src={detailData?.poster_path ? `https://image.tmdb.org/t/p/w342${detailData?.poster_path}` : ``}
                    alt="" loading="lazy"/>
                </picture>
                <div className="credits_tit">
                  <p>
                    {detailData?.title}
                  </p>
                </div>
              </div>
            </section>
            <div className="credits_box">
              <div className="box cast">
                <h2 className="credits_tit">
                  배역 {castUrl.length}
                  <button type="button" className={`list_close ${castClose ? '' : 'close'}`} onClick={castMore}>
                    {castClose ? '접기' : '더보기'}
                  </button>
                </h2>
                <ul className={`cast_list ${castClose ? '' : 'close'}`}>
                  {
                    castUrl?.map((item, index) => {
                        return (
                          <li key={index} className="credits_item">
                            <Link to={`/person/${item.id}`} className="credits_link">
                              {
                                item.profile_path === null ? (
                                  <picture className="img_none">
                                    <img src={imgNone} alt="img_none"
                                         loading="lazy"/>
                                  </picture>
                                ) : (
                                  <picture>
                                    <img
                                      src={`https://image.tmdb.org/t/p/w154/${item.profile_path}`}
                                      alt={item.name}
                                      loading="lazy"
                                    />
                                  </picture>
                                )
                              }

                              <div className="info">
                                <h3 className="name">{item.name}</h3>
                                {
                                  item.character && (
                                    <h4 className="character">{item.character}</h4>
                                  )
                                }

                              </div>
                            </Link>
                          </li>
                        )
                      }
                    )
                  }
                </ul>
              </div>
              <div className="box crew">
                <h2 className="credits_tit">
                  제작진 {crewUrl.length}
                  <button type="button" className={`list_close ${crewClose ? '' : 'close'}`} onClick={crewMore}>
                    {crewClose ? '접기' : '더보기'}
                  </button>
                </h2>
                <ul className={`crew_list ${crewClose ? '' : 'close'}`}>
                  {
                    crewUrl?.map((item, index) => {
                      return (
                        <li key={index} className="credits_item">
                          <Link to={`/person/${item.id}`} className="credits_link">
                            {
                              item.profile_path === null ? (
                                <picture className="img_none">
                                  <img src={imgNone} alt="img_none"
                                       loading="lazy"/>
                                </picture>
                              ) : (
                                <picture>
                                  <img
                                    src={`https://image.tmdb.org/t/p/w154/${item.profile_path}`}
                                    alt={item.name}
                                    loading="lazy"
                                  />
                                </picture>
                              )
                            }
                            <div className="info">
                              <h3 className="name">{item.name}</h3>
                              <h4 className="job">{item.job}</h4>
                            </div>
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>

            </div>
            {
              scrollFixed && (
                <button type="button" className="top_btn" onClick={useScrollTop}>
                  <span className="blind">위로</span>
                </button>
              )
            }
          </div>
        )
      }
    </>
  );
}

export default CreditsDetail;