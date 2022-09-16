import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import EnvUtil from '../utils/env.util'

export const BASE_URL = EnvUtil.isDev ? 'http://localhost:8080/api/' : '/api/'

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
})

// 请求拦截器
http.interceptors.request.use(function (config: any) {
    // 统一设置用户身份 token
    // if (userStore.userInfo && userStore.token) {
    //     config.headers.Authorization = `Bearer ${userStore.token}`
    // }
    return config
}, function (error: any) {
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response: AxiosResponse) {
    return response
}
    , function (error: any) {
        return Promise.reject(error)
    })

export default <T = any>(config: AxiosRequestConfig) => {
    return http(config).then((res) => {
        return (res.data) as T
    })
}