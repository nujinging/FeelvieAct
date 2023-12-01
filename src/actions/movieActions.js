import {detailUrl, socialUrl, ottUrl} from '../util/action';
import {movieApi} from "../util/movieApi";

export const movieActions = (id, number) => async (dispatch) => {
  try {
    const detail = await movieApi.detail(id, number)
    dispatch(detailUrl(detail));

    const social = await movieApi.social(id, number)
    dispatch(socialUrl(social));

    const ott = await movieApi.ottList(id, number)
    dispatch(ottUrl(ott));

  } catch (error) {
    console.log(error)
  }
};