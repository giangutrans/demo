import { removeUndefined } from "../utils/appUtils";
import { axiosClient } from "../utils/axiosClient";

export const postApiUtils = (url, params) => {
  return axiosClient.post(url, JSON.stringify(removeUndefined(params)));
};

export const getApiUtils = (url, params) => {
  return axiosClient.get(url, { params: removeUndefined(params) });
};
