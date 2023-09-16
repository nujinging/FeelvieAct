import axios from 'axios';


const request  = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
    params: {
        api_key : process.env.REACT_APP_API_KEY,
        language: 'ko-KR',
    }
})


export const movieApi = {
    nowPlaying: () => request.get(`movie/now_playing`),
    popular: () => request.get(`movie/popular`),
    today: (time_window) => request.get(`trending/movie/${time_window}`),

    detail: (movie_id) => request.get(`movie/${movie_id}`),
    credits: (movie_id) => request.get(`movie/${movie_id}/credits`),
    similar: (movie_id) => request.get(`movie/${movie_id}/similar`),
    social : (movie_id) => request.get(`/movie/${movie_id}/external_ids`),

    genreTitle : () => request.get(`genre/movie/list`),
    genreList : (genre_number) => request.get(`discover/movie?with_genres=${genre_number}`),
};
