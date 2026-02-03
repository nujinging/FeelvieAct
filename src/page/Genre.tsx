import './../scss/genre.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ItemState, MediaType, typeGenreTitleNumber } from '../types/commonTypes';
import 'swiper/css';
import 'swiper/css/navigation';
import { movieApi } from '../util/movieApi.ts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingProgress from './components/LoadingProgress.tsx';
import Loading from './components/Loading.tsx';
import { debounce } from 'lodash';
import imgNone from '../images/img_card_none.png';
import useScrollFixed from '../commonEvent/useScrollFixed';
import useScrollTop from '../commonEvent/useScrollTop';
import GenreSortSelect from './components/GenreSortSelect.tsx';

interface GenreItem {
    id?: number;
    title?: string;
    name?: string;
    poster_path?: string;
}

const Genre: React.FC<GenreItem> = () => {
    const { type, genreNumberParams } = useParams() as {
        type: MediaType;
        genreNumberParams: string;
    };

    const navigate = useNavigate();

    const [loading, setLoading] = useState<ItemState>(false);
    const [listLoading, setListLoading] = useState<ItemState>(true);
    const [progressState, setProgressState] = useState<ItemState>(true);

    const [genreTitle, setGenreTitle] = useState<GenreItem[]>([]);
    const [genreList, setGenreList] = useState<GenreItem[]>([]);
    const [genreNumber, setGenreNumber] = useState<typeGenreTitleNumber>('All');

    const [page, setPage] = useState<number>(1);
    const [selectedSort, setSelectedSort] = useState<string>('');

    const scrollFixed = useScrollFixed();

    const calculateProgress = () => {
        // (기존 로직 유지) 로딩 중이면 100, 끝나면 0
        return !listLoading ? 0 : 100;
    };

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
    };

    // URL params -> state 동기화
    useEffect(() => {
        const nextGenre: typeGenreTitleNumber =
            genreNumberParams === 'All' ? 'All' : (Number(genreNumberParams) as number);

        // Number 변환 실패 방지
        if (genreNumberParams !== 'All' && Number.isNaN(nextGenre as number)) {
            setGenreNumber('All');
        } else {
            setGenreNumber(nextGenre);
        }

        setPage(1);
    }, [genreNumberParams, type]);

    // 장르 선택 (※ 여기서 genreNumber 직접 세팅해서 장르 변경이 즉시 작동하게 수정)
    const genreChange = async (itemId: 'All' | number) => {
        setListLoading(true);
        setProgressState(true);
        setSelectedSort('');
        setPage(1);

        setGenreNumber(itemId); // ✅ 장르 변경 즉시 반영 (핵심 수정)

        navigate(`/genre/${type}/${itemId}`);
    };

    // 정렬 선택
    useEffect(() => {
        if (!selectedSort) return;

        let isMounted = true;

        async function sortChange() {
            try {
                setProgressState(true);
                setListLoading(true);
                setPage(1);

                // All일 때 정렬 API가 따로 없으면 인기 리스트로 fallback
                if (genreNumber === 'All') {
                    const popular = await movieApi.popular(type);
                    if (isMounted) setGenreList(popular.data.results);
                    return;
                }

                const genreId = Number(genreNumber);
                if (Number.isNaN(genreId)) return;

                let genreUrl: any;

                switch (selectedSort) {
                    case 'popularityDesc':
                        genreUrl = await movieApi.genrePopularDesc(type, genreId);
                        break;
                    case 'popularityAsc':
                        genreUrl = await movieApi.genrePopularAsc(type, genreId);
                        break;
                    case 'dateDesc':
                        genreUrl = await movieApi.genreDateDesc(type, genreId);
                        break;
                    case 'dateAsc':
                        genreUrl = await movieApi.genreDateAsc(type, genreId);
                        break;
                    default:
                        return;
                }

                if (isMounted) setGenreList(genreUrl.data.results);
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setProgressState(false);
                    setListLoading(false);
                }
            }
        }

        sortChange();

        return () => {
            isMounted = false;
        };
    }, [selectedSort, type, genreNumber]);

    // 장르 변경 시 리스트 변경
    useEffect(() => {
        let isMounted = true;

        async function fetchApi() {
            setProgressState(true);
            setListLoading(true);

            try {
                const genre = await movieApi.genreTitle(type);
                if (isMounted) setGenreTitle(genre.data.genres);

                if (genreNumber === 'All') {
                    const popular = await movieApi.popular(type);
                    if (isMounted) setGenreList(popular.data.results);
                } else {
                    const genreId = Number(genreNumber);
                    if (!Number.isNaN(genreId)) {
                        const genreUrl = await movieApi.genreList(type, genreId);
                        if (isMounted) setGenreList(genreUrl.data.results);
                    } else {
                        if (isMounted) setGenreList([]);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setProgressState(false);
                    setListLoading(false);
                }
            }
        }

        fetchApi();

        return () => {
            isMounted = false;
        };
    }, [type, genreNumber]);

    /* 리스트 더보기 */
    const latestRef = useRef({
        type,
        genreNumber,
        page,
    });

    useEffect(() => {
        latestRef.current = { type, genreNumber, page };
    }, [type, genreNumber, page]);

    const debouncedMore = useMemo(() => {
        const fn = debounce(async () => {
            const { type: t, genreNumber: g, page: p } = latestRef.current;
            const nextPage = p + 1;

            try {
                if (g === 'All') {
                    const popularScroll = await movieApi.popularScroll(t, nextPage);
                    setGenreList((prev) => [...prev, ...popularScroll.data.results]);
                } else {
                    const genreId = Number(g);
                    if (!Number.isNaN(genreId)) {
                        const genreUrlScroll = await movieApi.genreScroll(t, genreId, nextPage);
                        setGenreList((prev) => [...prev, ...genreUrlScroll.data.results]);
                    }
                }

                setPage(nextPage);
            } finally {
                setLoading(false);
            }
        }, 1000);

        return fn;
    }, []);

    useEffect(() => {
        return () => {
            debouncedMore.cancel();
        };
    }, [debouncedMore]);

    const listMoreBtn = () => {
        setLoading(true);
        debouncedMore();
    };

    return (
        <>
            <div className="genre_top">
                <Swiper className={`genre_keyword ${scrollFixed ? 'fixed' : ''}`} slidesPerView={'auto'}>
                    <div className="swiper-wrapper">
                        <SwiperSlide
                            className={`genre_item ${genreNumber === 'All' ? 'active' : ''}`}
                            onClick={() => genreChange('All')}
                        >
                            All
                        </SwiperSlide>

                        {genreTitle?.map((item: GenreItem) => {
                            const key = item.id ?? item.name ?? 'genre-item';
                            return (
                                <SwiperSlide
                                    className={`genre_item ${genreNumber === item.id ? 'active' : ''}`}
                                    key={String(key)}
                                    onClick={() => typeof item.id === 'number' && genreChange(item.id)}
                                >
                                    {item.name}
                                </SwiperSlide>
                            );
                        })}
                    </div>
                </Swiper>
            </div>

            <div className="item_container genre">
                {progressState && <LoadingProgress progress={calculateProgress()} />}

                <GenreSortSelect onSelectChange={handleSortChange} />

                <div className="genre_box">
                    {listLoading ? (
                        <Loading />
                    ) : (
                        <ul className="genre_list">
                            {genreList?.map((item: GenreItem, index: number) => {
                                const cardKey = item.id ?? index;
                                return (
                                    <li className="genre_card" key={String(cardKey)}>
                                        <Link to={`/detail/${type}/${item.id}`} className="link">
                                            {item.poster_path ? (
                                                <picture>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                                                        alt={item.title || item.name || 'poster'}
                                                        loading="lazy"
                                                    />
                                                </picture>
                                            ) : (
                                                <picture className="img_none">
                                                    <img src={imgNone} alt="img_none" loading="lazy" />
                                                </picture>
                                            )}

                                            <p className="tit">{item.title || item.name}</p>
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className="more_card">
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <button type="button" className="list_more" onClick={listMoreBtn}>
                                        더보기
                                    </button>
                                )}
                            </li>
                        </ul>
                    )}
                </div>

                {scrollFixed && (
                    <button type="button" className="top_btn" onClick={useScrollTop}>
                        <span className="blind">위로</span>
                    </button>
                )}
            </div>
        </>
    );
};

export default Genre;
