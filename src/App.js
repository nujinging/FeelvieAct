
import './App.scss';
import { movieApi } from "./util/movieApi";
import { useState, useEffect } from 'react';
import List from "./components/List";
import HomeSlide from "./components/HomeSlide";


function App() {

    const titles = {
        playing: '지금 상영중이에요!',
        popular: '가장 인기있는 영화',
        day: '오늘 하루 가장 많이 본 영화',
        week: '이번 주 가장 많이 본 영화',
    }

    const [lists, setLists] = useState({
        playing : [],
        popular : [],
        day : [],
        week : [],
        main: []
    })
    useEffect(() => {
        async function Api() {
            const play = await movieApi.nowPlaying('')
            const popular = await movieApi.popular('')
            const day = await movieApi.today('day')
            const week = await movieApi.today('week')


            setLists({
                playing : play.data.results,
                popular : popular.data.results,
                day : day.data.results,
                week : week.data.results
            })
        }
        Api();
    }, []);

  return (
      <div className="App">
          <div className="container">
              <HomeSlide lists={lists.popular}></HomeSlide>
              <div className="item_container">
                  {Object.entries(titles).reduce((acc, [key, title]) => {
                      const list = lists[key];
                      acc.push(
                          <div className="title" key={key}>
                              <h2>{title}</h2>
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
  );
}

export default App;
