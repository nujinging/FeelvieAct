
const initialState = {
    movieData: null,
    socialData : null,
    seasonData: null,
    ottData: null,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        /** 영화,TV 내용 **/
        case "SEND_DATA":
            return {
                ...state,
                movieData: action.payload,
            };
        /** 작품, 인물 SNS **/
        case "SEND_SOCIAL":
            return {
                ...state,
                socialData: action.payload,
            }
        /** 작품 OTT **/
        case "SEND_OTT":
            return {
                ...state,
                ottData: action.payload,
            };
        /** TV 프로그램 시즌 */
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