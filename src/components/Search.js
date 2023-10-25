import './../App.scss';
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {movieApi} from "../util/movieApi";
import {debounce} from 'lodash';

function App() {
    const [searchWord, setSearchWord] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [itemId, setItemId] = useState();
    const navigate = useNavigate();

    // 영화 디테일 페이지 이동
    const pageLink = (itemType, itemId) => {
        setItemId(itemId);
        navigate(`/detail/${itemType}/${itemId}`);
    }
    
    // event 객체가 undefined 일때 발생하는 오류 방지 - 유효성 확인
    const searchEnter = (event) => {
        if (event && event.key === 'Enter') {
            searchChange(event);
            event.preventDefault();
        }
    }

    // 검색 인풋 값 변경
    const searchChange = (event) => {
        const value = event.target.value;
        setSearchWord(value);
    };

    // 검색 후 1초 뒤 Api 호출
    useEffect(() => {
        debounceApiCall(searchWord);
    }, [searchWord]);

    const debounceApiCall = debounce(async (value) => {
        if (value) {
            const response = await movieApi.search(value);
            setSearchList(response.data.results);
        }
    }, 1500);

    console.log(searchList.length)

    return (
        <div className="search_container">

            <form>
                <label className="search_input" htmlFor="search_input">
                    <input id="search_input" type="text"
                           placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요" className="search_txt" onKeyDown={searchEnter} onChange={searchChange}/>
                    <button type="button" className="icon_search">
                        <span className="blind">검색</span>
                    </button>
                </label>
            </form>

            {searchList.length === 0 && searchWord.length > 0 && (
                <div className="search_none">
                    검색결과가 없습니다.
                </div>
            )}



            {searchList.length === 0 &&  (
                <div className="search_tip">
                    <div className="tip_txt">
                        FeelvieAct는 외국계 회사 TMDB 의 Api를 활용해 만들어졌어요.💻<br/>
                        너무 방대한 데이터를 가지고 있기때문에 어떤 것을 검색하면 좋을 지 잘 모를때가 있죠.<br/>
                        다양한 정보를 볼 수 있는 대표적인 작품들을 추천해드릴게요!
                        <br/>
                        <br/>
                        💡 띄어쓰기는 정확히 해주세요 !
                        <p className="txt">
                            Movie : 기생충,  바비, 센과 치히로의 행방불명,  어벤져스<br/>
                        </p>
                        <p className="txt">
                            TV :  심슨 가족, 스파이 패밀리, 워킹데드, 진격의 거인<br/>
                            <span>TV 컨텐츠를 검색하시면 모든 시즌과 에피소드를 확인할 수 있어요</span>
                        </p>

                    </div>


                </div>
            )}


            <ul className="search_list">

                {
                    searchList.map(item => {
                        return (
                            <li className={`list_card ${item.media_type === 'tv' ? 'tv' : 'movie'}`} onClick={() => pageLink(item.media_type, item.id)}>
                                <picture>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt="Movie Poster"
                                        loading="lazy"
                                    />
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
