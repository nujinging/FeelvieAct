
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";
import Header from "./components/Header";
import Genre from "./components/Genre";
import Search from "./components/Search";



function App() {

  return (
      <div>
          <Header></Header>
          <Routes>
              <Route path='/' element={<Main />} ></Route>
              <Route path='/search' element={<Search />} ></Route>
              <Route path='/detail/:type/:id' element={<ItemDetail />} ></Route>
              <Route path='/genre/:type' element={<Genre />} ></Route>
          </Routes>
      </div>
  );
}

export default App;
