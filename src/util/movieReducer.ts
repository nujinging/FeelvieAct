interface MovieReducerState {
    movieData: any;
    socialData: any;
    seasonData: any;
    ottData: any;
}

const initialState: MovieReducerState = {
    movieData: null,
    socialData: null,
    seasonData: null,
    ottData: null,
};

type MovieReducerAction =
    | {
    type: "SEND_DATA";
    payload: any; // 적절한 데이터 타입으로 지정해 주세요
}
    | {
    type: "SEND_SOCIAL";
    payload: any; // 적절한 데이터 타입으로 지정해 주세요
}
    | {
    type: "SEND_OTT";
    payload: any; // 적절한 데이터 타입으로 지정해 주세요
}
    | {
    type: "SEND_SEASON";
    payload: any; // 적절한 데이터 타입으로 지정해 주세요
};

const movieReducer = (
    state: MovieReducerState = initialState,
    action: MovieReducerAction
): MovieReducerState => {
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
            };
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
        default:
            return state;
    }
};
export default movieReducer;