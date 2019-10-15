import axios from 'axios';
import {BASE_URL_API} from "./constants";

export const api = axios.create({
    baseURL: BASE_URL_API,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
});
//
// api.interceptors.request.use((config) => {
//     let token = localStorage.getItem('token');
//
//     if(token){
//         config.headers['Authorization'] = 'Bearer ' + token;
//     }
//
//     return config;
// });

export default api;
