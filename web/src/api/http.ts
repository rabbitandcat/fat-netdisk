import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import EnvUtil from '../utils/env.util'

export const BASE_URL = EnvUtil.isDev ? 'http://localhost:9000/haha/' : '/haha/'

const http = axios.create({
    baseURL: '/haha',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

// 请求拦截器
http.interceptors.request.use(function (config: any) {
    // 统一设置用户身份 token
    let token = window.localStorage.getItem('token') || ""
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
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
        console.log('接收到了参数', res.data);
        return (res.data) as T
    })
}