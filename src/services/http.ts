import axios from 'axios'
import { appConfig } from '../config/app'

export const http = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: appConfig.requestTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)