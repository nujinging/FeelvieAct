export const sendData = (data) => {
    return {
        type: "SEND_DATA",
        payload: data
    };
};