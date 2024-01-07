import { detailUrl, socialUrl, ottUrl } from '../util/action.ts';
import { movieApi } from '../util/movieApi.ts';
export const movieActions = (id : number,  number : number) => async (dispatch) => {
  try {
    const detail = await movieApi.detail(id, number);
    dispatch(detailUrl(detail));

    const social = await movieApi.social(id, number);
    dispatch(socialUrl(social));

    const ott = await movieApi.ottList(id, number);
    dispatch(ottUrl(ott));
  } catch (error) {
    console.error(error);
  }
};
