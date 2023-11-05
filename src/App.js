import './App.scss';
import {Route, Routes} from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";
import Genre from "./components/Genre";
import Search from "./components/Search";
import PersonDetail from "./components/PersonDetail";
import SeasonDetail from "./components/SeasonDetail";
import NotFound from "./components/NotFound";
import PageLayout from "./components/PageLayout";

export default function App() {
    return (
        <Routes>
            <Route element={<PageLayout />}>
                <Route path='/' element={<Main />} />
                <Route path='/search' element={<Search />} />
                <Route path='/detail/:type/:id' element={<ItemDetail />} />
                <Route path='/genre/:type' element={<Genre />} />
                <Route path='/person/:id' element={<PersonDetail />} />
                <Route path='/series/:id/episode' element={<SeasonDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}