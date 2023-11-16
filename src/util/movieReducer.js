
const initialState = {
    movieData: null,
    socialData : null,
    seasonData: null,
    ottData: null,
    loading: true,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEND_DATA":
            return {
                ...state,
                movieData: action.payload,
            };
        case "SEND_SOCIAL":
            return {
                ...state,
                socialData: action.payload,
            }
        case "SEND_OTT":
            return {
                ...state,
                ottData: action.payload,
            };
        case "SEND_SEASON":
            return {
                ...state,
                seasonData: action.payload,
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default movieReducer;