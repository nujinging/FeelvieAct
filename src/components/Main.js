import HomeSlide from "./HomeSlide";
import List from "./List";
import {movieApi} from "./../util/movieApi";
import {useState, useEffect} from 'react';

export default function Main() {
    const titles = {
        playing: '지금 상영중이에요!',
        popular: '가장 인기있는 영화',
        day: '오늘 하루 가장 많이 본 영화',
        week: '이번 주 가장 많이 본 영화',
    }

    const [lists, setLists] = useState({
        playing: [],
        popular: [],
        day: [],
        week: [],
        main: []
    })

    const [typeTab, setTypeTab] = useState('movie')

    const typeChange = (props) => {
        setTypeTab(props)
        console.log(typeTab)
    }


    useEffect(() => {
        async function Api() {
            const play = await movieApi.nowPlaying(typeTab)
            const popular = await movieApi.popular(typeTab)
            const day = await movieApi.today(typeTab, 'day')
            const week = await movieApi.today(typeTab, 'week')

            setLists({
                playing: play.data.results,
                popular: popular.data.results,
                day: day.data.results,
                week: week.data.results
            })
        }

        Api();
    }, []);

    return (
        <div>
            <div className="container">
                <HomeSlide lists={lists.popular}></HomeSlide>
                <div className="item_container">
                    {Object.entries(titles).reduce((acc, [key, title]) => {
                        const list = lists[key];
                        acc.push(
                            <div className="title" key={key}>
                                <h2>{title}</h2>
                                <ul className="type_list">
                                    <li>
                                        <button type="button" className={typeTab === 'movie' ? 'active' : ''} onClick={() => typeChange('movie')}>영화</button>
                                    </li>
                                    <li>
                                        <button type="button" className={typeTab === 'tv' ? 'active' : ''} onClick={() => typeChange('tv')}>TV</button>
                                    </li>
                                </ul>
                            </div>
                        );
                        acc.push(
                            <List key={`list_${key}`} list={list}></List>
                        );
                        return acc;
                    }, [])}
                </div>
            </div>
        </div>
    )
}


