import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import EnvUtil from '../utils/env.util'

export const BASE_URL = EnvUtil.isDev ? 'http://localhost:9000/haha/' : '/haha/'

const fileHttp = axios.create({
    // baseURL: '/haha',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

// 请求拦截器
fileHttp.interceptors.request.use(function (config: any) {
    // 统一设置用户身份 token
    // if (userStore.userInfo && userStore.token) {
    //     config.headers.Authorization = `Bearer ${userStore.token}`
    // }
    return config
}, function (error: any) {
    return Promise.reject(error)
})

// 响应拦截器
fileHttp.interceptors.response.use(function (response: AxiosResponse) {
    return response
}
    , function (error: any) {
        return Promise.reject(error)
    })

export default <T = any>(config: AxiosRequestConfig) => {
    return fileHttp(config).then((res) => {
        return (res) as T
    })
}