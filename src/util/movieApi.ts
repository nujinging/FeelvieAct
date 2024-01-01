import axios from 'axios';

interface MovieDetailParams {
    type: string;
    movie_id: number;
    time_window : string;
    genre_number : number;
    page : number;
    id : number;
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
  nowPlaying: (type : MovieDetailParams) => request.get(`${type}/now_playing`),
  popular: (type : MovieDetailParams) => request.get(`${type}/popular`),
  today: ({type , time_window} : MovieDetailParams) => request.get(`trending/${type}/${time_window}`),

  // 작품 정보
  detail: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}`),
  credits: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}/credits`),
  recommend: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}/recommendations`),
  social: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}/external_ids`),
  ottList: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}/watch/providers`),

  // 시즌
  seasons: (season_id : number , season_number : number) => request.get(`tv/${season_id}/season/${season_number}`),
  seasonImg: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}/images?&language=fr&include_image_language=fr,null,kr`),
  seasonVideo: ({type, movie_id} : MovieDetailParams) => request.get(`${type}/${movie_id}/videos?&language=fr&include_image_language=fr,null,kr`),

  // 장르
  genreTitle: (type : MovieDetailParams) => request.get(`genre/${type}/list`),
  genreList: ({type, genre_number} : MovieDetailParams) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
  popularScroll: ({type, page} : MovieDetailParams) => request.get(`${type}/popular?page=${page}`),
  genreScroll: ({type, genre_number, page} : MovieDetailParams) => request.get(`discover/${type}?with_genres=${genre_number}&page=${page}`),
  genrePopularDesc: ({type, genre_number} : MovieDetailParams) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.desc`),
  genrePopularAsc: ({type, genre_number} : MovieDetailParams) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=popularity.asc`),
  genreDateDesc: ({type, genre_number} : MovieDetailParams) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.desc`),
  genreDateAsc: ({type, genre_number} : MovieDetailParams) => request.get(`discover/${type}?with_genres=${genre_number}&sort_by=primary_release_date.asc`),

  // 인물 정보
  person: (id : MovieDetailParams) => request.get(`person/${id}`),
  personArt: ({type, id} : MovieDetailParams) => request.get(`person/${type}/${id}_credits`),

  // 검색
  search: (keyword : string) => request.get(`search/multi`, {
    params: {
      query: keyword
    }
  }),

};
