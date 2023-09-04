import axios from 'axios';


const request  = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
    params: {
        api_key : process.env.REACT_APP_API_KEY,
        language: 'ko-KR',
    }
})


export const movieApi = {
    popular: () => request.get(`movie/popular`),
};
