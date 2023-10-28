
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";
import Header from "./components/Header";
import Genre from "./components/Genre";
import Search from "./components/Search";
import PersonDetail from "./components/PersonDetail";
import SeriesDetail from "./components/SeriesDetail";
import {useState, useEffect} from "react";

export default function App() {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const scrollY = window.scrollY;
        setScrollY(scrollY)
    }, []);


  return (
      <div>
          <Header></Header>
          <Routes>
              <Route path='/' element={<Main />} ></Route>
              <Route path='/search' element={<Search />} ></Route>
              <Route path='/detail/:type/:id' element={<ItemDetail />} ></Route>
              <Route path='/genre/:type' element={<Genre/>} ></Route>
              <Route path='/person/:id' element={<PersonDetail />} ></Route>
              <Route path='/series/:id/episode' element={<SeriesDetail />} ></Route>
          </Routes>
      </div>
  );
}
