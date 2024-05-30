import { removeUndefined } from "../../../utils/appUtils";
import axiosClient from "../../../utils/axiosClient";

export const provinceApis = {
  getListProvincesApi(params) {
    const url = "/api/";
    return axiosClient.get(url, { params: removeUndefined(params) });
  },
};
