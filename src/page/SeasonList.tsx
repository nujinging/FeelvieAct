import '../scss/seasonList.scss';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieActions } from '../actions/movieActions.tsx';
import { seasonActions } from '../actions/seasonActions.tsx';
import Loading from './components/Loading.tsx';

export default function SeasonList() {
    // ✅ useParams는 객체 인자 받는 방식이 아님 + string/number는 "값"이 아니라 타입이라 런타임 에러 원인
    // ✅ id는 string으로 들어오니 number로 변환해서 사용
    const params = useParams<{ type?: string; id?: string }>();
    const dispatch = useDispatch();

    const detailData = useSelector((state: { movies: { movieData: any } }) => state.movies.movieData);
    const seasonData = useSelector((state: { movies: { seasonData: any } }) => state.movies.seasonData);

    const [loading, setLoading] = useState<boolean>(true);

    // 마지막 시즌 보여주기
    const lastSeason = detailData?.number_of_seasons;

    // 시즌 줄거리 더보기
    const overviewText = useRef<HTMLParagraphElement | null>(null);
    const [overviewMore, setOverviewMore] = useState<boolean>(false);
    const [seasonState, setSeasonState] = useState<boolean>(false);

    // 시리즈 더보기
    const seasonMoreClick = (): void => {
        setSeasonState((prev) => !prev);
    };

    useEffect(() => {
        const type = params.type;
        const idNum = Number(params.id);

        // ✅ 방어: params 없거나 id가 NaN이면 호출하지 않음
        if (!type || !params.id || Number.isNaN(idNum)) return;

        const seasonOverview = () => {
            const el = overviewText.current;
            if (!el) return;
            setOverviewMore(el.scrollHeight > el.clientHeight);
        };

        (async () => {
            try {
                setLoading(true);

                // 작품
                await dispatch(movieActions(type, idNum) as any);

                // 시즌: lastSeason가 준비된 뒤에 호출하는 게 안전
                // (lastSeason가 없으면 우선 호출 스킵)
                if (typeof lastSeason === 'number' && lastSeason > 0) {
                    await dispatch(seasonActions(idNum, lastSeason) as any);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);

                // 데이터 렌더 후 높이 계산
                setTimeout(() => {
                    seasonOverview();
                }, 0);
            }
        })();

        window.addEventListener('resize', seasonOverview);
        return () => {
            window.removeEventListener('resize', seasonOverview);
        };
    }, [params.type, params.id, lastSeason, dispatch]);

    return (
        <>
            {loading ? (
                <Loading />
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

                            {seasonData?.overview ? (
                                <p
                                    className={`season_overview ${seasonState ? 'season_more' : ''}`}
                                    ref={overviewText}
                                >
                                    {seasonData.overview}
                                </p>
                            ) : (
                                <p>&#x1F622; 아직 시즌 줄거리가 등록되지않았어요</p>
                            )}

                            {overviewMore && (
                                <button type="button" className="season_more_btn" onClick={seasonMoreClick}>
                                    {seasonState ? '접기' : '더보기'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
