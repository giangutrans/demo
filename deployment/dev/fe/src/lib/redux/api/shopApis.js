import { removeUndefined } from "../../../utils/appUtils";
import axiosClient from "../../../utils/axiosClient";

export const shopApis = {
    createAddressShop(params) {
        const url = "/api/";
        let rs = axiosClient.post(url, { params: removeUndefined(params) });
        return rs;
    },
    getListAddressShop(params){
        const url = "/api/";
        let rs = axiosClient.get(url, { params: removeUndefined(params) });
        return rs;
    }
};
