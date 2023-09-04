
import './App.css';
import { movieApi } from "./util/movieApi";
import { useState, useEffect } from 'react';
import List from "./components/List";


function App() {
    const [playing, setPlaying] = useState([]);
    const [popularList, setPopularList] = useState([]);
    const [dayList, setDaylist] = useState([]);
    const [weekList, setWeeklist] = useState([]);

    useEffect(() => {
        async function Api() {
            const play = await movieApi.nowPlaying('')
            const popular = await movieApi.popular('')
            const day = await movieApi.today('day')
            const week = await movieApi.today('week')


            setPlaying(play.data.results)
            setPopularList(popular.data.results)
            setDaylist(day.data.results)
            setWeeklist(week.data.results)
        }
        Api();
    }, []);


  return (
      <div className="App">
          <div className="container">
              <div className="item_container">
                  <div className="title">
                      <h2>지금 상영중이에요!</h2>
                  </div>
                  <List list={playing}></List>

                  <div className="title">
                      <h2>가장 인기있는 컨텐츠</h2>
                  </div>
                  <List list={popularList}></List>


                  <div className="title">
                      <h2>오늘 가장 많이 찾아 본 컨텐츠</h2>
                  </div>
                  <List list={dayList}></List>

                  <div className="title">
                      <h2>이번 주 가장 많이 찾아 본 컨텐츠</h2>
                  </div>
                  <List list={weekList}></List>

              </div>
          </div>
      </div>
  );
}

export default App;
