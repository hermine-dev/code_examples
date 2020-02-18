import axios from 'axios';
import {getToken} from 'utils';

const server = typeof window !== 'undefined' ? '/api/v1' : process.env.API_SERVER;
// Add a response interceptor
export const catchAxiosError = (error) => {
  // console.log('ERROR', error);
  return {error: error.error};
};

const API = axios.create({
  baseURL: server,
  timeout: 60000,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

API.TOKEN = ''; // Logged user token

API.interceptors.request.use(config => {
  // perform a task before the request is sent
  const token = typeof window !== 'undefined' ? getToken() : API.TOKEN;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, error => {
  // handle the error
  return Promise.reject({error});
});

API.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const result = {};
  if (response.data.error) {
    result.error = response.data.error.details ? response.data.error.details : [{message: response.data.error}];
  } else {
    result.response = response.data;
  }
  return result;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject({error});
});

API.setToken = (token) => {
  API.TOKEN = token;
};

export default API;
