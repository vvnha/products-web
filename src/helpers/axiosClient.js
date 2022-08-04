/* eslint-disable no-param-reassign */
import axios from 'axios'
import { API_BASE_URL } from '../config'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    // sometime add authorization
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response.data,
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Promise.reject(error)
)

export default axiosClient
