import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


class CustomError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name; // Change the error name here
    }
};


const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/delivery/"
});


// Add a request interceptor
API.interceptors.request.use(async function BeforeAPICall(config: InternalAxiosRequestConfig<any>) {
    // Do something before request is sent
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
API.interceptors.response.use(function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
}, async function OnAPICallError(error: AxiosError<{ message: string[] | string; }>) {
    if (error?.response?.data) return Promise.reject(
        new CustomError(
            "Error",
            Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message
        )
    );
    return Promise.reject(error);
});



export default API;