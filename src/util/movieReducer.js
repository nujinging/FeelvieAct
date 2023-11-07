
const initialState = {
    movieData: null,
    creditsData: null,
    socialData : null,
    recommendData : null,
    ottData : null,
    imageData : null,
    videoData : null,
    seasonData: null,
    genreData: null,
    genrePopularDescData : null,
    genrePopularAscData : null,
    genreDateDescData : null,
    genreDateAscData : null
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEND_DATA":
            return {
                ...state,
                movieData: action.payload,
            };

        case "SEND_CREDITS":
            return {
                ...state,
                creditsData: action.payload,
            };

        case "SEND_SOCIAL":
            return {
                ...state,
                socialData: action.payload,
            };

        case "SEND_RECOMMEND":
            return {
                ...state,
                recommendData: action.payload,
            };

        case "SEND_OTT":
            return {
                ...state,
                ottData: action.payload,
            };

        case "SEND_IMAGE":
            return {
                ...state,
                imageData: action.payload,
            };
        case "SEND_VIDEO":
            return {
                ...state,
                videoData: action.payload,
            };
        case "SEND_SEASON":
            return {
                ...state,
                seasonData: action.payload,
            };
        case "SEND_GENRE":
            return {
                ...state,
                genreData: action.payload,
            };
        case "SEND_GENRE_POPULAR_DESC":
            return {
                ...state,
                genrePopularDescData: action.payload,
            };

        case "SEND_GENRE_POPULAR_ASC":
            return {
                ...state,
                genrePopularAscData: action.payload,
            };

        case "SEND_GENRE_DATE_DESC":
            return {
                ...state,
                genreDateDescData: action.payload,
            };

        case "SEND_GENRE_DATE_ASC":
            return {
                ...state,
                genreDateAscData: action.payload,
            };
        default:
            return state;
    }
};

export default movieReducer;