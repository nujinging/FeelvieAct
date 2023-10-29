import HomeSlide from "./HomeSlide";
import List from "./List";
import {movieApi} from "./../util/movieApi";
import {useState, useEffect} from 'react';
import EventModal from "./EventModal";

export default function Main() {
    const [lists, setLists] = useState({
        playing: [],
        main: [],
        popular: [],
        day: [],
        week: [],
    })
    const [typeTabs, setTypeTabs] = useState({
        popular: 'movie',
        day: 'movie',
        week: 'movie'
    });

    const typeChange = (section, type) => {
        // 이전 상태를 유지하면서 section에 해당하는 값을 type으로 업데이트
        setTypeTabs(prevTypeTabs => ({
            ...prevTypeTabs,
            [section]: type
        }));
    };

    useEffect(() => {
        async function Api() {
            const play = await movieApi.nowPlaying('movie');
            const main = await movieApi.popular('movie');
            const popular = await movieApi.popular(typeTabs.popular);
            const day = await movieApi.today(typeTabs.day, 'day');
            const week = await movieApi.today(typeTabs.week, 'week');

            setLists({
                playing: play.data.results,
                main: main.data.results,
                popular: popular.data.results,
                day: day.data.results,
                week: week.data.results
            })
        }

        Api();
    }, [typeTabs]);

    return (
        <div>
            <EventModal></EventModal>
            <div className="container">
                <HomeSlide type="movie" lists={lists.main}></HomeSlide>
                <div className="item_container">

                    <div className="title">
                        <h2>지금 상영중이에요!</h2>
                    </div>
                    <List type="movie" list={lists.playing} class={"item_list"} />


                    <div className="title">
                        <h2>가장 인기있는 컨텐츠</h2>
                        <ul className="type_list">
                            <li>
                                <button type="button" className={typeTabs.popular === 'movie' ? 'active' : ''} onClick={() => typeChange('popular', 'movie')}>영화</button>
                            </li>
                            <li>
                                <button type="button" className={typeTabs.popular === 'tv' ? 'active' : ''} onClick={() => typeChange('popular', 'tv')}>TV</button>
                            </li>
                        </ul>
                    </div>
                    <List type={typeTabs.popular} list={lists.popular} class={"item_list"} />



                    <div className="title">
                        <h2>
                            <span>오늘 가장 많이</span>
                            찾아 본 컨텐츠
                        </h2>
                        <ul className="type_list">
                            <li>
                                <button type="button" className={typeTabs.day === 'movie' ? 'active' : ''} onClick={() => typeChange('day', 'movie')}>영화</button>
                            </li>
                            <li>
                                <button type="button" className={typeTabs.day === 'tv' ? 'active' : ''} onClick={() => typeChange('day', 'tv')}>TV</button>
                            </li>
                        </ul>
                    </div>
                    <List type={typeTabs.day} list={lists.day} class={"item_list"} />

                    <div className="title">
                        <h2>
                            <span>이번 주 가장 많이</span>
                            찾아 본 컨텐츠
                        </h2>
                        <ul className="type_list">
                            <li>
                                <button type="button" className={typeTabs.week === 'movie' ? 'active' : ''} onClick={() => typeChange('week', 'movie')}>영화</button>
                            </li>
                            <li>
                                <button type="button" className={typeTabs.week === 'tv' ? 'active' : ''} onClick={() => typeChange('week', 'tv')}>TV</button>
                            </li>
                        </ul>
                    </div>
                    <List type={typeTabs.week} list={lists.week} class={"item_list"} />

                </div>
            </div>
        </div>
    )
}


