import './../scss/search.scss'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {movieApi} from "../util/movieApi";
import Loading from "./components/Loading";
import imgNone from "../images/img_card_none.png";
import useScrollFixed from "../hooks/useScrollFixed";
import useScrollTop from "../hooks/useScrollTop";

export default function Search() {
  const [searchWord, setSearchWord] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState(true);
  const [searchNone, setSearchNone] = useState(false);

  // 공통 스크롤 감지
  const scrollFixed = useScrollFixed();


  // 엔터 방지
  const searchEnter = (event) => {
    if (event && event.key === 'Enter') {
      searchChange(event);
      event.preventDefault();
    }
  }

  // 0.5초 동안 추가 입력이 없을때에만 Api 요청
  useEffect(() => {
    let delayTimer;
    const searchFetch = async () => {
      try {
        setLoading(true);
        setIntro(false);
        setSearchNone(false);

        const searchValue = await movieApi.search(searchWord);
        setSearchList(searchValue.data.results);
        setLoading(false);
        setSearchNone(searchValue.data.results.length === 0);
      } catch (error) {
        console.error(error);
      }
    };
    if (searchWord) {
      delayTimer = setTimeout(searchFetch, 500);
    }
    return () => clearTimeout(delayTimer);
  }, [searchWord]);


  // 검색 인풋 값 변경
  const searchChange = (event) => {
    setSearchWord(event.target.value);
    // 백스페이스 키를 눌러서 입력값을 지운 경우
    if (event.target.value === '') {
      setSearchNone(false);
      // 기존에 들어있던 값 초기화
      setSearchList([]);
      // 로딩 없애고 인트로 다시 등장
      setLoading(false);
      setIntro(true);
    } else {
      setSearchNone(false);
      setLoading(true);
      setIntro(false);
    }
  };

  return (
    <div className="search_container">
      <form>
        <label className="search_input" htmlFor="search_input">
          <input id="search_input" type="text"
                 placeholder="작품이나 인물을 검색해보세요!" className="search_txt" onKeyDown={searchEnter}
                 onChange={searchChange}/>
          <button type="button" className="icon_search">
            <span className="blind">검색</span>
          </button>
        </label>
      </form>

      {
        loading ? (
          <Loading/>
        ) : searchList.length > 0 ? (
          <ul className="search_list">
            {
              searchList.map(item => {
                return (
                  <li
                    className={`list_card ${item.media_type === 'tv' ? 'tv' : (item.profile_path ? 'actor' : 'movie')}`}>
                    <Link
                      to={`${item.media_type === 'movie' || item.media_type === 'tv' ? `/detail/${item.media_type}/${item.id}` : `/person/${item.id}`}`}
                      className="link">
                      <picture>
                        {
                          item.poster_path === null || item.profile_path === null ? (
                            <picture className="img_none">
                              <img src={imgNone} alt="img_none" loading="lazy"/>
                            </picture>
                          ) : (
                            <img
                              src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path ? item.poster_path : item.profile_path}`}
                              alt={item.title || item.name}
                              loading="lazy"
                            />
                          )
                        }

                      </picture>
                      <p className="tit">
                        {item.title || item.name}
                      </p>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        ) : null
      }

      {
        searchNone && (
          <div className="search_none">
            검색결과가 없어요💧
          </div>
        )
      }

      {intro && (
        <div className="search_tip">
          <div className="txt">
            <h1>
              모든 시즌과 에피소드까지 볼 수 있는<br/>
              <strong>
                TV 프로그램
              </strong> 검색은 어떠세요?</h1>
            <p>
              예를 들면 <Link to="https://feelvieact.netlify.app/detail/tv/120089" target="_blank" className="search_link">스파이 패밀리</Link> 요 😎<br/>
              물론 영화 <Link to="https://feelvieact.netlify.app/detail/movie/567646" target="_blank" className="search_link">극한직업</Link>도 좋은 작품이죠 !<br/>
              검색할 땐 띄어쓰기를 정확히 해주세요 !
            </p>
          </div>
        </div>
      )}
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



