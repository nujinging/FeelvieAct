
import './../App.scss';

function App() {

    return (
        <div className="search_container">
            <form>
                <label className="search_input" htmlFor="search_input">
                    <input id="search_input" type="text"
                    placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요" className="search_txt" />
                    <button type="button" className="icon_search">
                        <span className="blind">검색</span>
                    </button>
                </label>
            </form>

            <div className="search_none">
                검색결과가 없습니다.
            </div>

            <ul className="search_list">
                <li className="list_card">
                <picture>
                </picture>
                <p className="tit"></p>
                <p className="tit"></p>
            </li>
        </ul>

        </div>
    );
}

export default App;
