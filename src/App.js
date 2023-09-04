
import './App.css';
import { movieApi } from "./util/movieApi";
import { useState, useEffect } from 'react';
import List from "./components/List";


function App() {
    const [popularList, setPopularList] = useState([]);

    useEffect(() => {
        async function Api() {
            const popular = await movieApi.popular('')
            const popularResults = popular.data.results
            setPopularList(popularResults)
        }
        Api();
    }, []);

    // // 콘솔용
    // useEffect(() => {
    //     console.log(popularList);
    // }, [popularList]);

  return (
      <div className="App">
          <List popularList={popularList}></List>
      </div>
  );
}

export default App;
