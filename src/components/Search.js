import './../App.scss';
import {useEffect, useState} from "react";
import {movieApi} from "../util/movieApi";
import {debounce} from 'lodash';

function App() {
    const [searchWord, setSearchWord] = useState('');
    const [searchList, setSearchList] = useState([]);

    const debounceApiCall = debounce(async (value) => {
        if (value) {
            const response = await movieApi.search(value);
            setSearchList(response.data.results);
            console.log(response.data.results);  // 업데이트된 결과 확인
        }
    }, 1000);

    useEffect(() => {
        debounceApiCall(searchWord);
    }, [searchWord]);

    const searchChange = (event) => {
        const value = event.target.value;
        setSearchWord(value);
    };

    return (
        <div className="search_container">
            <form>
                <label className="search_input" htmlFor="search_input">
                    <input id="search_input" type="text"
                           placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요" className="search_txt" onChange={searchChange}/>
                    <button type="button" className="icon_search">
                        <span className="blind">검색</span>
                    </button>
                </label>
            </form>

            <div className="search_none">
                검색결과가 없습니다.
            </div>
            <ul className="search_list">

                {
                    searchList.map(item => {
                        return (
                            <li className="list_card">
                                <picture>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt="Movie Poster"
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
