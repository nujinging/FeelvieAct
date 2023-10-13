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
    }, 1000);

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


            <ul className="search_list">

                {
                    searchList.map(item => {
                        return (
                            <li className="list_card" onClick={() => pageLink(item.media_type, item.id)}>
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
