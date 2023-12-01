import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: 'ko-KR',
  }
})

export const movieApi = {
  // 메인 리스트
  nowPlaying: (type) => request.get(`${type}/now_playing`),
  popular: (type) => request.get(`${type}/popular`),
  today: (type, time_window) => request.get(`trending/${type}/${time_window}`),

  // 작품 정보
  detail: (type, movie_id) => request.get(`${type}/${movie_id}`),
  credits: (type, movie_id) => request.get(`${type}/${movie_id}/credits`),
  recommend: (type, movie_id) => request.get(`${type}/${movie_id}/recommendations`),
  social: (type, movie_id) => request.get(`${type}/${movie_id}/external_ids`),
  ottList: (type, movie_id) => request.get(`${type}/${movie_id}/watch/providers`),

  // 시즌
  seasons: (season_id, season_number) => request.get(`tv/${season_id}/season/${season_number}`),
  seasonImg: (type, movie_id) => request.get(`${type}/${movie_id}/images?&language=fr&include_image_language=fr,null,kr`),
  seasonVideo: (type, movie_id) => request.get(`${type}/${movie_id}/videos?&language=fr&include_image_language=fr,null,kr`),

  // 장르
  genreTitle: (type) => request.get(`genre/${type}/list`),
  genreList: (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
  popularScroll: (type, page) => request.get(`${type}/popular?page=${page}`),
  genreScroll: (type, genre_number, page) => request.get(`discover/${type}?with_genres=${genre_number}&page=${page}`),
  genrePopularDesc: (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
  genrePopularAsc: (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.asc`),
  genreDateDesc: (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.desc`),
  genreDateAsc: (type, genre_number) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.asc`),

  // 인물 정보
  person: (id) => request.get(`person/${id}`),
  personArt: (type, id) => request.get(`person/${type}/${id}_credits`),

  // 검색
  search: (keyword) => request.get(`search/multi`, {
    params: {
      query: keyword
    }
  }),

};
