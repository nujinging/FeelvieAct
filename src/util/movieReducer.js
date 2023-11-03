
const initialState = {
    movieData: null,
    creditsData: null
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
        default:
            return state;
    }
};

export default movieReducer;