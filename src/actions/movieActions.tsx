import { detailUrl, socialUrl, ottUrl } from '../util/action';
import { movieApi } from '../util/movieApi';
export const movieActions = (id: string, seasonNumber: number) => async (dispatch) => {
  try {
    const detail = await movieApi.detail(id, seasonNumber);
    dispatch(detailUrl(detail));

    const social = await movieApi.social(id, seasonNumber);
    dispatch(socialUrl(social));

    const ott = await movieApi.ottList(id, seasonNumber);
    dispatch(ottUrl(ott));
  } catch (error) {
    console.error(error);
  }
};
