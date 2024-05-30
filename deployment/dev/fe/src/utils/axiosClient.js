import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Private-Network": true,
    "Content-Security-Policy": "upgrade-insecure-requests",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    "Access-Control-Allow-Methods": '*',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
  paramsSerializer: (params) => {
    // Tùy chỉnh chuyển đổi params thành chuỗi URL
    return Object.keys(params)
      .map((key) => {
        // Xử lý các phần tử của mảng riêng lẻ
        if (Array.isArray(params[key])) {
          return params[key]
            .map(
              (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            )
            .join("&");
        }
        // Xử lý các trường hợp khác
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      })
      .join("&");
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    // console.log(`Request ${config.url} >>>>>>>>>>>>>`, {
    //   params: config.data,
    //   config,
    // });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // console.log(
    //   `>>>>>>> Response>>>>>> : ${response.request.responseURL}`,
    //   response
    // );?
    return response?.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const setClientToken = (token) => {
  axiosClient.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default axiosClient;
