import {movieApi} from "./../util/movieApi";
import {useState, useEffect, lazy, Suspense} from 'react';
import Loading from "./Loading";

const LazyHomeSlide = lazy(() => import("./HomeSlide"));
const LazyList = lazy(() => import("./List"));
const LazyEventModal = lazy(() => import("./Modal/EventModal"));

export default function Main() {
    const [popularLoading, setPopularLoading] = useState(true);
    const [dayLoading, setDayLoading] = useState(true);
    const [weekLoading, setWeekLoading] = useState(true);
    const [playing, setPlaying] = useState([]);
    const [main, setMain] = useState([]);
    const [popular, setPopular] = useState([]);
    const [day, setDay] = useState([]);
    const [week, setWeek] = useState([]);

    const [popularType, setPopularType] = useState('movie');
    const [dayType, setDayType] = useState('movie');
    const [weekType, setWeekType] = useState('movie');

    const popularChange = (type) => {
        setPopularLoading(true);
        setPopularType(type);
        if (type  === popularType) {
            setPopularLoading(false);
        }
    };

    const dayChange = (type) => {
        setDayLoading(true);
        setDayType(type);
    };

    const weekChange = (type) => {
        setWeekLoading(true);
        setWeekType(type);
    };

    useEffect(() => {
        async function fatchApi() {
            try {
                const play = await movieApi.nowPlaying('movie');
                setPlaying(play.data.results);

                const main = await movieApi.popular('movie');
                setMain(main.data.results);

                const popular = await movieApi.popular(popularType);
                setPopular(popular.data.results);
                setPopularLoading(false);

                const day = await movieApi.today(dayType, 'day');
                setDay(day.data.results);
                setDayLoading(false);

                const week = await movieApi.today(weekType, 'week');
                setWeek(week.data.results);
                setWeekLoading(false);

            } catch (error) {
                console.log(error)
            }
        }

        fatchApi();
    }, [popularType, dayType, weekType]);

    return (
        <Suspense fallback={
            <Loading></Loading>
        }>
            <LazyEventModal></LazyEventModal>
            <div className="container">

                <LazyHomeSlide type="movie" list={main}></LazyHomeSlide>

                <div className="item_container">

                    <div className="item_box">
                        <div className="title">
                            <h2>&#x1F3AC; 지금 상영중이에요!</h2>
                        </div>
                        <LazyList type="movie" list={playing} class={"item_list"}/>
                    </div>

                    <div className="item_box">
                        <div className="title">
                            <h2>&#x1F44D;가장 인기있는 컨텐츠</h2>
                            <ul className="type_list">
                                <li>
                                    <button type="button"
                                            className={popularType === 'movie' ? 'active' : ''}
                                            onClick={() => popularChange('movie')}>영화
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className={popularType === 'tv' ? 'active' : ''}
                                            onClick={() => popularChange('tv')}>TV
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {
                            popularLoading ? (
                                <div className="loading">
                                    <span className="loader"></span>
                                </div>

                            ) : (
                                <LazyList type={popularType} list={popular} class={"item_list"}/>

                            )
                        }

                    </div>

                    <div className="item_box">
                        <div className="title">
                            <h2>
                                <span>&#x1F4C5; 오늘 가장 많이</span>
                                찾아 본 컨텐츠
                            </h2>
                            <ul className="type_list">
                                <li>
                                    <button type="button" className={dayType === 'movie' ? 'active' : ''}
                                            onClick={() => dayChange('movie')}>영화
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className={dayType === 'tv' ? 'active' : ''}
                                            onClick={() => dayChange('tv')}>TV
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {
                            dayLoading ? (
                                <div className="loading">
                                    <span className="loader"></span>
                                </div>
                            ) : (
                                <LazyList type={dayType} list={day} class={"item_list"}/>
                            )
                        }

                    </div>

                    <div className="item_box">
                        <div className="title">
                            <h2>
                                <span>&#x1F4C5; 이번 주 가장 많이</span>
                                찾아 본 컨텐츠
                            </h2>
                            <ul className="type_list">
                                <li>
                                    <button type="button" className={weekType === 'movie' ? 'active' : ''}
                                            onClick={() => weekChange('movie')}>영화
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className={weekType === 'tv' ? 'active' : ''}
                                            onClick={() => weekChange('tv')}>TV
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {
                            weekLoading ? (
                                <div className="loading">
                                    <span className="loader"></span>
                                </div>
                            ) : (
                                <LazyList type={weekType} list={week} class={"item_list"}/>
                            )
                        }
                    </div>

                </div>
            </div>
        </Suspense>
    )
}


