import http from './http'

export const register = (data: any) => {
    return http({
        method: 'POST',
        url: '/CreateUser',
        data
    })
}

export const login = (data: any) => {
    return http({
        method: 'POST',
        url: '/Login',
        data
    })
}
