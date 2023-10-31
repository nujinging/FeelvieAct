import './App.scss';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Main from "./components/Main";
import ItemDetail from "./components/ItemDetail";
import Header from "./components/Header";
import Genre from "./components/Genre";
import Search from "./components/Search";
import PersonDetail from "./components/PersonDetail";
import SeriesDetail from "./components/SeriesDetail";
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
                <Route path='/series/:id/episode' element={<SeriesDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}