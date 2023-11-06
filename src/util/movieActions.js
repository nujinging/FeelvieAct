import { detailUrl, creditsUrl, socialUrl, recommendUrl, ottUrl, imageUrl, videoUrl } from './action';
import {movieApi} from "./movieApi";
export const movieActions = (id, number) => async (dispatch) => {
    try {
        const detail = await movieApi.detail(id, number)
        dispatch(detailUrl(detail));

        const credits = await movieApi.credits(id, number)
        dispatch(creditsUrl(credits));

        const social = await movieApi.social(id, number)
        dispatch(socialUrl(social));

        const recommend = await movieApi.recommend(id, number)
        dispatch(recommendUrl(recommend));

        const ott = await movieApi.ottList(id, number)
        dispatch(ottUrl(ott));

        const image = await movieApi.seasonImg(id, number)
        dispatch(imageUrl(image));

        const video = await movieApi.seasonVideo(id, number)
        dispatch(videoUrl(video));

    } catch (error) {
    }
};