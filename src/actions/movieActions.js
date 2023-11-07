import { detailUrl, creditsUrl, socialUrl, recommendUrl, ottUrl, imageUrl, videoUrl, genreUrl, genrePopularDescUrl, genrePopularAscUrl, genreDateDescUrl, genreDateAscUrl } from '../util/action';
import {movieApi} from "../util/movieApi";
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

        const genre = await movieApi.genreList(id, number)
        dispatch(genreUrl(genre));

        const genrePopularDesc = await movieApi.genrePopularDesc(id, number)
        dispatch(genrePopularDescUrl(genrePopularDesc));

        const genrePopularAsc = await movieApi.genrePopularAsc(id, number)
        dispatch(genrePopularAscUrl(genrePopularAsc));

        const genreDateDesc = await movieApi.genreDateDesc(id, number)
        dispatch(genreDateDescUrl(genreDateDesc));

        const genreDateAsc = await movieApi.genreDateAsc(id, number)
        dispatch(genreDateAscUrl(genreDateAsc));


    } catch (error) {
    }
};