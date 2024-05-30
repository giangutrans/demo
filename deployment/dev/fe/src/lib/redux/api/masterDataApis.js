import { removeUndefined } from "../../../utils/appUtils";
import axiosClient from "../../../utils/axiosClient";

export const orderApis = {
    getListCity(params) {
        const url = "/api/";
        let rs = axiosClient.get(url, { params: removeUndefined(params) });
        return [{id: 1, name:"Hà Nội"}];
    },
    getListStreet(params) {
        const url = "/api/";
        let rs = axiosClient.get(url, { params: removeUndefined(params) });
        return [{id: 1, name:"Huỳnh Tấn phát", idWarn:1}];
    },
    getListWarn(params) {
        const url = "/api/";
        let rs = axiosClient.get(url, { params: removeUndefined(params) });
        return [{id: 1, name:"Phường Bình Thuận", idDistrict:1}];
    },
    getListDistrict(params) {
        const url = "/api/";
        let rs = axiosClient.get(url, { params: removeUndefined(params) });
        return [{id: 1, name:"Quận 7", idDistrict:1}];
    }
};
