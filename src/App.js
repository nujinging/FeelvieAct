
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";
import Header from "./components/Header";



function App() {

  return (
      <div>
          <Header></Header>
          <Routes>
              <Route path='/' element={<Main />} ></Route>
              <Route path='/detail/:id' element={<ItemDetail />} ></Route>
          </Routes>
      </div>
  );
}

export default App;
