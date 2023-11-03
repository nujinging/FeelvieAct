
const initialState = {
    movieData: null,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEND_DATA":
            return {
                ...state,
                movieData: action.payload,
            };
        default:
            return state;
    }
};

export default movieReducer;