import {seasonUrl} from '../util/action';
import {movieApi} from "../util/movieApi";

const seasonActions = (id : number,  number : number) => async (dispatch) => {
  try {
    const season = await movieApi.seasons(id, number)
    dispatch(seasonUrl(season));
  } catch (error) {
    console.log(error)
  }
};

export default seasonActions;
