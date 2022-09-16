import http from './http'

export const getBucketFileList = () => {
    return http({
        method: 'GET',
        url: '/BucketFileList'
    })
}

