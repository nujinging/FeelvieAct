import { seriesUrl } from './action';
import {movieApi} from "./movieApi";
export const seasonActions = (id, number) => async (dispatch) => {
    try {
        const series = await movieApi.seasons(id, number)
        dispatch(seriesUrl(series));
    } catch (error) {
    }
};