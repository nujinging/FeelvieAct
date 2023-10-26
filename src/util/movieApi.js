import axios from 'axios';


const request  = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
    params: {
        api_key : process.env.REACT_APP_API_KEY,
        language: 'ko-KR',
    }
})


export const movieApi = {
    nowPlaying: (type) => request.get(`${type}/now_playing`),
    popular: (type) => request.get(`${type}/popular`),
    today: (type, time_window) => request.get(`trending/${type}/${time_window}`),

    detail: (type, movie_id) => request.get(`${type}/${movie_id}`),
    credits: (type, movie_id) => request.get(`${type}/${movie_id}/credits`),
    similar: (type, movie_id) => request.get(`${type}/${movie_id}/similar`),
    social : (type, movie_id) => request.get(`${type}/${movie_id}/external_ids`),
    seasons : (season_id, season_number) => request.get(`tv/${season_id}/season/${season_number}`),
    seasonImg : (type, movie_id) => request.get(`${type}/${movie_id}/images?&language=fr&include_image_language=fr,null,kr`),
    seasonVideo : (type, movie_id) => request.get(`${type}/${movie_id}/videos?&language=fr&include_image_language=fr,null,kr`),
    episode : (season_id, season_number, episode_number) => request.get(`tv/${season_id}/season/${season_number}/episode/${episode_number}`),
    episodeImg : (season_id, season_number, episode_number) => request.get(`tv/${season_id}/season/${season_number}/episode/${episode_number}/images`),

    genreTitle : (type) => request.get(`genre/${type}/list`),
    genreList : (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}`),

    genrePopularDesc : (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
    genrePopularAsc : (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.asc`),
    genreDateDesc : (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.desc`),
    genreDateAsc : (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.asc`),
    ottList : (type, movie_id) => request.get(`${type}/${movie_id}/watch/providers`),


    watchList : (type) => request.get(`discover/${type}&with_watch_providers=8&with_region=KR`),

    person : (id) => request.get(`person/${id}`),
    search : (keyword) => request.get(`search/multi`, {
        params : {
            query : keyword
        }
    }),

    personArt : (type, id) => request.get(`person/${type}/${id}_credits`)
};
