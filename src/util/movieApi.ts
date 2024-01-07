import axios from 'axios';

interface MovieDetailParams {
    type: string;
    movie_id: number;
    time_window: string;
    genre_number: number;
    page: number;
    id: number;
}

const request = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
    params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'ko-KR',
    }
})

export const movieApi = {
    // 메인 리스트
    nowPlaying: (type: 'movie' | 'tv') => request.get(`${type}/now_playing`),
    popular: (type: 'movie' | 'tv') => request.get(`${type}/popular`),
    today: (type: 'movie' | 'tv', time_window: 'day' | 'week') => request.get(`trending/${type}/${time_window}`),

    // 작품 정보
    detail: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}`),
    credits: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}/credits`),
    recommend: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}/recommendations`),
    social: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}/external_ids`),
    ottList: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}/watch/providers`),

    // 시즌
    seasons: (season_id: number, season_number: number) => request.get(`tv/${season_id}/season/${season_number}`),
    seasonImg: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}/images?&language=fr&include_image_language=fr,null,kr`),
    seasonVideo: (type: 'movie' | 'tv', movie_id: number) => request.get(`${type}/${movie_id}/videos?&language=fr&include_image_language=fr,null,kr`),

    // 장르
    genreTitle: (type: 'movie' | 'tv') => request.get(`genre/${type}/list`),
    genreList: (type: 'movie' | 'tv', genre_number : number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
    popularScroll: (type: 'movie' | 'tv', page : number) => request.get(`${type}/popular?page=${page}`),
    genreScroll: (type: 'movie' | 'tv', page : number, genre_number : number) => request.get(`discover/${type}?with_genres=${genre_number}&page=${page}`),
    genrePopularDesc: (type: 'movie' | 'tv', genre_number : number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
    genrePopularAsc: (type: 'movie' | 'tv', genre_number : number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.asc`),
    genreDateDesc: (type: 'movie' | 'tv', genre_number : number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.desc`),
    genreDateAsc: (type: 'movie' | 'tv', genre_number : number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.asc`),

    // 인물 정보
    person: (id : number) => request.get(`person/${id}`),
    personArt: (type: 'movie' | 'tv', id : number) => request.get(`person/${type}/${id}_credits`),

    // 검색
    search: (keyword: string) => request.get(`search/multi`, {
        params: {
            query: keyword
        }
    }),

};
