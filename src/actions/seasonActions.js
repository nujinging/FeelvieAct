import { seasonUrl } from '../util/action';
import {movieApi} from "../util/movieApi";
export const seasonActions = (id, number) => async (dispatch) => {
    try {
        const season = await movieApi.seasons(id, number)
        dispatch(seasonUrl(season));
    } catch (error) {
        console.log(error)
    }
};