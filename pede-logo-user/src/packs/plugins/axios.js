import Vue from 'vue'
import axios from 'axios'

const API_URL = process.env.VUE_APP_BASE_API_URL;

const plainAxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const securedAxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  }
})

securedAxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token')
  if (token != null && token != '') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

securedAxiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {

  if (error.response.status === 401) {
    localStorage.removeItem( 'access_token' )
    localStorage.removeItem( 'token_type' )
    localStorage.removeItem( 'created_at' )
    localStorage.removeItem( 'expires_in' )
    localStorage.removeItem( 'profile' )
    localStorage.removeItem( 'Bearer' )

    localStorage.setItem('logged', false )
    //location.replace('/')
  }

  plainAxiosInstance.get('/api/v1/private/user/verify_user',
    {
      params: { access_token: localStorage.getItem('access_token') }
    })

    .then((result) => {

    }).catch((err) => {
      localStorage.removeItem( 'access_token')
      localStorage.removeItem( 'token_type')
      localStorage.setItem( 'logged', false )
      //location.replace('/')

    });
  return Promise.reject(error);
});

Vue.prototype.$axios = plainAxiosInstance
Vue.prototype.$axios = securedAxiosInstance

export { plainAxiosInstance, securedAxiosInstance }
