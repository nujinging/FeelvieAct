import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from "./movieReducer.ts";

interface RootState {
    movies: ReturnType<typeof moviesReducer>;
}

const rootReducer = combineReducers({
    movies: moviesReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
