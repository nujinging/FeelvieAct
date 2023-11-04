export const detailUrl = (data) => {
    return {
        type: "SEND_DATA",
        payload: data.data
    };
};

export const creditsUrl = (data) => {
    return {
        type: "SEND_CREDITS",
        payload: data.data.cast
    };
};

export const socialUrl = (data) => {
    return {
        type: "SEND_SOCIAL",
        payload: data.data
    };
};

export const recommendUrl = (data) => {
    return {
        type: "SEND_RECOMMEND",
        payload: data.data.results
    };
};

export const ottUrl = (data) => {
    return {
        type: "SEND_OTT",
        payload: data.data.results.KR
    };
};

export const imageUrl = (data) => {
    return {
        type: "SEND_IMAGE",
        payload: data.data
    };
};

export const videoUrl = (data) => {
    return {
        type: "SEND_VIDEO",
        payload: data.data.results
    };
};
export const seriesUrl = (data) => {
    return {
        type: "SEND_SERIES",
        payload: data.data
    };
};



