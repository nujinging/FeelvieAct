import './../scss/genre.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import { ItemState, MediaType, MediaItem, SelectValue, typeGenreTitleNumber } from '../types/commonTypes';
import "swiper/css";
import "swiper/css/navigation";
import {movieApi} from "../util/movieApi.ts";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoadingProgress from "./components/LoadingProgress.tsx";
import Loading from "./components/Loading.tsx";
import {debounce} from 'lodash';
import imgNone from '../images/img_card_none.png';
import useScrollFixed from "../commonEvent/useScrollFixed";
import useScrollTop from "../commonEvent/useScrollTop";
import GenreSortSelect from "./components/GenreSortSelect.tsx";
interface GenreItem {
    id?: any;
    title?: string;
    name?: string;
    poster_path?: string;
}

const Genre: React.FC<GenreItem> = ({id, title, name, poster_path}) => {
  const {type, genreNumberParams} = useParams() as { type : MediaType , genreNumberParams : any};
  const navigate = useNavigate();

  const [loading, setLoading] = useState<ItemState>(false);
  const [listLoading, setListLoading] = useState<ItemState>(true);
  const [progressState, setProgressState] = useState<ItemState>(true);

  const [genreTitle, setGenreTitle] = useState<GenreItem[]>([]);
  const [genreList, setGenreList] = useState<GenreItem[]>([]);
  const [genreNumber, setGenreNumber] = useState<typeGenreTitleNumber>('All');

  const [page, setPage] = useState<number>(1);

  const [selectedSort, setSelectedSort] = useState<string>('');

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
    }

// 공통 스크롤 감지
  const scrollFixed = useScrollFixed();

// 상단 프로그래스바
  const calculateProgress = () => {
    return !listLoading ? 0 : 100;
  };

// 장르 선택
  const genreChange = async (itemId : 'All' | number) => {
    setListLoading(true);
    setProgressState(true);
    setGenreNumber(itemId);
    console.log(itemId);
    navigate(`/genre/${type}/${itemId}`);
  };

// 정렬 선택

  useEffect(()=> {
      async function sortChange() {
          try {
              setProgressState(true);
              setListLoading(true);
              let genreUrl;
              switch (selectedSort) {
                  case 'popularityDesc' :
                      genreUrl = await movieApi.genrePopularDesc(type, genreNumberParams as number);
                      break;
                  case 'popularityAsc' :
                      genreUrl = await movieApi.genrePopularAsc(type, genreNumberParams as number);
                      break;
                  case 'dateDesc' :
                      genreUrl = await movieApi.genreDateDesc(type, genreNumberParams as number);
                      break;
                  case  'dateAsc' :
                      genreUrl = await movieApi.genreDateAsc(type, genreNumberParams as number);
                      break;
                  default:
                      break;
              }
              setGenreList(genreUrl.data.results);
          } catch (error) {
              console.log(error)
          } finally {
              setProgressState(false);
              setListLoading(false);
          }
      }
      sortChange();
  }, [selectedSort])

// 장르 변경 시 리스트 변경
  useEffect(() => {
    async function fetchApi() {
      setProgressState(true);
      setListLoading(true);
      try {
        const genre = await movieApi.genreTitle(type);
        setGenreTitle(genre.data.genres);
        if (genreNumber === 'All') {
          const popular = await movieApi.popular(type);
          setGenreList(popular.data.results);
          setGenreNumber(genreNumberParams);
        } else {
          const genreUrl = await movieApi.genreList(type, genreNumber);
          setGenreList(genreUrl.data.results);
        }

        setProgressState(false);
        setListLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    fetchApi();
  }, [type, genreNumber, genreNumberParams]);



    /* 리스트 더보기 */
    const listMoreBtn = () => {
        setLoading(true);
        ListMore();
        console.log(genreList)
    }

  const ListMore = debounce(() => {
    const nextPage = page + 1;
    const PageData = async () => {
      try {
        if (genreNumberParams === 'All') {
          const popularScroll = await movieApi.popularScroll(type, nextPage);
          setGenreList((prevGenreList) => [...prevGenreList, ...popularScroll.data.results]);
        } else {
          const genreUrlScroll = await movieApi.genreScroll(type, genreNumber as number, nextPage);
          setGenreList((prevGenreList) => [...prevGenreList, ...genreUrlScroll.data.results]);
        }
      } finally {
        setLoading(false);
      }

    };
    setPage(nextPage);
    PageData();
      console.log(nextPage)
      console.log(genreList)
  }, 1000);


  return (
    <>
      <div className="genre_top">
        <Swiper className={`genre_keyword ${scrollFixed ? "fixed" : ""}`} slidesPerView={"auto"}>
          <div className="swiper-wrapper">
            <SwiperSlide className={`genre_item ${genreNumberParams === 'All' ? 'active' : ''}`}
                         onClick={() => genreChange('All')}
            >
              All
            </SwiperSlide>
            {genreTitle?.map((item : GenreItem, index : number) => {
              return (
                <SwiperSlide className={`genre_item ${genreNumber === item.id ? 'active' : ''}`}
                             key={index}
                             onClick={() => genreChange(item.id)}>
                  {item.name}
                </SwiperSlide>
              )
            })}
          </div>
        </Swiper>


      </div>

      <div className="item_container genre">

        {
          progressState && (
            <LoadingProgress progress={calculateProgress()}></LoadingProgress>
          )
        }

        <GenreSortSelect onSelectChange={handleSortChange}></GenreSortSelect>

        <div className="genre_box">
          {
            listLoading ? (
              <Loading/>
            ) : (
              <ul className="genre_list">
                {genreList?.map((item : GenreItem, index: number) => {
                  return (
                    <>
                      <li className="genre_card" key={index}>
                        <Link to={`/detail/${type}/${item.id}`} className="link">
                          {
                            item.poster_path ? (
                              <picture>
                                <img
                                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                                  alt={item.title || item.name} loading="lazy"/>
                              </picture>

                            ) : (
                              <picture className="img_none">
                                <img src={imgNone} alt="img_none" loading="lazy"/>
                              </picture>
                            )
                          }
                          <p className="tit">
                            {item.title || item.name}
                          </p>
                        </Link>
                      </li>
                    </>
                  )
                })}
                <li className="more_card">
                  {
                    loading ? (
                      <Loading/>
                    ) : (
                      <button type="button" className="list_more"
                              onClick={listMoreBtn}>더보기</button>
                    )
                  }
                </li>
              </ul>
            )
          }
        </div>

        {
          scrollFixed && (
            <button type="button" className="top_btn" onClick={useScrollTop}>
              <span className="blind">위로</span>
            </button>
          )
        }

      </div>
    </>
  );
}

export default Genre;