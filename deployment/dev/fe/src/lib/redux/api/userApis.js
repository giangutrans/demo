import { select } from "redux-saga/effects";
import { removeUndefined } from "../../../utils/appUtils";
import axiosClient, { setClientToken } from "../../../utils/axiosClient";
export const userApis = {

    async insertUser(params) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/v1/users/";
        const { location_pickup } = params
        const custom_location_pickup = {
            location_name: params.shop_name,
            location_phone: params.phone_number,
            location_contact: params.shop_name,
            province_id: location_pickup[0].value,
            district_id: location_pickup[1].value,
            ward_id: location_pickup[2].value,
            address: location_pickup[2].label + ', ' +
                location_pickup[1].label + ', ' +
                location_pickup[0].label,

        }
        delete params.location_pickup;
        const paramsReq = {
            ...params,
            email: params.username,
            kyc_identity_address: custom_location_pickup.address,
            shops: [{
                commercial_name: params.shop_name,
                shop_name: params.shop_name,
                email: params.username,
                phone_number: params.phone_number,
                website: params.website,
                tax_id: params.kyc_identity_id,
                industry_id: params.industry_type,
                location_pickup: [custom_location_pickup]
            }]
        }
        const result = await axiosClient.post(url, paramsReq);
        return result;
    },

    async verifyOTP(params) {
        const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/v1/users/email-verify";
        const result = await axiosClient.post(url, params);
        return result;
    },

    updateProfileUser(params) {
        const url = "/api/";
        let rs = axiosClient.post(url, { params: removeUndefined(params) });
        return true;
    },

    updateBankAccount(params) {
        const url = "/api/";
        let rs = axiosClient.post(url, { params: removeUndefined(params) });
        return true;
    }
};
