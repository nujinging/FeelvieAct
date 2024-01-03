import { ThunkAction } from 'redux-thunk';
import { RootState } from '../util/store';
import { detailUrl, socialUrl, ottUrl } from '../util/action';
import { movieApi } from '../util/movieApi';

type MovieActions = ThunkAction<void, RootState, Number, any>;

export const movieActions = (id: string, number: number): MovieActions => async (dispatch) => {
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
