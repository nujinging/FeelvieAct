
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";
import Header from "./components/Header";
import Genre from "./components/Genre";
import Search from "./components/Search";
import PersonDetail from "./components/PersonDetail";
import EventModal from "./components/EventModal";
import {useState} from "react";



function App() {

    const [modalOpen, setModalOpen] = useState(false);



  return (
      <div>
          <EventModal></EventModal>
          <Header></Header>
          <Routes>
              <Route path='/' element={<Main />} ></Route>
              <Route path='/search' element={<Search />} ></Route>
              <Route path='/detail/:type/:id' element={<ItemDetail />} ></Route>
              <Route path='/genre/:type' element={<Genre />} ></Route>
              <Route path='/person/:id' element={<PersonDetail />} ></Route>
          </Routes>
      </div>
  );
}

export default App;
