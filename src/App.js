
import './App.css';
import { movieApi } from "./util/movieApi";
import { useState, useEffect } from 'react';
import List from "./components/List";


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
        week : []
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
              <div className="item_container">
                  {Object.entries(titles).reduce((acc, [key, title]) => {
                      const list = lists[key];
                      acc.push(
                          <div key={key}>
                              <h2>{title}</h2>
                          </div>
                      );
                      acc.push(
                          <List key={`list_${key}`} list={list}></List>
                      );
                      return acc;
                  }, [])}
              {/*    c.map((cValue, idx) => {*/}
              {/*    console.log(cValue, d[idx])*/}
              {/*})*/}
              {/*    setLists({*/}
              {/*    playing: {*/}
              {/*    title: '지금 상영중이에요!',*/}
              {/*    listData: play.data.results,*/}
              {/*},*/}
              {/*    popular: {*/}
              {/*    title: '가장 인기있는 영화',*/}
              {/*    listData: popular.data.results,*/}
              {/*},*/}
              {/*    day: {*/}
              {/*    title: '오늘 하루 가장 많이 본 영화',*/}
              {/*    listData: day.data.results,*/}
              {/*},*/}
              {/*    week: {*/}
              {/*    title: '이번 주 가장 많이 본 영화',*/}
              {/*    listData: week.data.results,*/}
              {/*}*/}
              {/*});*/}
              </div>
          </div>
      </div>
  );
}

export default App;
