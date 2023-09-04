
import './App.css';
import { movieApi } from "./util/movieApi";
import { useState, useEffect } from 'react';
import List from "./components/List";


function App() {

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
                  <div className="title">
                      <h2>지금 상영중이에요!</h2>
                  </div>
                  {Object.entries(lists).map(([title, list]) => (
                      <List list={list}></List>
                  ))}

                  {/*<div className="title" key={title}>*/}
                  {/*    <h2>{title === 'playing' ? '지금 상영중이에요!' : title === 'popular' ? '가장 인기있는 컨텐츠' : title === 'day' ? '오늘 가장 많이 찾아 본 컨텐츠' : '이번 주 가장 많이 찾아 본 컨텐츠'}</h2>*/}
                  {/*    <List list={list} />*/}
                  {/*</div>*/}

                  {/*<List list={playing}></List>*/}

                  {/*<div className="title">*/}
                  {/*    <h2>가장 인기있는 컨텐츠</h2>*/}
                  {/*</div>*/}
                  {/*<List list={popularList}></List>*/}


                  {/*<div className="title">*/}
                  {/*    <h2>오늘 가장 많이 찾아 본 컨텐츠</h2>*/}
                  {/*</div>*/}
                  {/*<List list={dayList}></List>*/}

                  {/*<div className="title">*/}
                  {/*    <h2>이번 주 가장 많이 찾아 본 컨텐츠</h2>*/}
                  {/*</div>*/}
                  {/*<List list={weekList}></List>*/}

              </div>
          </div>
      </div>
  );
}

export default App;
