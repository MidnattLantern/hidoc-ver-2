import axios from "axios";

//axios.defaults.baseURL = 'https://hidoc-api-80e680483d64.herokuapp.com/'; // for deployment
axios.defaults.baseURL = 'http://127.0.0.1:8000/'; // for local development
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
