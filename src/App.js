
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";



function App() {

  return (
      <Routes>
          <Route path='/' element={<Main />} ></Route>
          <Route path='/detail' element={<ItemDetail />} ></Route>
      </Routes>
  );
}

export default App;
