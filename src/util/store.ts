import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import movieReducer, { MovieReducerState } from './movieReducer.ts';

interface RootState {
    movies: MovieReducerState;
}

const rootReducer = combineReducers<RootState>({
    movies: movieReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
