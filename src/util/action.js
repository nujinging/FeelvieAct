export const detailUrl = (data) => {
    return {
        type: "SEND_DATA",
        payload: data.data
    };
};
export const socialUrl = (data) => {
    return {
        type: "SEND_SOCIAL",
        payload: data.data
    };
};

export const ottUrl = (data) => {
    return {
        type: "SEND_OTT",
        payload: data.data.results.KR
    };
};
export const seasonUrl = (data) => {
    return {
        type: "SEND_SEASON",
        payload: data.data
    };
};

export const setLoading = (loading) => {
    return {
        type: "SET_LOADING",
        payload: loading
    };
};