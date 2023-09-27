import HomeSlide from "./HomeSlide";
import List from "./List";
import {movieApi} from "./../util/movieApi";
import {useState, useEffect} from 'react';

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
            <div className="container">
                <HomeSlide lists={lists.main}></HomeSlide>
                <div className="item_container">

                    <div className="title">
                        <h2>지금 상영중이에요!</h2>
                    </div>
                    <List list={lists.playing} />


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
                    <List type={typeTabs.popular} list={lists.popular} />



                    <div className="title">
                        <h2>오늘 가장 많이 찾아 본 컨텐츠</h2>
                        <ul className="type_list">
                            <li>
                                <button type="button" className={typeTabs.day === 'movie' ? 'active' : ''} onClick={() => typeChange('day', 'movie')}>영화</button>
                            </li>
                            <li>
                                <button type="button" className={typeTabs.day === 'tv' ? 'active' : ''} onClick={() => typeChange('day', 'tv')}>TV</button>
                            </li>
                        </ul>
                    </div>
                    <List type={typeTabs.day} list={lists.day} />

                    <div className="title">
                        <h2>이번 주 가장 많이 찾아 본 컨텐츠</h2>
                        <ul className="type_list">
                            <li>
                                <button type="button" className={typeTabs.week === 'movie' ? 'active' : ''} onClick={() => typeChange('week', 'movie')}>영화</button>
                            </li>
                            <li>
                                <button type="button" className={typeTabs.week === 'tv' ? 'active' : ''} onClick={() => typeChange('week', 'tv')}>TV</button>
                            </li>
                        </ul>
                    </div>
                    <List type={typeTabs.week} list={lists.week} />

                </div>
            </div>
        </div>
    )
}


