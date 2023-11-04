
const initialState = {
    movieData: null,
    creditsData: null,
    socialData : null,
    recommendData : null,
    ottData : null,
    imageData : null,
    videoData : null,
    seriesData: null
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
        case "SEND_SERIES":
            return {
                ...state,
                seriesData: action.payload,
            };
        default:
            return state;
    }
};

export default movieReducer;