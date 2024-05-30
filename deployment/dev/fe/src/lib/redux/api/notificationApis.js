import { removeUndefined } from '../../../utils/appUtils';
import axiosClient from '../../../utils/axiosClient';

export const notifcationApis = {
  getListNotification(params) {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/v1/notifications/';
    let rs = axiosClient.get(url);
    return rs;
  }
};
