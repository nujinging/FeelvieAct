import { sendData } from './action';
import {movieApi} from "./movieApi";
export const movieActions = (id, number) => async (dispatch) => {
    try {
        const detail = await movieApi.detail(id, number)
        dispatch(sendData(detail));
    } catch (error) {
    }
};