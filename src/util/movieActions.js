import { sendData } from './action';
import {movieApi} from "./movieApi";
export const movieActions = () => async (dispatch) => {
    try {
        const detail = await movieApi.detail('tv', '456')
        dispatch(sendData(detail));
    } catch (error) {
    }
};