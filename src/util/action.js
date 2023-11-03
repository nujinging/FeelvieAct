export const detailUrl = (data) => {
    return {
        type: "SEND_DATA",
        payload: data.data
    };
};



export const creditsUrl = (data) => {
    return {
        type: "SEND_CREDITS",
        payload: data.data
    };
};

