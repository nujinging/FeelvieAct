import './scss/layout/common.scss';
import {Route, Routes} from 'react-router-dom';
import Main from "./page/Main";
import ItemDetail from "./page/ItemDetail";
import Genre from "./page/Genre";
import Search from "./page/Search";
import PersonDetail from "./page/PersonDetail";
import SeasonDetail from "./page/SeasonDetail";
import NotFound from "./page/components/NotFound";
import PageLayout from "./page/layout/PageLayout";
import CreditsDetail from "./page/CreditsDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout/>}>
        <Route path='/' element={<Main/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/detail/:type/:id' element={<ItemDetail/>}/>
        <Route path='/detail/:type/:id/credits' element={<CreditsDetail/>}/>
        <Route path='/genre/:type/:number' element={<Genre/>}/>
        <Route path='/person/:id' element={<PersonDetail/>}/>
        <Route path='/:type/season/:id/episode' element={<SeasonDetail/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}