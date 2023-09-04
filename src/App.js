
import './App.css';
import { movieApi } from "./util/movieApi";
import { useState, useEffect } from 'react';

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

    // 콘솔용
    useEffect(() => {
        console.log(popularList);
    }, [popularList]);

  return (
      <div className="App">
          {/*<p>{popularList[2].title}</p>*/}
      </div>
  );
}

export default App;
