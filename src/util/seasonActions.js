import { seasonUrl } from './action';
import {movieApi} from "./movieApi";
export const seasonActions = (id, number) => async (dispatch) => {
    try {
        const season = await movieApi.seasons(id, number)
        dispatch(seasonUrl(season));
    } catch (error) {
    }
};