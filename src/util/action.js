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
export const seasonUrl = (data) => {
    return {
        type: "SEND_SEASON",
        payload: data.data
    };
};

export const genreUrl = (data) => {
    return {
        type: "SEND_GENRE",
        payload: data.data.results
    };
};

export const genrePopularDescUrl = (data) => {
    return {
        type: "SEND_GENRE_POPULAR_DESC",
        payload: data.data.results
    };
};



export const genrePopularAscUrl = (data) => {
    return {
        type: "SEND_GENRE_POPULAR_ASC",
        payload: data.data.results
    };
};


export const genreDateDescUrl = (data) => {
    return {
        type: "SEND_GENRE_DATE_DESC",
        payload: data.data.results
    };
};


export const genreDateAscUrl = (data) => {
    return {
        type: "SEND_GENRE_DATE_ASC",
        payload: data.data.results
    };
};
