import {seasonUrl} from '../util/action.ts';
import {movieApi} from "../util/movieApi.ts";

export const seasonActions = (id : number,  number : number) => async (dispatch) => {
  try {
    const season = await movieApi.seasons(id, number)
    dispatch(seasonUrl(season));
  } catch (error) {
    console.log(error)
  }
};

