export const sendData = (data) => {
    console.log(data)
    return {
        type: "SEND_DATA",
        payload: data.data
    };
};

