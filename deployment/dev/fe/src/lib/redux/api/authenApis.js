import { removeUndefined } from "../../../utils/appUtils";
import axiosClient, { setClientToken } from "../../../utils/axiosClient";
const axios = require('axios');

export const authenApis = {

  async getLoginUser(params) {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/v1/login";
    const dataUser = await axiosClient.post(url, params)
    return dataUser;
  },

  async checkUserSession() {
    const urltoken = "/v1/users/current";
    const dataUser = await axiosClient.get(urltoken)
    return dataUser
  }
  
};
