import './scss/layout/common.scss';
import {Route, Routes} from 'react-router-dom';
import Main from "./page/Main.tsx";
import ItemDetail from "./page/ItemDetail.tsx";
import Genre from "./page/Genre.tsx";
import Search from "./page/Search.tsx";
import PersonDetail from "./page/PersonDetail.tsx";
import SeasonDetail from "./page/SeasonDetail.tsx";
import NotFound from "./page/components/NotFound.tsx";
import PageLayout from "./page/layout/PageLayout.tsx";
import CreditsDetail from "./page/CreditsDetail.tsx";

const App : React.FC = () => {
  return (
    <Routes>
      <Route element={<PageLayout/>}>
        <Route path='/' element={<Main/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/detail/:type/:id' element={<ItemDetail/>}/>
        <Route path='/detail/:type/:id/credits' element={<CreditsDetail/>}/>
        <Route path='/genre/:type/:gerneNumberParams' element={<Genre/>}/>
        <Route path='/person/:id' element={<PersonDetail/>}/>
        <Route path='/:type/season/:id/episode' element={<SeasonDetail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;