import '../scss/seasonList.scss'
import {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../actions/movieActions.tsx";
import {seasonActions} from "../actions/seasonActions.tsx";
import Loading from "./components/Loading.tsx";

export default function SeasonList() {
  const params = useParams({type : string, id : number});
  const dispatch = useDispatch();
  const detailData = useSelector((state: { movies: { movieData: any } }) => state.movies.movieData);
  const seasonData = useSelector((state: { movies: { seasonData: any } }) => state.movies.seasonData);
  const [loading, setLoading] = useState<Boolean>(true)

  // 마지막 시즌 보여주기
  const lastSeason = detailData?.number_of_seasons;

  // 시즌 줄거리 더보기
  const overviewText = useRef(null);
  const [overviewMore, setOverviewMore] = useState<Boolean>(false);
  const [seasonState, setSeasonState] = useState<Boolean>(false);

  // 시리즈 더보기
  const seasonMoreClick = () : void => {
    setSeasonState(!seasonState);
  }

  useEffect(() => {
    try {
      // 작품
      dispatch(movieActions(params.type, params.id));
      // 시즌
      dispatch(seasonActions(params.id, lastSeason));

      // 시즌 줄거리 더보기
      const textContainer = overviewText.current;
      if (textContainer) {
        const seasonOverview = () => {
          setOverviewMore(textContainer.scrollHeight > textContainer.clientHeight);
        };
        seasonOverview();
        window.addEventListener('resize', seasonOverview);
        return () => {
          window.removeEventListener('resize', seasonOverview);
        };
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }, [params.type, params.id, lastSeason, overviewText.current]);


  return (
    <>
      {
        loading ? (
          <Loading/>
        ) : (
          <div className="item_box">
            <div className="title">
              <h2>현재 시즌</h2>

            </div>
            <div className="season_box">
              {seasonData?.poster_path && (
                <Link to={`/${params.type}/season/${params.id}/episode`} className="season_poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${seasonData.poster_path}`}
                    alt={seasonData.poster_path}
                    loading="lazy"
                  />
                </Link>
              )}

              <div className="season_info">
                <div className="season_tit">
                  <h3>{seasonData.name}</h3>
                  <Link to={`/${params.type}/season/${params.id}/episode`} className="season_link">
                    전체 시즌 보기
                  </Link>
                </div>

                {
                  seasonData?.overview ? (
                    <p className={`season_overview ${seasonState ? 'season_more' : ''}`}
                       ref={overviewText}>{seasonData.overview}</p>

                  ) : (
                    <p>&#x1F622; 아직 시즌 줄거리가 등록되지않았어요</p>
                  )
                }

                {
                  overviewMore && (
                    <button type="button" className="season_more_btn"
                            onClick={seasonMoreClick}>
                      {seasonState ? '접기' : '더보기'}
                    </button>
                  )
                }

              </div>

            </div>
          </div>
        )
      }
    </>
  );
}


