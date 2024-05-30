import { removeUndefined } from "../../../utils/appUtils";
import axiosClient from "../../../utils/axiosClient";

export const productApis = {
  getProduct(params) {
    const dataProduct = {
      data: [{
                "id": 542,
                "img": "img1",
                "productName": "ao thun",
                "supplier": "abc",
                "cost": 10,
                "wholesale": 15,
                "retail": 20,
                "size": "10x10",
                "weight": "10g",
                "inventory": 10,
            },
            {
                "id": 564,
                "img": "img2",
                "productName": "quan jean",
                "supplier": "arc",
                "cost": 20,
                "wholesale": 25,
                "retail": 30,
                "size": "20x15",
                "weight": "20g",
                "inventory": 20,
            }],
    }
    return dataProduct
  },
};
