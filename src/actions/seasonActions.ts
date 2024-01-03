import {seasonUrl} from '../util/action.ts';
import {movieApi} from "../util/movieApi.ts";

const seasonActions = (id : number,  number : number) => async (dispatch) => {
  try {
    const season = await movieApi.seasons(id, number)
    dispatch(seasonUrl(season));
  } catch (error) {
    console.log(error)
  }
};

export default seasonActions;
