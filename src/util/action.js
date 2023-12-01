/** 영화,TV 내용 **/
export const detailUrl = (data) => {
  return {
    type: "SEND_DATA",
    payload: data.data
  };
};

/** 작품, 인물 SNS **/
export const socialUrl = (data) => {
  return {
    type: "SEND_SOCIAL",
    payload: data.data
  };
};

/** 작품 OTT **/
export const ottUrl = (data) => {
  return {
    type: "SEND_OTT",
    payload: data.data.results.KR
  };
};

/** TV 프로그램 시즌 */
export const seasonUrl = (data) => {
  return {
    type: "SEND_SEASON",
    payload: data.data
  };
};
