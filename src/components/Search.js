import './../App.scss';
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {movieApi} from "../util/movieApi";

function App() {
    const [searchWord, setSearchWord] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [searchNone, setSearchNone] = useState('');
    const navigate = useNavigate();

    // 영화 디테일 페이지 이동
    const pageLink = (itemType, itemId) => {
        if (itemType === 'movie' || itemType === 'tv') {
            navigate(`/detail/${itemType}/${itemId}`);
        } else {
            navigate(`/person/${itemId}`);
        }
    }

    // event 객체가 undefined 일때 발생하는 오류 방지 - 유효성 확인
    const searchEnter = (event) => {
        if (event && event.key === 'Enter') {
            searchChange(event);
            event.preventDefault();
        }
    }

    let delayTimer;

    // 1초 동안 추가 입력이 없을때에만 Api 요청
    useEffect(() => {
        if (searchWord) {
            // 초기화
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                const SearchFetch = async () => {
                    const response = await movieApi.search(searchWord);
                    setSearchList(response.data.results);
                };
                SearchFetch();
            }, 500);
        }
        return () => clearTimeout(delayTimer);
    }, [searchWord]);

    // 검색 인풋 값 변경
    const searchChange = (event) => {
        clearTimeout(delayTimer);
        event.preventDefault();
        setSearchWord(event.target.value);
        // 백스페이스 키를 눌러서 입력값을 지운 경우
        if (event.target.value === '') {
            setSearchNone('none');
            // 기존에 들어있던 값 초기화
            setSearchList([]);
        } else {
            setSearchNone('')
        }
    };

    return (
        <div className="search_container">
            <form>
                <label className="search_input" htmlFor="search_input">
                    <input id="search_input" type="text"
                           placeholder="작품이나 인물을 검색해보세요!" className="search_txt" onKeyDown={searchEnter} onChange={searchChange}/>
                    <button type="button" className="icon_search">
                        <span className="blind">검색</span>
                    </button>
                </label>
            </form>

            {
                searchNone === 'none' ? (
                    <div className="search_none">
                        검색결과가 없어요💧
                    </div>
                ) :  searchList.length === 0 && searchWord.length > 0 && (
                    <div className="search_none">
                        검색결과가 없어요💧
                    </div>
                )
            }

            {searchList.length === 0 && (
                <div className="search_tip">
                    <div className="txt">
                        <h1>
                            <strong>
                                TV 프로그램
                            </strong> 검색은 어떠세요?</h1>
                        <p>
                            😎 모든 시즌과 에피소드까지 볼 수 있어요 !<br/>
                            검색할 땐 띄어쓰기를 정확히 해주세요 !
                        </p>
                    </div>
                </div>
            )}

            <ul className="search_list">

                {
                    !searchNone && searchList.map(item => {
                        return (
                            <li className={`list_card ${item.media_type === 'tv' ? 'tv' : (item.profile_path ? 'actor' : 'movie')}`} onClick={() => pageLink(item.media_type, item.id)}>
                                <picture>
                                    {
                                        item.poster_path === null || item.profile_path === null ? (
                                            <div className="card_none">none</div>
                                        ) : (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${item.poster_path ? item.poster_path : item.profile_path}`}
                                                alt="Movie Poster"
                                                loading="lazy"
                                            />
                                        )
                                    }

                                </picture>
                                <p className="tit">
                                    {item.name ? item.name : item.title}
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default App;
