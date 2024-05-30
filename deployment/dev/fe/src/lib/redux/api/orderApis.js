import { removeUndefined } from "../../../utils/appUtils";
import axiosClient from "../../../utils/axiosClient";

export const orderApis = {
  async getOrder(params) {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/v1/order";
    let rs = await axiosClient.get(url, removeUndefined(params));
    return rs;
  },
  async createOrder(params) {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/v1/order";
    let rs = await axiosClient.post(url, removeUndefined(params));
    return rs;
  }
};
