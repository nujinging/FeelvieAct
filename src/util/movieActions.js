import { detailUrl, creditsUrl } from './action';
import {movieApi} from "./movieApi";
export const movieActions = (id, number) => async (dispatch) => {
    try {
        const detail = await movieApi.detail(id, number)
        dispatch(detailUrl(detail));

        const credits = await movieApi.detail(id, number)
        dispatch(creditsUrl(credits));


    } catch (error) {
    }
};