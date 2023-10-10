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
    seasons : (season_id, season_number) => request.get(`'tv'/${season_id}/season/${season_number}`),

    genreTitle : (type) => request.get(`genre/${type}/list`),
    genreList : (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}`),

    person : (id) => request.get(`person/${id}`),
    search : (keyword) => request.get(`search/multi`, {
        params : {
            query : keyword
        }
    }),

    personArt : (type, id) => request.get(`person/${type}/${id}_credits`)
};
