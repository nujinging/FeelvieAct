const initialState = {
    data: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEND_DATA":
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;
